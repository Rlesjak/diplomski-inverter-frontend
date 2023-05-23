<template>

    <button
        @click="toggleConnection"
        class="btn btn-primary"
        :disabled="isLoading"
        :class="{'btn-outline': inverterConnected}"
    >
        {{ isLoading ? 'Spajanje...' : inverterConnected ? 'Odspoji se' : 'Spoji se' }}
    </button>

    <h5>Period akvizicije podataka: </h5>
    <select class="select select-bordered select-sm w-full max-w-[8rem]">
        <option selected>100xT</option>
        <option>50xT</option>
        <option>20xT</option>
        <option>10xT</option>
    </select>
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