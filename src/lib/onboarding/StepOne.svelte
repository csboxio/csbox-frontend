<script>
    import UploadProfileImage from "$lib/components/Image/UploadProfileImage.svelte";
    import Fa from 'svelte-fa/src/fa.svelte';
    import {faSpinner} from "@fortawesome/free-solid-svg-icons";

    export let data;
    export let loading;
    export let currentStep;
</script>

<div class="w-full  px-3 mb-2 lg:mb-0 items-center justify-center">
    <div class="mb-2 text-center">
        <div class="text-xl font-bold tracking-wide text-white mb-1">Profile Picture</div>
    </div>
    <UploadProfileImage bind:data={data}/>
    <div class="flex justify-between w-full sm:w-auto mt-2">
        <div>
            <a class="inline-block py-2 px-4 mr-3 text-xs text-center font-semibold leading-normal text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200 cursor-not-allowed" disabled >
                Back
            </a>
        </div>

        <button
                class="inline-block py-2 px-4 text-sm text-center font-bold leading-normal text-gray-100 bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-200"
                on:click|preventDefault={() => {currentStep = 2;}}>
            {#if loading}
                <svg class="animate-spin h-4 w-4 mr-3 inline">
                    <Fa icon={faSpinner} size="xs" />
                </svg>
            {/if}
            Next
        </button>
    </div>
</div>