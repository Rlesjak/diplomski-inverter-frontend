import {
    lightningChart,
    AutoCursorModes,
    emptyLine,
    AxisTickStrategies,
    AxisScrollStrategies,
    synchronizeAxisIntervals,
    UIOrigins,
    UIDraggingModes,
    Themes } from '@arction/lcjs';

const DEFAULT_X_RANGE_MS = 10 * 1000
const PADDING_BOTTOM = 30
const PADDING_TOP = 40
const PADDING_LEFT = 60
const DASHBOARD_HEIGHT = 1400

const INVERTER_ADDRESS = "http://192.168.1.10:8888";
const STREAM_ENDPOINT = "";

let inverterEventSource: EventSource | null = null;
let series: any = null;


export function setupEventSource() {
    inverterEventSource = new EventSource(`${INVERTER_ADDRESS}${STREAM_ENDPOINT}`, {});

    inverterEventSource.onmessage = (event) => {
        processInverterStreamEvent(event);
    }
}

function processInverterStreamEvent(event: MessageEvent) {
    const packetData = parseInverterStreamPacket(event.data);
    series.add({ x: packetData[0], y: packetData[1] })
}

function parseInverterStreamPacket(packet: string) {
    const packetParts = packet.split(",");
    return packetParts.map((part) => Number(part));
}

export function generateChart(chartEl: HTMLElement) {
    const dashboard = lightningChart().Dashboard({
        container: chartEl,
        numberOfColumns: 1,
        numberOfRows: 5,
        theme: Themes.light,
    })
    .setSplitterStyle(emptyLine)
    .setRowHeight(0, 300)
    .setRowHeight(1, 300)
    .setRowHeight(2, 300)
    .setRowHeight(3, 300)
    .setRowHeight(4, 300)

    const chart = dashboard
        .createChartXY({
            columnIndex: 0,
            rowIndex: 0,
        })
        .setTitle('')
        .setPadding({
            top: 0,
            bottom: 0,
            left: 0,
        })
        .setAutoCursorMode(AutoCursorModes.disabled)
        .setBackgroundStrokeStyle(emptyLine)
        .setMouseInteractions(false)

    const axisX = chart
        .getDefaultAxisX()
        .setTickStrategy(AxisTickStrategies.Empty)
        .setStrokeStyle(emptyLine)
        .setScrollStrategy(AxisScrollStrategies.fitting)
        // .setInterval({ start: -DEFAULT_X_RANGE_MS, end: 0, stopAxisAfter: false })
    const axisY = chart
        .getDefaultAxisY()
        .setTickStrategy(AxisTickStrategies.Empty)
        .setStrokeStyle(emptyLine)
        .setTitle("Naslov")
        .setTitleRotation(0)
        .setThickness(PADDING_LEFT)
    series = chart
        .addLineSeries({
            dataPattern: { pattern: 'ProgressiveX', regularProgressiveStep: true },
            automaticColorIndex: 0,
        })
        .setName(`Channel 0`)
        .setDataCleaning({ minDataPointCount: 10000 })
        // Use -1 thickness for best performance, especially on low end devices like mobile / laptops.
        .setStrokeStyle((style: any) => style.setThickness(-1));
}