<template>
    <ConnectionSettings />

    <h3>Upravljanje motorom</h3>
    <div class="flex items-center">
        <div class="mx-auto btn-group btn-group-horizontal">
            <button class="w-32 btn bg-error text-base-100">STOP</button>
            <button class="btn bg-green-400 text-neutral hover:text-base-100">START</button>
        </div>
    </div>

    <hr class="my-4">

    <h4>Referentne vrijednosti</h4>
    <div class="form-control">
        <label class="ml-1 text-lg font-bold">Id [A]</label>
        <div class="input-group">
            <input type="number" step="0.05" min="0" max="1" class="h-9 input input-bordered" />
            <button class="h-9 min-h-8 btn btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </button>
        </div>


        <label class="mt-4 ml-1 text-lg font-bold">Nref [od -1 do 1]</label>
        <div class="input-group">
            <input type="number" step="0.05" min="-1" max="1" class="h-9 input input-bordered" />
            <button class="h-9 min-h-8 btn btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </button>
        </div>
    </div>

    <h4>Parametri regulatora</h4>

    <RegulatorBaseForm title="Regulator brzine" endpoint="regspeed" />
    <RegulatorBaseForm title="Regulator Id" endpoint="regdirect" />
    <RegulatorBaseForm title="Regulator Iq" endpoint="regquad" />

    <a class="mt-auto text-center text-base-100" href="http://lesjak.tech" target="_blank" rel="noopener noreferrer">Robert Lesjak - lesjak.tech</a>
</template>

<script setup lang="ts">
import ConnectionSettings from '@/components/ConnectionSettings.vue';
import RegulatorBaseForm from '../components/RegulatorBaseForm.vue';

</script>