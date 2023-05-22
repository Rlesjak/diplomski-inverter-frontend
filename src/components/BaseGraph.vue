<template>
    <div id="baseChart1" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { generateChart } from '../inverter/inverterConnection';
import { onMounted } from 'vue';

onMounted(() => {
    const chartEl = document.getElementById('baseChart1');
    if (chartEl) {
        generateChart(chartEl);
    }
})
</script>