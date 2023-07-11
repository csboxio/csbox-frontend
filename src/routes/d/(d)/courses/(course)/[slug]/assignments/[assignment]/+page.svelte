<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import {goto, invalidateAll} from '$app/navigation';
	import {page} from "$app/stores";
	import {Label} from "flowbite-svelte";
	import {onMount} from "svelte";
	import {assign} from "quill-delta-to-html/dist/commonjs/helpers/object.js";
	export let data;
	let loading;
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

	function handleBuild() {
		goto($page.url.pathname + '/build');
	}

	function handlePreview() {
		goto($page.url.pathname + '/preview');
	}

	let assignment;
	onMount(() => {

		$: {
			assignment = assignments.find(
					assignment => assignment.assignment_id == assignment_slug
			)
		}

		console.log(assignment, assignment_data)

	});

</script>

<div class="flex flex-row">
	<section class="p-1">
		<div class="w-full">
			<section class="p-1 mt-4">
				<div class="container">

					<button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
				font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
				group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
				focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
					on:click={handleBuild}>
						<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
						dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
							Build
						</span>
					</button>

					<button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
        							font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
        							group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
        							focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
							on:click={handlePreview}>
						<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
						dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
							Preview
						</span>
					</button>

					{#if assignment}
					<div class="bg-gray-800 p-6 rounded-lg shadow-md text-white mt-2">
						<h2 class="text-2xl font-bold mb-4">Assignment Information</h2>
						<form action="?/updateAssignment" method="POST" >
							<div class="grid grid-cols-2 gap-4 mb-4">
								<div>
									<Label class="font-semibold">Title:</Label>
									<div class="text-gray-100" id="title" name="title">{assignment.title}</div>
								</div>
								<div>
									<Label class="font-semibold">Category:</Label>
									<div class="text-gray-100" id="attempts" name="attempts">{assignment.category}</div>
								</div>
								<div>
									<Label class="font-semibold">Due:</Label>
									<div class="text-gray-100" id="date" name="due">{new Date(assignment.due)}</div>
								</div>
								<div>
									<Label class="font-semibold">Available From:</Label>
									<!--TODO RENAME-->
									<div class="text-gray-100" id="availableFrom" name="availableFrom">{new Date(assignment_data.available_start)}</div>
								</div>
								<div>
									<Label class="font-semibold">Available To:</Label>
									<!--TODO RENAME-->
									<div class="text-gray-100" id="availableTo" name="availableTo">{new Date(assignment_data.available_end)}</div>
								</div>
								<div>
									<Label class="font-semibold">Points:</Label>
									<div class="text-gray-100" id="points" name="points">{assignment.points}</div>
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
