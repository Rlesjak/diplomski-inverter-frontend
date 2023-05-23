import { inverterConnected } from "../store/statusStore";
import type { InverterPacket } from "./inverterPacket";

const INVERTER_ADDRESS = "http://192.168.1.10:8888";
const STREAM_ENDPOINT = "";

let inverterEventSource: EventSource | null = null;

type StreamConsumer = (data: InverterPacket) => void;
const streamSubscribers: Array<StreamConsumer> = [];

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

export function subscribeToInverterStream(consumer: StreamConsumer) {
    streamSubscribers.push(consumer);
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