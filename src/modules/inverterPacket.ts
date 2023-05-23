import { type } from "os";

export type Ipkt_IsrTick = number;

export type Ipkt_Ia = number;
export type Ipkt_Ib = number;
export type Ipkt_Ic = number;

export type Ipkt_DcBus = number;

export type Ipkt_Id = number;
export type Ipkt_Iq = number;

export type Ipkt_theta_e = number;
export type Ipkt_omega_e = number;

export type Ipkt_Out_Vd = number;
export type Ipkt_Out_Vq = number;

export type Ipkt_RegSpeed_Fback = number;
export type Ipkt_RegSpeed_Output = number;

export type Ipkt_RegId_Fback = number;
export type Ipkt_RegId_Output = number;

export type Ipkt_RegIq_Fback = number;
export type Ipkt_RegIq_Output = number;

export type Ipkt_EncoderTheta = number;
export type Ipkt_EncoderOmega = number;

export type Ipkt_SpeedRef = number;

export type Ipkt_MotorRunStop = number;

export type Ipkt_RegSpeed_RefVal = number;
export type Ipkt_RegSpeed_Kp = number;
export type Ipkt_RegSpeed_Ki = number;

export type Ipkt_RegId_RefVal = number;
export type Ipkt_RegId_Kp = number;
export type Ipkt_RegId_Ki = number;

export type Ipkt_RegIq_RefVal = number;
export type Ipkt_RegIq_Kp = number;
export type Ipkt_RegIq_Ki = number;

/**
 *      [0] -> IsrTick,
 *      [1] -> Ia,
 *      [2] -> Ib,
 *      [3] -> Ic,
 * [4] -> DcBus,
 *      [5] -> Id,
 *      [6] -> Iq,
 *      [7] -> theta_e,
 *      [8] -> omega_e,
 *      [9] -> Out_Vd,
 *      [10] -> Out_Vq,
 * [11] -> RegSpeed_Fback,
 * [12] -> RegSpeed_Output,
 * [13] -> RegId_Fback,
 * [14] -> RegId_Output,
 * [15] -> RegIq_Fback,
 * [16] -> RegIq_Output,
 *      [17] -> EncoderTheta,
 *      [18] -> EncoderOmega,
 *      [19] -> SpeedRef,
 * [20] -> MotorRunStop,
 *      [21] -> RegSpeed_RefVal,
 * [22] -> RegSpeed_Kp,
 * [23] -> RegSpeed_Ki,
 * [24] -> RegId_RefVal,
 * [25] -> RegId_Kp,
 * [26] -> RegId_Ki,
 * [27] -> RegIq_RefVal,
 * [28] -> RegIq_Kp,
 * [29] -> RegIq_Ki
 */
export type InverterPacket = [
    Ipkt_IsrTick,
    Ipkt_Ia,
    Ipkt_Ib,
    Ipkt_Ic,
    Ipkt_DcBus,
    Ipkt_Id,
    Ipkt_Iq,
    Ipkt_theta_e,
    Ipkt_omega_e,
    Ipkt_Out_Vd,
    Ipkt_Out_Vq,
    Ipkt_RegSpeed_Fback,
    Ipkt_RegSpeed_Output,
    Ipkt_RegId_Fback,
    Ipkt_RegId_Output,
    Ipkt_RegIq_Fback,
    Ipkt_RegIq_Output,
    Ipkt_EncoderTheta,
    Ipkt_EncoderOmega,
    Ipkt_SpeedRef,
    Ipkt_MotorRunStop,
    Ipkt_RegSpeed_RefVal,
    Ipkt_RegSpeed_Kp,
    Ipkt_RegSpeed_Ki,
    Ipkt_RegId_RefVal,
    Ipkt_RegId_Kp,
    Ipkt_RegId_Ki,
    Ipkt_RegIq_RefVal,
    Ipkt_RegIq_Kp,
    Ipkt_RegIq_Ki
];