<template>
    <div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
        <input type="checkbox" class="peer" />
        <div class="collapse-title text-lg font-medium">
            Regulator brzine
        </div>
        <div class="collapse-content">
            <div class="flex items-center mt-1">
                <label class="w-12 text-lg font-bold">Kp</label>
                <input type="text" placeholder="Type here" class="input input-bordered input-sm w-full max-w-xs" />
            </div>

            <div class="flex items-center mt-1">
                <label class="w-12 text-lg font-bold">Ki</label>
                <input type="text" placeholder="Type here" class="input input-bordered input-sm w-full max-w-xs" />
            </div>
            <button class="w-full mt-2 btn btn-sm">Pošalji</button>
        </div>
    </div>
</template>