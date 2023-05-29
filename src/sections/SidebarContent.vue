<template>
    <ConnectionSettings />

    <div class="flex flex-col">
        <h4>Snimi i spremi podatke u csv </h4>
        <div @click="handleRecordBtn()" class="btn btn-secondary" :class="{'animate-pulse':recording}">
            <svg v-if="recording" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
            </svg>
        </div>
    </div>

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

            <h4>Vrijednosti parametara regulatora:</h4>
            <div class="flex">
                <div class="w-1/3">
                    <span class="mt-2 text-sm font-semibold">SpeedReg:</span>
                    <h6 class="text-xs">Kp = <strong>{{ inverterStatus.regSpdKp.toFixed(6) }}</strong></h6>
                    <h6 class="text-xs">Ki = <strong>{{ inverterStatus.regSpdKi.toFixed(6) }}</strong></h6>
                </div>
                <div class="w-1/3 pl-1 border-l-2 border-l-gray-400">
                    <span class="mt-2 text-sm font-semibold">IdReg:</span>
                    <h6 class="text-xs">Kp = <strong>{{ inverterStatus.regIdKp.toFixed(6) }}</strong></h6>
                    <h6 class="text-xs">Ki = <strong>{{ inverterStatus.regIdKi.toFixed(6) }}</strong></h6>
                </div>
                <div class="w-1/3 pl-1 border-l-2 border-l-gray-400">
                    <span class="mt-2 text-sm font-semibold">IqReg:</span>
                    <h6 class="text-xs">Kp = <strong>{{ inverterStatus.regIqKp.toFixed(6) }}</strong></h6>
                    <h6 class="text-xs">Ki = <strong>{{ inverterStatus.regIqKi.toFixed(6) }}</strong></h6>
                </div>
            </div>

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

            <h4>Postavljanje parametara regulatora</h4>

            <RegulatorBaseForm
                title="Regulator brzine"
                :kp-setter="InverterCommand.setSpeedRegProportionalGain"
                :ki-setter="InverterCommand.setSpeedRegIntegralGain"
            />
            <RegulatorBaseForm
                title="Regulator Id"
                :kp-setter="InverterCommand.setIdRegProportionalGain"
                :ki-setter="InverterCommand.setIdRegIntegralGain"
            />
            <RegulatorBaseForm
                title="Regulator Iq"
                :kp-setter="InverterCommand.setIqRegProportionalGain"
                :ki-setter="InverterCommand.setIqRegIntegralGain"
            />
        </div>
    </Transition>

    <div class="mt-auto pt-6 ml-8">
        <template v-if="memory">
            <div opacity="50">
                {{ `Used: ${size(memory.usedJSHeapSize)}` }}
            </div>
            <div opacity="50">
                {{ `Allocated: ${size(memory.totalJSHeapSize)}` }}
            </div>
            <div opacity="50">
                {{ `Limit: ${size(memory.jsHeapSizeLimit)}` }}
            </div>
        </template>
    </div>
    <a class="mt-4 text-center text-gray-500" href="http://lesjak.tech" target="_blank" rel="noopener noreferrer">Robert Lesjak - lesjak.tech</a>
</template>

<script setup lang="ts">
import ConnectionSettings from '@/components/ConnectionSettings.vue';
import RegulatorBaseForm from '../components/RegulatorBaseForm.vue';
import { inverterConnected, inverterStatus } from '@/store/statusStore';
import { InverterCommand } from '@/modules/inverterConnection';
import { startRecording, stopRecordingAndExport } from '@/modules/dataExport';
import { useMemory } from '@vueuse/core'
import { ref } from 'vue';

const id = ref(0);
const nref = ref(0);
const recording = ref(false);
const { memory } = useMemory()

function submitid() {
    InverterCommand.setId(id.value);
}

function submitnref() {
    InverterCommand.setSpeed(nref.value);
}

function handleRecordBtn() {
    if(recording.value) {
        recording.value = false;
        stopRecordingAndExport();
        return;
    }
    recording.value = true;
    startRecording();
}

function size(v: number) {
  const kb = v / 1024 / 1024
  return `${kb.toFixed(2)} MB`
}
</script>