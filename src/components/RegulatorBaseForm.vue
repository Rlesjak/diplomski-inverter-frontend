<template>
    <div class="mt-1 p-3 border border-base-300 bg-base-100 rounded-box">
        <div class="text-lg font-medium">
            {{ $props.title }}
        </div>
        <div class="">
            <div class="flex items-center mt-1">
                <label class="w-12 text-lg font-bold">Kp</label>
                <input v-model="kp" type="text" placeholder="Type here" class="input input-bordered input-sm w-full max-w-xs" />
            </div>

            <div class="flex items-center mt-1">
                <label class="w-12 text-lg font-bold">Ki</label>
                <input v-model="ki" type="text" placeholder="Type here" class="input input-bordered input-sm w-full max-w-xs" />
            </div>
            <button @click="submitToInverter" class="w-full mt-2 btn btn-sm">Pošalji</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const kp = ref(0);
const ki = ref(0);

const props = defineProps<{
  title: string,
  endpoint: string
}>()

function submitToInverter() {
    console.log('submitting to inverter');
    console.log(props.endpoint);
    console.log(kp.value);
    console.log(ki.value);
}

</script>