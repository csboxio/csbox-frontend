<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import {goto, invalidateAll} from '$app/navigation';
	import {page} from "$app/stores";
	import {Input, Label} from "flowbite-svelte";
	import {onMount} from "svelte";
	import {assign} from "quill-delta-to-html/dist/commonjs/helpers/object.js";
	import {browser} from "$app/environment";
	import Quill from "quill";
	import { downloadQuillDocument, uploadQuillDocument } from '$lib/utilities/quill';
	import {updateAssignmentInsert} from "../../../../../../../../lib/utilities/quill.js";

	export let data;

	let { supabase } = data
	$: ({ supabase } = data)

	let loading;
	let assignment_data
	$: assignment_data = $page.data.assignment

	let assignment_slug;
	$: assignment_slug = $page.data.assignment_slug

	let assignments;
	$: assignments = $page.data.assignments.assignmentData

	async function handleSubmit(event) {
		loading = true;
		const data = new FormData(this);

		const response = await fetch(this.action, {
			method: 'POST',
			body: data,
			headers: {
				'x-sveltekit-action': 'true',
				'cache-control': 'max-age=3600'
			}
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			// re-run all `load` functions, following the successful update
			await invalidateAll();
		}

		await applyAction(result);
	}

	function handleEditPage() {
		goto($page.url.pathname + '/edit');
	}

	function handlePreviewPage() {
		goto($page.url.pathname + '/preview');
	}

	let assignment;
	$: {
		assignment = assignments.find(
				assignment => assignment.assignment_id == assignment_slug
		)
	}

	// ---------------  QUILL ---------------

	// --------------- Initialize variables ---------------

	// Different modes
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

			uploadQuillDocument(quill.root.innerHTML, $page.params.slug,
					$page.data.session.user.id, supabase, filePath, "assignments");

			await updateAssignmentInsert($page.params.assignment, supabase)

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

	// --------------- END OF QUILL FUNCTIONS  ---------------


	// Setup 2
	async function getDocument() {
		if (browser) {
			// TODO
			const filePath = `${$page.params.slug}/assignments/${$page.params.assignment}/document.HTML?t=${assignment_data.updated_at}`;
			// TODO
			content.html = await downloadQuillDocument(filePath, supabase, 'assignments');
			// TODO
			//localStorage.setItem('homeDocument', JSON.stringify(content))
		}
	}


	// ------------- END OF QUILL ---------------

	onMount(async () => {
		// Setup quill
		if (browser) {
			await setupQuill();
		}
	});
</script>

<!--QUILL-->
<div class="flex flex-col w-2/3 ">
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
			<div class="editor flex-1 w-1/2 bg-gray-600 text-white min-h-8 border rounded-lg p-2"

				 hidden={mode.edit === false ? '' : 'hidden'}>
				{@html content.html}
			</div>
		</div>
	</div>
		</section>
	</div>
<!--END OF QUILL-->

	<div class="mb-4 ">
		<div class="flex flex-row">
		<section class="p-1">
		<div class="w-full">
			<section class="p-1 mt-4">
				<div class="container">

					<button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
				font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
				group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
				focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
					on:click={handleEditPage}>
						<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
						dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
							Edit
						</span>
					</button>

					<button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
        							font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
        							group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
        							focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
							on:click={handlePreviewPage}>
						<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
						dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
							Preview
						</span>
					</button>

					{#if assignment}
					<div class="bg-gray-800 p-6 rounded-lg shadow-md text-white mt-2">





						<!--Edit assignment-->
						<form action="?/updateAssignment" method="POST" >
							<div class="flex flex-wrap gap-4 mb-4 max-w-xl">
								<div>
									<Label class="font-semibold">Title:</Label>
									<Input type="text" class="text-gray-100" id="title" name="title" bind:value={assignment.title}/>
								</div>
								<div>
									<Label class="font-semibold">Points:</Label>
									<Input type="number" class="text-gray-100" id="points" name="points" bind:value={assignment.points}/>
								</div>
								<div>
									<Label class="font-semibold">Due:</Label>
									<Input type="text" class="text-gray-100" id="date" name="due" bind:value={assignment.due}/>
								</div>
								<div>
									<Label class="font-semibold">Category:</Label>
									<Input type="text" class="text-gray-100" id="category" name="category" bind:value={assignment.category}/>
								</div>
								<div>
									<Label class="font-semibold">Available Start:</Label>
									<Input type="text" class="text-gray-100" id="available_start" name="available_start" bind:value={assignment_data.available_start}/>
								</div>
								<div>
									<Label class="font-semibold">Available End:</Label>
									<Input type="text" class="text-gray-100" id="available_end" name="available_end" bind:value={assignment_data.available_end}/>
								</div>
								<div>
									<Label class="font-semibold">Description:</Label>
									<Input type="text" class="text-gray-100" id="description" name="description" bind:value={assignment_data.description}/>
								</div>
								<div>
									<Label class="font-semibold">Display As:</Label>
									<Input type="text" class="text-gray-100" id="display_as" name="display_as" bind:value={assignment_data.display_as}/>
								</div>
								<div>
									<Label class="font-semibold">Submission Attempts:</Label>
									<!--TODO -->
									<Input disabled type="text" class="text-gray-100" id="submission_attempts" name="submission_attempts" bind:value={assignment_data.submission_attempts}/>
								</div>
								<div>
									<Label class="font-semibold">Grade Type:</Label>
									<Input type="text" class="text-gray-100" id="grade_type" name="grade_type" bind:value={assignment_data.grade_type}/>
								</div>
								<div>
									<Label class="font-semibold">Updated At:</Label>
									<Input type="text"  class="text-gray-100" id="updated_at" name="updated_at" bind:value={assignment_data.updated_at}/>
								</div>

								<div>
								<button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
        							font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
        							group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
        							focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
										on:click={handleSubmit}>
								<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
								dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
									Submit
								</span>
								</button>
								</div>
							</div>
						</form>
					</div>
						{/if}
				</div>
			</section>
		</div>

	</section>
		</div>
	</div>
</div>
