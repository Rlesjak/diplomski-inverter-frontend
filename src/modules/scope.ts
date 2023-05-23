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
    LineSeries,
    Axis,
    SolidLine,
    SolidFill,
    ColorHEX,
    ColorPalettes} from '@arction/lcjs';
import { subscribeToInverterStream } from './inverterConnection';

const PADDING_BOTTOM = 30
const PADDING_TOP = 40
const PADDING_LEFT = 60
const ROW_HEIGHT = 300
const DASHBOARD_HEIGHT = 1400

const twoPiF = 2 * Math.PI * 50;

export function initialiseScopeInstance(containerElement: HTMLDivElement): void {
    const dashboard = lightningChart().Dashboard({
        container: containerElement,
        numberOfColumns: 1,
        numberOfRows: 5,
        theme: Themes.light,
    })
    .setSplitterStyle(emptyLine);

    // All x axes instances
    const xAxes: Array<Axis> = []

    // Brzina vrtnje motora
    const speedChart = addScopeChart(0, "Brzina vrtnje", dashboard);
    xAxes.push(speedChart.getDefaultAxisX());
    const measuredSpeedSeries = addScopeSeries(speedChart, "Mjerena brzina", "#ff0000");
    const referenceSpeedSeries = addScopeSeries(speedChart, "Referentna brzina", "#0000ff");
    const wantedSpeedSeries = addScopeSeries(speedChart, "Željena brzina", "#00ff00");
    const electricalSpeedSeries = addScopeSeries(speedChart, "Električna brzina", "#ff00ff");
    addLegend(speedChart);

    // DQ struje motora
    const dqCurrentChart = addScopeChart(1, "DQ struje motora", dashboard);
    xAxes.push(dqCurrentChart.getDefaultAxisX());
    const idSeries = addScopeSeries(dqCurrentChart, "Id", "#ff0000");
    const iqSeries = addScopeSeries(dqCurrentChart, "Iq", "#0000ff");
    addLegend(dqCurrentChart);

    // ABC struje motora
    const currentChart = addScopeChart(2, "Struje motora", dashboard);
    xAxes.push(currentChart.getDefaultAxisX());
    const iaSeries = addScopeSeries(currentChart, "Ia", "#ff0000");
    const ibSeries = addScopeSeries(currentChart, "Ib", "#0000ff");
    const icSeries = addScopeSeries(currentChart, "Ic", "#00ff00");
    addLegend(currentChart);

    // DQ naponi motora
    const dqVoltageChart = addScopeChart(3, "DQ izlazni naponi motora", dashboard);
    xAxes.push(dqVoltageChart.getDefaultAxisX());
    const vdSeries = addScopeSeries(dqVoltageChart, "Vd", "#ff0000");
    const vqSeries = addScopeSeries(dqVoltageChart, "Vq", "#0000ff");
    addLegend(dqVoltageChart);

    // Mehanicki i elektricni kut rotora
    const angleChart = addScopeChart(4, "Kut rotora", dashboard);
    xAxes.push(angleChart.getDefaultAxisX());
    const electricalTheta = addScopeSeries(angleChart, "Encoder theta", "#ff0000");
    const mechanicalTheta = addScopeSeries(angleChart, "Encoder omega", "#0000ff");
    addLegend(angleChart);


    // Sinkronizacija x osi svih kanala
    // Potrebno kod zumiranja i pomicanja kroz graf
    synchronizeAxisIntervals(...xAxes);

    // Subscribe serieseseses to inverter stream
    subscribeToInverterStream((data) => {
        // Brzina vrtnje motora
        measuredSpeedSeries.add({ x: data[0], y: data[18] });
        referenceSpeedSeries.add({ x: data[0], y: data[21] });
        wantedSpeedSeries.add({ x: data[0], y: data[19]*twoPiF });
        electricalSpeedSeries.add({ x: data[0], y: data[8] });

        // DQ struje motora
        idSeries.add({ x: data[0], y: data[5] });
        iqSeries.add({ x: data[0], y: data[6] });

        // ABC struje motora
        iaSeries.add({ x: data[0], y: data[1] });
        ibSeries.add({ x: data[0], y: data[2] });
        icSeries.add({ x: data[0], y: data[3] });

        // DQ naponi motora
        vdSeries.add({ x: data[0], y: data[9] });
        vqSeries.add({ x: data[0], y: data[10] });

        // Mehanicki i elektricni kut rotora
        electricalTheta.add({ x: data[0], y: data[7] });
        mechanicalTheta.add({ x: data[0], y: data[17] });
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
        .setMouseInteractions(false);

    const xAxis = chart.getDefaultAxisX()
        // .setTickStrategy(AxisTickStrategies.Empty)
        .setTickStrategy(AxisTickStrategies.Numeric)
        .setStrokeStyle(emptyLine)
        .setScrollStrategy(AxisScrollStrategies.fitting)
    const yAxis = chart.getDefaultAxisY()
        .setTickStrategy(AxisTickStrategies.Numeric)
        .setStrokeStyle(emptyLine)
        .setTitleRotation(0)
        .setThickness(PADDING_LEFT)

    const buttonReset = chart
        .addUIElement()
        .setText('Reset')
        .setPosition({ x: 0, y: 10 })
        .setOrigin(UIOrigins.LeftTop)
        .setMargin({ top: 12, left: 4 })
        .setDraggingMode(UIDraggingModes.notDraggable)
    buttonReset.onMouseClick((_) => {
        xAxis.fit(true)
        yAxis.fit(true)
    })


    return chart
}

function addScopeSeries(chart: ChartXY, title: string, colorHash: string): LineSeries {
    return chart
        .addLineSeries({
            dataPattern: { pattern: 'ProgressiveX', regularProgressiveStep: true }
        })
        .setName(title)
        .setDataCleaning({ minDataPointCount: 10000 })
        // Use -1 thickness for best performance, especially on low end devices like mobile / laptops.
        .setStrokeStyle(new SolidLine({
            thickness: -1,
            fillStyle: new SolidFill({ color: ColorHEX(colorHash) }),
         }));
}

function addLegend(chart: ChartXY) {
    chart.addLegendBox()
        .setTitle("")
        .setOrigin(UIOrigins.RightCenter)
        .setDraggingMode(UIDraggingModes.draggable)
        .add(chart);
}