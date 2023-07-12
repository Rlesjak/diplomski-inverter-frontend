<template>
  <div class="flex w-full h-full">
    <div ref="contentEl" class="w-full p-2 overflow-auto">
      <BaseGraph/>
      <div class="w-full px-20 py-10">

        <div v-if="diagramIsModal" class="fixed block top-0 bottom-0 left-0 right-0 bg-black bg-opacity-60">

        </div>

        <div
          class="bg-gray-100 px-6 py-4 rounded-md transition-all z-10"
          :class="{
            'fixed block top-10 bottom-10 left-10 right-10 drop-shadow-lg': diagramIsModal
          }"
        >
          <div class="relative w-full h-full">
            <div
              @click="toggleDiagramModal"
              class="absolute p-1 right-0 transition-all rounded-full hover:bg-slate-300 hover:cursor-pointer"
            >
              <Icon v-if="diagramIsModal" :icon="xMark20Solid" class="w-6 h-6"/>
              <Icon v-else :icon="arrowTopRightOnSquare20Solid" class="w-6 h-6" />
            </div>
            <h1 class="text-center text-xl">Blokovski dijagram regulacijske strukture</h1>
            <FocBlockDiagramVue class="h-[calc(100%-3rem)] w-full mt-6 z-10" />
          </div>
        </div>

      </div>
    </div>
    <div class="w-80 p-2 flex flex-col overflow-y-auto border-l-base-300 border-l bg-base-200 prose">
      <SidebarContent />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseGraph from './components/BaseGraph.vue';
import FocBlockDiagramVue from './components/FocBlockDiagram.vue';
import SidebarContent from './sections/SidebarContent.vue';
import { Icon } from '@iconify/vue';
import arrowTopRightOnSquare20Solid from '@iconify-icons/heroicons/arrow-top-right-on-square-20-solid';
import xMark20Solid from '@iconify-icons/heroicons/x-mark-20-solid';

const diagramIsModal = ref<boolean>(false);
const contentEl = ref<HTMLDivElement>();

function toggleDiagramModal() {
  diagramIsModal.value = !diagramIsModal.value
  setTimeout(() => {
    if (contentEl.value) {
      // Vrati se na dno contenta da je vidljiv blokovski
      contentEl.value.scrollTo({ top: contentEl.value.scrollHeight, behavior: 'smooth' })
    }
  }, 10)
}
</script>