import { inverterConnected, inverterStatus } from "../store/statusStore";
import type { InverterPacket } from "./inverterPacket";

export const DEFAULT_INVERTER_ADDRESS = "http://192.168.1.10:8888";
const STREAM_ENDPOINT = "/stream";

let inverterAddress: string | null = null;

let inverterEventSource: EventSource | null = null;

type StreamConsumer = (data: InverterPacket) => void;
const streamSubscribers: Map<string, StreamConsumer> = new Map();

export function setupEventSource(address: string) {
    return new Promise<void>((resolve, reject) => {

        // Pokusaj uspostaviti konekciju sa inverterom
        inverterEventSource = new EventSource(`${address}${STREAM_ENDPOINT}`, {});

        // Resolvaj promise kada se konekcija uspostavi
        inverterEventSource.onopen = () => {
            inverterAddress = address;
            resolve();
        }

        // Slusaj na poruke sa invertera
        inverterEventSource.onmessage = (event) => {
            processInverterStreamEvent(event);
        }

        // Rejectaj promise ako se ne uspostavi konekcija
        // Ovaj callback takodjer moze biti pozvan ako se konekcija izgubi
        inverterEventSource.onerror = () => {
            // Zatvori konekciju ako vec nije zatvorena
            inverterEventSource?.close();

            // Azuriraj globalni status konekcije na inverter
            inverterConnected.value = false;

            inverterAddress = null;

            // Ako je jos u toku pokusaj uspostavljanja konekcije, rejectaj promise
            reject();
        }
    });
}

export function closeEventSource() {
    inverterEventSource?.close();
    inverterEventSource = null;
}

export function subscribeToInverterStream(id: string, consumer: StreamConsumer) {
    streamSubscribers.set(id, consumer);
}

export function unsubscribeFromInverterStream(id: string) {
    streamSubscribers.delete(id);
}

function processInverterStreamEvent(event: MessageEvent) {
    const packetData: InverterPacket = parseInverterStreamPacket(event.data);

    // Pokreni sve pretplatnike na stream
    streamSubscribers.forEach((subscriber) => {
        subscriber(packetData);
    });
}

function parseInverterStreamPacket(packet: string): InverterPacket {
    const packetParts = packet.split(",");
    return packetParts.map((part) => Number(part)) as InverterPacket;
}

async function sendCommand(endpoint: string, value: number) {
    if (!inverterAddress) {
        throw new Error("Inverter nije spojen");
    }
    await fetch(`${inverterAddress}${endpoint}?${value}`, {
        mode: "no-cors"
    });
}

export const InverterCommand = {
    motorEnable: async () => {
        await sendCommand("/MotEn", 1);
    },
    motorDisable: async () => {
        await sendCommand("/MotEn", 0);
    },
    setId: async (value: number) => {
        await sendCommand("/Id_ref", value);
    },
    setSpeed: async (value: number) => {
        await sendCommand("/N_ref", value);
    },
    setSpeedRegProportionalGain: async (value: number) => {
        await sendCommand("/SpdKp", value);
    },
    setSpeedRegIntegralGain: async (value: number) => {
        await sendCommand("/SpdKi", value);
    },
    setIdRegProportionalGain: async (value: number) => {
        await sendCommand("/IdKp", value);
    },
    setIdRegIntegralGain: async (value: number) => {
        await sendCommand("/IdKi", value);
    },
    setIqRegProportionalGain: async (value: number) => {
        await sendCommand("/IqKp", value);
    },
    setIqRegIntegralGain: async (value: number) => {
        await sendCommand("/IqKi", value);
    }
}


const skipEveryNth = 300;
let skipCounter = 0;

subscribeToInverterStream("inverterStatus", (data) => {
    skipCounter++;
    if (skipCounter >= skipEveryNth) {
        skipCounter = 0;

        inverterStatus.dcBusVoltage = data[4];
        inverterStatus.motorRunning = data[20] > 0.9 ? true : false;
        inverterStatus.wantedSpeed = data[19];

        // Regulator brzine
        inverterStatus.regSpdKp = data[22];
        inverterStatus.regSpdKi = data[23];
        inverterStatus.regSpdRef = data[21];
        inverterStatus.regSpdFback = data[11];

        // Regulator Id
        inverterStatus.regIdKp = data[25];
        inverterStatus.regIdKi = data[26];
        inverterStatus.regIdFback = data[13];
        inverterStatus.regIdRef = data[24];
        inverterStatus.regIdOutput = data[14];

        // Regulator Iq
        inverterStatus.regIqKp = data[28];
        inverterStatus.regIqKi = data[29];
        inverterStatus.regIqFback = data[15];
        inverterStatus.regIqRef = data[27];
        inverterStatus.regIqOutput = data[16];
    }
});