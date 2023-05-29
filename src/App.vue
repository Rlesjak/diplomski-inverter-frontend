<template>
  <div class="flex w-full h-full">
    <div class="w-full p-2 overflow-auto">
      <BaseGraph/>
      <div class="w-full px-32 py-16">
        <FocBlockDiagramVue />
      </div>
    </div>
    <div class="w-80 p-2 flex flex-col overflow-y-auto border-l-base-300 border-l bg-base-200 prose">
      <SidebarContent />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseGraph from './components/BaseGraph.vue';
import FocBlockDiagramVue from './components/FocBlockDiagram.vue';
import SidebarContent from './sections/SidebarContent.vue';
</script>