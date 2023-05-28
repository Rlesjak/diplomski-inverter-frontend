import { inverterConnected, inverterStatus } from "../store/statusStore";
import type { InverterPacket } from "./inverterPacket";

const INVERTER_ADDRESS = "http://192.168.1.10:8888";
const STREAM_ENDPOINT = "/stream";

let inverterEventSource: EventSource | null = null;

type StreamConsumer = (data: InverterPacket) => void;
const streamSubscribers: Array<StreamConsumer> = [];
const subscriberIds: Array<string> = [];

export function setupEventSource() {
    return new Promise<void>((resolve, reject) => {

        // Pokusaj uspostaviti konekciju sa inverterom
        inverterEventSource = new EventSource(`${INVERTER_ADDRESS}${STREAM_ENDPOINT}`, {});

        // Resolvaj promise kada se konekcija uspostavi
        inverterEventSource.onopen = () => {
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
    if (subscriberIds.includes(id)) return;
    streamSubscribers.push(consumer);
    subscriberIds.push(id);
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
    await fetch(`${INVERTER_ADDRESS}${endpoint}?${value}`, {
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