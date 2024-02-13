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
</div>