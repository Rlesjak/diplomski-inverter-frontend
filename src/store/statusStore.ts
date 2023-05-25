import { reactive, ref } from "vue";

export const inverterConnected = ref(false);
export const inverterStatus = reactive({
    dcBusVoltage: 0,
    motorRunning: false,
    regSpdKp: 0,
    regSpdKi: 0
});