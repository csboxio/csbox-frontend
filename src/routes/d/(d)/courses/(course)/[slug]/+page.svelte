<svelte:options accessors={true} />

<script lang="ts">
	import { downloadCourseDocument, uploadCourseDocument } from '$lib/utilities/course';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount, setContext } from 'svelte';
	import Quill from 'quill';
	import { blur } from 'svelte/transition';
	import {navStore} from "../../../../../../lib/stores/stores.js";
	import RichTextComposer from "$lib/editor/RichTextComposer.svelte";
	import PlaygroundEditorTheme from '$lib/editor/themes/PlaygroundEditorTheme';
	import EditorSettings from "$lib/editor/settings/EditorSettings.svelte";
	import {createSettingsStore} from "../../../../../../lib/editor/settings/settingsStore.js";
	import '$lib/editor/themes/editor.css'

	let quill;
	let model;
	export let data;
	let courses = $page.data.courses.data;
	let html;
	let user = $page.data.session?.user
	let slug = $page.params.slug
	export let layout_course = courses;

	const settings = createSettingsStore();
	setContext('settings', settings);

	const mode = {
		edit: false,
		view: true
	};
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
	let content = { html: '', text: '' };

	function handleEdit() {
		mode.edit = !mode.edit;
		mode.view = !mode.view;
	}

	function handleSave() {
		if (browser) {
			uploadCourseDocument(quill.root.innerHTML, $page.params.slug, data.session.user.id, $page.data.supabase);
			//invalidateAll()
			mode.view = true;
			mode.edit = false;
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

	async function getDocument() {
		if (browser) {
			const filePath = `${$page.params.slug + '/' + 'document/' + 'home'}.HTML?t=${
				courses.inserted_at
			}`;
			content.html = await downloadCourseDocument(filePath, $page.data.supabase);
		}
	}

	async function setupQuill() {
		if (browser) {
			await getDocument();
			let container = document.getElementById('editor');
			quill = new Quill(container, options);
			const delta = quill.clipboard.convert(content.html);
			quill.setContents(delta, 'silent');
		}

	}

	onMount(async () => {
		// Set the selected item when the page is mounted
		navStore.set('courses');
		if (browser) {

			await setupQuill();
		}
	});


</script>
<div class="flex flex-row grow max-w-full-1/2">
	<section class="p-1 grow max-w-full-1/2">
		<div class="flex justify-between">
			<h4 class="text-xl font-bold text-white -mx-auto my-5">Home</h4>

			{#if mode.view}
				<div class="">
					<button
						class="my-4 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
						on:click={handleEdit}
					>
						<span
							class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0"
						>
							Edit
						</span>
					</button>
				</div>
			{/if}
		</div>
		{#if mode.edit}
			<button
				class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
				on:click={handleSave}
			>
				<span
					class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0"
				>
					Save
				</span>
			</button>
			<button
				class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
				on:click={handlePreview}
			>
				<span
					class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0"
				>
					Preview
				</span>
			</button>
			<button
				class="relative inline-flex float-right items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-red-300 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800"
				on:click={handleCancel}
			>
				<span
					class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0"
				>
					Cancel
				</span>
			</button>
		{/if}

		<div class=" my-6 rounded-lg">
			<div class="">

					<RichTextComposer theme={PlaygroundEditorTheme} />
					<EditorSettings />



				<!--<div
					class="flex-1 w-1/2 bg-white min-h-screen border-0 rounded-lg"
					hidden={mode.edit === true ? '' : 'hidden'}
					transition:blur|local={{ duration: 200 }}
				>
					<div
						class="editor bg-white"
						hidden={mode.edit === true ? '' : 'hidden'}
						id="editor"
						transition:blur|local={{ duration: 200 }}
					/>
				</div>
				<div
					class="editor flex-1 w-1/2 bg-white p-2 min-h-screen border-0 rounded-lg"
					hidden={mode.edit === false ? '' : 'hidden'}
				>
					{@html content.html}
				</div>-->
			</div>
		</div>
	</section>
</div>
