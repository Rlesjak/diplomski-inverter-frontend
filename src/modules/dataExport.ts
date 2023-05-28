import { subscribeToInverterStream, unsubscribeFromInverterStream } from "./inverterConnection";

const csvHeader = "IsrTick,Ia,Ib,Ic,DcBus,Id,Iq,theta_e,omega_e,Out_Vd,Out_Vq,RegSpeed_Fback,RegSpeed_Output,RegId_Fback,RegId_Output,RegIq_Fback,RegIq_Output,EncoderTheta,EncoderOmega,SpeedRef,MotorRunStop,RegSpeed_RefVal,RegSpeed_Kp,RegSpeed_Ki,RegId_RefVal,RegId_Kp,RegId_Ki,RegIq_RefVal,RegIq_Kp,RegIq_Ki";
let recordingBuffer: Array<string> = [];

export function startRecording() {
    recordingBuffer = [];
    recordingBuffer.push(csvHeader);

    subscribeToInverterStream("dataExport", (data) => {
        recordingBuffer.push(data.join(","));
    });
}

export function stopRecordingAndExport() {
    unsubscribeFromInverterStream("dataExport");

    // Ako je spremljeno podataka, exportaj ih
    if (recordingBuffer.length > 1) {
        const csvContent = recordingBuffer.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "data.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    recordingBuffer = [];
}
