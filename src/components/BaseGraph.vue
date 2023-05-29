<template>
    <div id="baseChart1" class="w-full h-[1500px]"></div>
</template>

<script setup lang="ts">
import { initialiseScopeInstance } from '../modules/scope';
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
    const chartEl = document.getElementById('baseChart1') as HTMLDivElement;
    if (chartEl) {
        initialiseScopeInstance(chartEl);
    }
})

onUnmounted(() => {
    console.log("Unmounting");
});
</script>