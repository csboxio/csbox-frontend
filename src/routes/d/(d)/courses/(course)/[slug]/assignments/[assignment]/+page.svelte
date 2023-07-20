<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import {goto, invalidateAll} from '$app/navigation';
	import {page} from "$app/stores";
	import {Input, Label} from "flowbite-svelte";
	import QuillBlock from "$lib/blocks/quillBlock.svelte";
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

	let assignment;
	$: {
		assignment = assignments.find(
				assignment => assignment.assignment_id == assignment_slug
		)
	}

	async function saveFunction() {
		await updateAssignmentInsert($page.params.assignment, supabase)
	}

	let bucket = "assignments"
	let storePath = `assignment-${$page.params.assignment}-document`
	let filePath
	$: filePath = `${$page.params.slug}/assignments/${$page.params.assignment}/document.HTML?t=${assignment_data.updated_at}`

</script>

<div class="flex flex-col w-2/3 ">

	<QuillBlock bind:supabase={supabase} bind:storePath={storePath}
				bind:filePath={filePath} bind:bucket={bucket}
				saveFunction={saveFunction} />

	<div class="mb-4 ">
		<div class="flex flex-row">
		<section class="p-1">
		<div class="w-full">
			<section class="p-1 mt-4">
				<div class="container">
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
