import {
    lightningChart,
    AutoCursorModes,
    emptyLine,
    AxisTickStrategies,
    AxisScrollStrategies,
    synchronizeAxisIntervals,
    UIOrigins,
    UIDraggingModes,
    Themes,
    ChartXY,
    Dashboard,
    LineSeries} from '@arction/lcjs';
import { subscribeToInverterStream } from './inverterConnection';

const PADDING_BOTTOM = 30
const PADDING_TOP = 40
const PADDING_LEFT = 60
const ROW_HEIGHT = 300
const DASHBOARD_HEIGHT = 1400

export function initialiseScopeInstance(containerElement: HTMLDivElement): void {
    const dashboard = lightningChart().Dashboard({
        container: containerElement,
        numberOfColumns: 1,
        numberOfRows: 5,
        theme: Themes.light,
    })
    .setSplitterStyle(emptyLine);

    const voltageChart = addScopeChart(0, "Voltage", dashboard);
    const currentChart = addScopeChart(1, "Current", dashboard);

    const voltageSeries = addScopeSeries(voltageChart, "Voltage");
    const currentSeries = addScopeSeries(currentChart, "Current");

    synchronizeAxisIntervals(voltageChart.getDefaultAxisX(), currentChart.getDefaultAxisX());

    // Subscribe serieseseses to inverter stream
    subscribeToInverterStream((data) => {
        voltageSeries.add({ x: data[0], y: data[1] });
        currentSeries.add({ x: data[0], y: data[2] });
    });
}

function addScopeChart(atIndex: number, title: string, dashboard: Dashboard, rowHeight?: number): ChartXY {

    dashboard.setRowHeight(atIndex, rowHeight ? rowHeight : ROW_HEIGHT);

    const chart = dashboard
        .createChartXY({
            columnIndex: 0,
            rowIndex: atIndex,
        })
        .setTitle(title)
        .setPadding({
            top: 0,
            bottom: 0,
            left: 0,
        })
        .setAutoCursorMode(AutoCursorModes.disabled)
        .setBackgroundStrokeStyle(emptyLine)
        .setMouseInteractions(false)

    chart
        .getDefaultAxisX()
        // .setTickStrategy(AxisTickStrategies.Empty)
        .setTickStrategy(AxisTickStrategies.Numeric)
        .setStrokeStyle(emptyLine)
        .setScrollStrategy(AxisScrollStrategies.fitting)
    chart
        .getDefaultAxisY()
        .setTickStrategy(AxisTickStrategies.Numeric)
        .setStrokeStyle(emptyLine)
        .setTitleRotation(0)
        .setThickness(PADDING_LEFT)


    return chart
}

function addScopeSeries(chart: ChartXY, title: string): LineSeries {
    return chart
        .addLineSeries({
            dataPattern: { pattern: 'ProgressiveX', regularProgressiveStep: true },
            automaticColorIndex: 0,
        })
        .setName(title)
        .setDataCleaning({ minDataPointCount: 10000 })
        // Use -1 thickness for best performance, especially on low end devices like mobile / laptops.
        .setStrokeStyle((style: any) => style.setThickness(-1));
}