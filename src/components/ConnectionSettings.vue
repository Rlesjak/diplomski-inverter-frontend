<template>

    <button
        @click="connectToInverter"
        class="btn"
        :class="{'btn-primary': !inverterConnected, 'btn-disabled': inverterConnected}"
    >
        {{ inverterConnected ? 'Spojeno' : 'Spoji se' }}
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
import { setupEventSource } from '../inverter/inverterConnection'

function connectToInverter() {
    setupEventSource();
    //inverterConnected.value = true;
}
</script>