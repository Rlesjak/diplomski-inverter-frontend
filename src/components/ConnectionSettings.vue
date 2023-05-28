<template>

    <button
        @click="toggleConnection"
        class="btn btn-primary"
        :disabled="isLoading"
        :class="{'btn-outline': inverterConnected}"
    >
        {{ isLoading ? 'Spajanje...' : inverterConnected ? 'Odspoji se' : 'Spoji se' }}
    </button>
</template>

<script setup lang="ts">
import { inverterConnected } from '../store/statusStore'
import { setupEventSource, closeEventSource } from '../modules/inverterConnection'
import { ref } from 'vue';

const isLoading = ref(false);

async function toggleConnection() {
    if (inverterConnected.value) {
        closeEventSource();
        inverterConnected.value = false;
    }
    else {
        await openConnection();
    }
}

async function openConnection() {
    isLoading.value = true;

    try {
        await setupEventSource();
        inverterConnected.value = true;
    }
    catch (error) {
        alert("Neuspješno spajanje na inverter!");
    }

    isLoading.value = false;
}
</script>