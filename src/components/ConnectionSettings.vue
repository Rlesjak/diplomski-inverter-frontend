<template>

    <Transition>
        <div v-if="!inverterConnected">
            <div @click="reload()" class="w-full btn btn-info">
                Očisti
            </div>
            <p class="mt-4 mb-2">Adresa invertera: </p>
            <input
                v-model="inverterAddress"
                class="w-full px-2 py-1 text-black border border-gray-400 rounded"
                type="text"
            >
        </div>
    </Transition>

    <button
        @click="toggleConnection"
        class="mt-4 btn btn-primary"
        :class="{'btn-outline': inverterConnected, 'animate-pulse': isLoading}"
    >
        {{ isLoading ? 'Spajanje... (otkaži)' : inverterConnected ? 'Odspoji se' : 'Spoji se' }}
    </button>
</template>

<script setup lang="ts">
import { inverterConnected } from '../store/statusStore'
import { setupEventSource, closeEventSource, DEFAULT_INVERTER_ADDRESS } from '../modules/inverterConnection'
import { ref } from 'vue';

const isLoading = ref(false);
const inverterAddress = ref(DEFAULT_INVERTER_ADDRESS);

async function toggleConnection() {
    if (inverterConnected.value || isLoading.value) {
        closeEventSource();
        inverterConnected.value = false;
        isLoading.value = false;
    }
    else {
        await openConnection();
    }
}

async function openConnection() {
    isLoading.value = true;

    try {
        await setupEventSource(inverterAddress.value);
        inverterConnected.value = true;
    }
    catch (error) {
        alert("Neuspješno spajanje na inverter!");
    }

    isLoading.value = false;
}

function reload() {
    location.reload();
}
</script>