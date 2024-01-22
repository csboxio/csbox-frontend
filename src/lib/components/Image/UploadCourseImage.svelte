<script>
    import { fade } from 'svelte/transition';
    import {course_image_loading, deleteImage, loading, uploadAvatar} from "$lib/utilities/imageStorage";
    import Fa from 'svelte-fa/src/fa.svelte';
    import { faUpload} from "@fortawesome/free-solid-svg-icons";
    import {page} from "$app/stores";
    import {browser} from "$app/environment";
    import { resizeFile } from "$lib/utilities/image";
    import {v4 as uuidv4} from "uuid";

    export let course_image_url;

    let showImage = false;
    let image;
    let files = [];
    let uploadedCourseUrl;
    $: uploadedCourseUrl;
    let uploading;

    let user = $page.data.session?.user;

    function onChangePreview() {

        if (files.length > 0) {
            const file = files[0];
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

    async function resizedFile(files) {
        if (browser) {
            const file = files[0]
            return await resizeFile(file)
        }
    }

    export const uploadCourseImage = async (files, supabase) => {

        if (!files || files.length === 0) {
            throw new Error('You must select an image to upload.')
        }

        // Delete old image from database
        const filePath = `${uuidv4() + '-' + uuidv4() + "/" + "icon" + "_courseImage"}.WEBP`

        await deleteImage(filePath, supabase)

        const rfile = await resizedFile(files)

        await supabase.storage.from('courses').upload(filePath, rfile, {})
        const { data } = await supabase.storage.from('courses').getPublicUrl(filePath)

        console.log(data)
        course_image_url = data.publicUrl;

        return course_image_url
    }
</script>

<div class="p-4 rounded-lg items-center justify-center">
    <div class="text-center">
        <div class="pb-5">
            {#if showImage}
                <img transition:fade|local class="mx-auto rounded  w-36 h-36 shadow-xl dark:shadow-gray-800" bind:this={image} src="" alt="">
            {:else}
                <img  class="mx-auto rounded object-scale-down w-36 h-36 shadow-xl dark:shadow-gray-800" src="/images/tailwind-placeholder.jpg" alt="">
            {/if}
        </div>
        <div class="mt-1">
            <label class="inline-flex items-center px-3 py-2 text-lg font-semibold text-center text-white
									bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
									dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                <input class="hidden" type="file" id="single" accept="image/*" bind:files on:change={() => { uploadedCourseUrl = uploadCourseImage(files, $page.data.supabase); onChangePreview(); }  } disabled={uploading}>
                <div class="m-1">
                    <Fa icon={faUpload} size="xs" />
                </div>
                Upload
            </label>
        </div>
    </div>
</div>