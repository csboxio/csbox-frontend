<script>
    import { fade } from 'svelte/transition';
    import {uploadAvatar} from "$lib/utilities/imageStorage";
    import Fa from 'svelte-fa/src/fa.svelte';
    import { faUpload} from "@fortawesome/free-solid-svg-icons";

    export let data
    let { supabase, session } = data
    $: ({ supabase, session } = data)

    let showImage = false;
    let image;
    let files = [];
    let uploadedAvatarUrl;
    $: uploadedAvatarUrl;
    let uploading;

    let user = {};

    function onChangePreview() {

        if (files.length > 0) {
            const file = files[0];
            console.log(file)
            showImage = true;

            const reader = new FileReader();

            reader.addEventListener("load", function() {
                image.setAttribute("src", reader.result);
            });
            reader.readAsDataURL(file);

            return;
        }
        showImage = false;
    }
</script>

<div class="p-4 rounded-lg items-center justify-center">
    <div class="text-center">
        <div class="pb-5">
            {#if showImage}
                <img transition:fade|local class="mx-auto rounded-full object-scale-down w-24 h-24 shadow-xl dark:shadow-gray-800" bind:this={image} src="" alt="">
            {:else}
                <img  class="mx-auto rounded-full object-scale-down w-24 h-24 shadow-xl dark:shadow-gray-800" src="/images/tailwind-placeholder.jpg" alt="">
            {/if}
        </div>
        <div class="mt-1">
            <label class="inline-flex items-center px-3 py-2 text-lg font-semibold text-center text-white
									bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
									dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                <input class="hidden" type="file" id="single" accept="image/*" bind:files on:change={() => { uploadedAvatarUrl = uploadAvatar(files, uploading, user.avatar_url, session, supabase); onChangePreview(); }  } disabled={uploading}>
                <div class="m-1">
                    <Fa icon={faUpload} size="xs" />
                </div>
                Upload
            </label>
        </div>
    </div>
</div>