<script>
    import { downloadQuillDocument, uploadQuillDocument, updateAssignmentInsert } from '$lib/utilities/quill';

    // EXPORTS
    export let supabase;
    export let storePath;
    export let filePath;

    // ---------------  QUILL ---------------

    // --------------- Initialize variables ---------------

    // Different modes
    import {browser} from "$app/environment";
    import Quill from "quill";
    import {page} from "$app/stores";
    import {onMount} from "svelte";
    import {invalidate} from "$app/navigation";

    const mode = {
        edit: false,
        view: true
    };

    // Initialize quill
    let quill;

    // Quill options
    const options = {
        modules: {
            toolbar: [
                [{ header: [1, 2, 3, 4, 5, false] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }],
                [{ indent: '-1' }, { indent: '+1' }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ direction: 'rtl' }],
                ['link', 'image', 'video', 'formula'],
                ['blockquote', 'link', 'code-block']
            ]
        },
        placeholder: 'Type something...',
        theme: 'snow'
    };

    // The content itself.
    let content;
    $: content = { html: '', text: '' };

    // --------------- END OF Initialize variables ---------------

    // Setup 1
    async function setupQuill() {
        if (browser) {
            await getDocument();
            let container = document.getElementById('editor');
            quill = new Quill(container, options);
            const delta = quill.clipboard.convert(content.html);
            quill.setContents(delta, 'silent');
        }

    }

    // --------------- QUILL FUNCTIONS  ---------------

    function handleEdit() {

        mode.edit = !mode.edit;
        mode.view = !mode.view;
    }

    async function handleSave() {
        if (browser) {
            const filePath = `${$page.params.slug}/assignments/${$page.params.assignment}/document.HTML`;

            await uploadQuillDocument(quill.root.innerHTML, $page.params.slug,
                $page.data.session.user.id, supabase, filePath, "assignments");

            await updateAssignmentInsert($page.params.assignment, supabase)

            mode.view = true;
            mode.edit = false;

            content.html = quill.root.innerHTML;

            await loadShadowDom()


            //await invalidate('/d/courses/' + $page.params.slug)
        }
    }

    function handleCancel() {
        mode.view = true;
        mode.edit = false;
        quill.root.innerHTML = content.html;
    }

    function handlePreview() {
        mode.view = true;
        mode.edit = false;
        content.html = quill.root.innerHTML;
    }

    // --------------- END OF QUILL FUNCTIONS  ---------------


    // Setup 2
    async function getDocument() {
        if (browser) {
            //const filePath = `${$page.params.slug}/assignments/${$page.params.assignment}/document.HTML?t=${assignment_data.updated_at}`;
            content.html = await downloadQuillDocument(filePath, supabase, 'assignments');

            localStorage.setItem(storePath, JSON.stringify(content))
        }
    }


    async function loadShadowDom() {
        let storedDocument = localStorage.getItem(storePath);
        const shadowHost = document.querySelector('#shadow-host');
        const shadowRoot = shadowHost.attachShadow({ mode: 'open' });


        content = JSON.parse(storedDocument);


        shadowRoot.innerHTML = content.html;
    }

    // ------------- END OF QUILL ---------------

    onMount(async () => {
        await loadShadowDom()

        // Setup quill
        if (browser) {
            await setupQuill();
        }
    });
</script>

<style>
    div#preview > * {
        box-sizing: border-box;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 13px;
        height: 100%;
        position: relative;
        margin: unset;
    }

</style>

<div class="mb-4 ">
    <section class="p-1 grow max-w-full mt-4">
        {#if mode.view}
            <div class="">
                <button class="my-0 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
                        on:click={handleEdit}>
						<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
							Edit
						</span>
                </button>
            </div>
        {/if}
        {#if mode.edit}
            <button
                    class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
                    on:click={handleSave}>
				<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
					Save
				</span>
            </button>
            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
                    on:click={handlePreview}>
				<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
					Preview
				</span>
            </button>
            <button class="relative inline-flex float-right items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-red-300 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800"
                    on:click={handleCancel}>
				<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
					Cancel
				</span>
            </button>
        {/if}
        <div class=" my-4 rounded-lg">
            <div class="flex flex space-x-4 grow mr-4 rounded-lg">
                <div class="flex-1 w-1/2 bg-gray-100 text-white min-h-8  border-0 rounded-lg"
                     hidden={mode.edit === true ? '' : 'hidden'}>
                    <div class="editor bg-gray-600 text-white"
                         hidden={mode.edit === true ? '' : 'hidden'}
                         id="editor"/>
                </div>
                <div class="editor flex-1 w-1/2 bg-gray-600 text-white min-h-8 border rounded-lg p-2 pb-10"

                     hidden={mode.edit === false ? '' : 'hidden'}>
                    <div class="px-6 ql-snow" id="test">
                        <div id="shadow-host"></div>
                        {content.html}
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

