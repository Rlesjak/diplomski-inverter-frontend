<template>
    <div id="baseChart1" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { initialiseScopeInstance } from '../modules/scope';
import { onMounted } from 'vue';

onMounted(() => {
    const chartEl = document.getElementById('baseChart1') as HTMLDivElement;
    if (chartEl) {
        initialiseScopeInstance(chartEl);
    }
})
</script>