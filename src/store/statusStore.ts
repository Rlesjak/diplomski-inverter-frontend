import { reactive, ref } from "vue";

export const inverterConnected = ref(false);
export const inverterStatus = reactive({
    dcBusVoltage: 0,
    motorRunning: false,
    wantedSpeed: 0,

    // Regulator brzine
    regSpdKp: 0,
    regSpdKi: 0,

    regSpdRef: 0,
    regSpdFback: 0,

    // Regulator Id
    regIdKp: 0,
    regIdKi: 0,

    regIdFback: 0,
    regIdRef: 0,
    regIdOutput: 0,

    // Regulator Iq
    regIqKp: 0,
    regIqKi: 0,

    regIqFback: 0,
    regIqRef: 0,
    regIqOutput: 0,
});