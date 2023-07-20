<svelte:options accessors={true} />

<script lang="ts">
	import { downloadQuillDocument, uploadQuillDocument, updateCourseInsert } from '$lib/utilities/quill';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import {afterUpdate, onMount, setContext} from 'svelte';
	import Quill from 'quill';
	import {courseNavStore, navStore} from "../../../../../../lib/stores/stores.js";
	import {invalidate, invalidateAll} from "$app/navigation";
	import 'quill/dist/quill.bubble.css'

	import sanitizeHtml from 'sanitize-html';

	let quill;
	export let data;

	let { supabase } = data
	$: ({ supabase } = data)
	
	let courses;
	$: courses = $page.data.courses.data;
	let html;
	let user = $page.data.session?.user
	let slug = $page.params.slug
	export let layout_course = courses;

	let storePath = `home-${$page.params.slug}-document`
	let filePath = `${$page.params.slug}/documents/${$page.params.assignment}/home.HTML`

	let course;
	$: course = courses.filter((course) => course.id === parseInt($page.data.slug))[0]

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

	//const viewOptions = {
	//	readOnly: true,
	//	theme: 'snow'
	//};
	let content;
	$: content = { html: '', text: '' };

	function handleEdit() {
		mode.edit = !mode.edit;
		mode.view = !mode.view;
	}

	async function handleSave() {
		if (browser) {

			const filePath = `${$page.params.slug + "/" + "document/" + "home"}.HTML`;
			let sanitizedHtml = sanitizeHtml(quill.root.innerHTML)
			uploadQuillDocument(sanitizedHtml, $page.params.slug,
					$page.data.session.user.id, supabase, filePath, "courses");
			await updateCourseInsert($page.params.slug, user.id, supabase)

			mode.view = true;
			mode.edit = false;

			//localStorage.setItem(`course-doc-${$page.params.slug}`, JSON.stringify(content))
			content.html = quill.root.innerHTML;

			//await invalidateAll()
			//await getDocument();

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
					course.inserted_at
			}`;
			content.html = await downloadQuillDocument(filePath, supabase, 'courses');
			localStorage.setItem(`course-doc-${$page.params.slug}`, JSON.stringify(content))
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

	let storedDocument
	$: storedDocument = localStorage.getItem(`course-doc-${$page.params.slug}`);

	onMount(async () => {
		const shadowHost = document.querySelector('#shadow-host');
		const shadowRoot = shadowHost.attachShadow({ mode: 'open' });


		if (storedDocument) {
			content = JSON.parse(storedDocument);
		}

		shadowRoot.innerHTML = content.html;

		// Set the selected item when the page is mounted
		navStore.set('courses');
		courseNavStore.set('Home')

		if (browser) {
			await setupQuill();
		}
	});

	afterUpdate(() => {
		localStorage.setItem(`course-doc-${$page.params.slug}`, JSON.stringify(content))
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

<div class="flex flex-row grow max-w-full-1/2">
	<section class="p-1 grow max-w-full-1/2 mt-4">

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
				<div class="flex-1 w-1/2 bg-gray-100 text-white min-h-screen border-0 rounded-lg"
					 hidden={mode.edit === true ? '' : 'hidden'}>
					<div class="editor bg-gray-600 text-white"
						 hidden={mode.edit === true ? '' : 'hidden'}
						 id="editor"/>
				</div>

				<!-- TODO This needs some work, I need to figure out how to make this look the same as the editor -->
				<div class="editor flex-1 w-1/2 bg-gray-600 text-white min-h-screen border rounded-lg"
					 hidden={mode.edit === false ? '' : 'hidden'}>
					<div class="px-6 ql-snow" id="preview">
					<div id="shadow-host">

					</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>