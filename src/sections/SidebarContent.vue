<template>
    <ConnectionSettings />

    <Transition>
        <div v-if="inverterConnected">
            <h3>Upravljanje motorom</h3>
            <div class="flex items-center">
                <div class="mx-auto btn-group btn-group-horizontal">
                    <button
                        @click="InverterCommand.motorDisable()"
                        class="w-32 btn text-base-100"
                        :class="{ 'btn-disabled':!inverterStatus.motorRunning, 'bg-error':inverterStatus.motorRunning }"
                    >
                        STOP
                    </button>
                    <button
                        @click="InverterCommand.motorEnable()"
                        class="btn text-neutral hover:text-base-100"
                        :class="{ 'btn-disabled':inverterStatus.motorRunning, 'bg-green-400':!inverterStatus.motorRunning }"
                    >
                    START
                </button>
                </div>
            </div>

            <h4>Status:</h4>
            <h5>DCBUS = <strong>{{ inverterStatus.dcBusVoltage }}</strong>V</h5>
            <span class="mt-2 text-sm font-semibold">SpeedReg:</span>
            <h5>Kp = <strong>{{ inverterStatus.regSpdKp }}</strong></h5>
            <h5>Ki = <strong>{{ inverterStatus.regSpdKi }}</strong></h5>

            <hr class="my-3">

            <h4>Referentne vrijednosti</h4>
            <div class="form-control">
                <label class="ml-1 text-lg font-bold">Id [A]</label>
                <div class="input-group">
                    <input v-model="id" type="number" step="0.05" min="0" max="1" class="h-9 input input-bordered" />
                    <button @click="submitid()" class="h-9 min-h-8 btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </button>
                </div>


                <label class="mt-4 ml-1 text-lg font-bold">Nref [od -1 do 1]</label>
                <div class="input-group">
                    <input v-model="nref" type="number" step="0.05" min="-1" max="1" class="h-9 input input-bordered" />
                    <button @click="submitnref()" class="h-9 min-h-8 btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </button>
                </div>
            </div>

            <h4>Parametri regulatora</h4>

            <RegulatorBaseForm
                title="Regulator brzine"
                :kp-setter="InverterCommand.setSpeedRegProportionalGain"
                :ki-setter="InverterCommand.setSpeedRegIntegralGain"
            />
            <RegulatorBaseForm
                title="Regulator Id"
                :kp-setter="() => {}"
                :ki-setter="() => {}"
            />
            <RegulatorBaseForm
                title="Regulator Iq"
                :kp-setter="() => {}"
                :ki-setter="() => {}"
            />
        </div>
    </Transition>

    <a class="mt-auto text-center text-gray-500" href="http://lesjak.tech" target="_blank" rel="noopener noreferrer">Robert Lesjak - lesjak.tech</a>
</template>

<script setup lang="ts">
import ConnectionSettings from '@/components/ConnectionSettings.vue';
import RegulatorBaseForm from '../components/RegulatorBaseForm.vue';
import { inverterConnected, inverterStatus } from '@/store/statusStore';
import { InverterCommand } from '@/modules/inverterConnection';
import { ref } from 'vue';

const id = ref(0);
const nref = ref(0);

function submitid() {
    InverterCommand.setId(id.value);
}

function submitnref() {
    InverterCommand.setSpeed(nref.value);
}
</script>