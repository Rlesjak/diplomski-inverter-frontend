<template>
    <div class="mt-1 p-3 border border-base-300 bg-base-100 rounded-box">
        <div class="text-lg font-medium">
            {{ $props.title }}
        </div>
        <div class="">
            <div class="flex">
                <label class="w-8 text-lg font-bold">Kp</label>
                <div class="input-group">
                    <input v-model="kp" type="number" step="0.05" min="0" max="1" class="h-9 input input-bordered" />
                    <button @click="submitkp()" class="h-9 min-h-8 btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="flex mt-2">
                <label class="w-8 text-lg font-bold">Ki</label>
                <div class="input-group">
                    <input v-model="ki" type="number" step="0.05" min="0" max="1" class="h-9 input input-bordered" />
                    <button @click="submitki()" class="h-9 min-h-8 btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const kp = ref(0);
const ki = ref(0);

const props = defineProps<{
    title: string,
    kpSetter: (value: number) => void,
    kiSetter: (value: number) => void,
}>()

function submitki() {
    props.kiSetter(ki.value);
}

function submitkp() {
    props.kpSetter(kp.value);
}

</script>