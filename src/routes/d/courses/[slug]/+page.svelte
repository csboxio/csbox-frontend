<script>
    import {downloadCourseDocument, uploadCourseDocument} from "$lib/utilities/course";
    import { page } from '$app/stores';
    import {browser} from "$app/environment";
    import {onMount} from "svelte";
    import Quill from "quill";
    import { blur } from 'svelte/transition'


    let quill;
    let model;
    export let data;
    let course_data = data.courseData

    const options = {
        modules: {
            toolbar: [
                [{ header: [1, 2, 3, 4, 5, false] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                ["bold", "italic", "underline", "strike"],
                [{ 'direction': 'rtl' }],
                [ 'link', 'image', 'video', 'formula' ],
                ['blockquote', "link", "code-block"]
            ]
        },
        placeholder: "Type something...",
        theme: "snow"
    }

    let content = { html: '', text: ''};

    let edit = false;
    function handleEdit() {
       edit = ((edit === true) ? edit = false : edit = true)
    }

    function handleSave() {
        if (browser) {
            uploadCourseDocument(content.html, $page.params.slug)
        }
    }

    async function getDocument() {
        if (browser) {
            const filePath = `${$page.params.slug + "/" + "document/" + "home"}.HTML?t=${course_data.inserted_at}`
            content.html = await downloadCourseDocument(filePath)
        }
    }

    onMount(async () => {
        await getDocument()
        let container = document.getElementById('editor');
        quill = new Quill(container, options);
        const delta = quill.clipboard.convert(content.html)
        quill.setContents(delta, 'silent')
    })

</script>
<svelte:options accessors={true}/>
<div class="flex flex-row grow max-w-full">
    <section class="p-1 grow max-w-full">
        <h4 class="text-xl font-bold text-white -mx-auto my-5">Home</h4>
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
        on:click={handleEdit}>
                <span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
                  Edit
              </span>
        </button>
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
                on:click={handleSave}>
                <span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
                  Save
              </span>
        </button>
        <div class="container my-6 ">
            <div transition:blur="{{duration: 200}}" class="flex flex space-x-4 grow mr-4">
                    <div transition:blur="{{duration: 200}}" class="flex-1 w-1/2 bg-white min-h-screen" hidden="{edit === true ? '' : 'hidden'}" >
                        <div transition:blur="{{duration: 200}}" id="editor" class="editor bg-white" hidden="{edit === true ? '' : 'hidden'}"></div>
                    </div>
                  <div class="flex-1 w-1/2 bg-white p-2 min-h-screen" hidden="{edit === false ? '' : 'hidden'}">
                    {@html content.html}
                  </div>
            </div>
        </div>
    </section>
</div>
