<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { goto, invalidate, invalidateAll } from "$app/navigation";
	import { browser } from '$app/environment';
	import { Datepicker } from 'svelte-calendar';
	import { dragMe } from '$lib/utilities/dragMe.ts'

	import {
		Button, Modal,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from "flowbite-svelte";

	import dayjs from 'dayjs';
	import { page } from "$app/stores";
	import { theme } from "$lib/dates/theme.js";
	import { addNotification } from "../../../../../../../lib/utilities/notifications.js";
	import {onMount} from "svelte";
	import {navStore} from "../../../../../../../lib/stores/stores.js";

	export let data;
	export let show_create_box;
	export let dueDate;
	export let availablefromDate;
	export let availableuntilDate;

	// Page Data
	//let course_data = $page.data.courses.courseData;
	let modules;
	$: modules = data.modules;

	// Outside click div.
	let model;

	let loading;
	let assignments;
	$: assignments = data.assignments.assignmentData;

	let open = false;
	let delete_assignment;
	let delete_assignment_id;

	// TODO Dates
	let storeDueDate;
	let storeAvailableDate;
	let storeAvailableUntilDate;

	// For search box on assignments
	let searchTerm = '';
	$: filteredItems = assignments.filter(
		(assignments) => assignments.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);


	// For assignment delete
	let deleteModel = false;

	// Draggable box
	function show_box() {
		show_create_box = true;
	}

	// Draggable box
	function close_box() {
		show_create_box = false;
	}
	let { supabase } = data
	$: ({ supabase } = data)

	async function handleSubmit(event) {

		if (browser) {
			dueDate = dayjs(storeDueDate?.selected);
			availablefromDate = dayjs(storeAvailableDate?.selected);
			availableuntilDate = dayjs(storeAvailableUntilDate?.selected);
		}
		loading = true;

		const data = new FormData(this);
		console.log(data)
		data.append('due', dueDate);
		data.append('availfrom', availablefromDate);
		data.append('availto', availableuntilDate);

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
			const newNotification =
				{
					title: "Success! 🥳",
					message: `Created Assignment: ${data.get('name')}`
				};

			addNotification(newNotification, supabase, $page.data.session.user)

		}
		else {
			const newNotification =
				{
					title: "Failed! 😞",
					message: `Error: Type: ${result.type} Status: ${result.status}}`
				};

			addNotification(newNotification, supabase, $page.data.session.user)
		}
		close_box();
		await invalidateAll();
		await applyAction(result);
	}

	let hoverID;
	$: hoverID;

	function delete_model_open(id) {
		delete_assignment_id = id;
		deleteModel = true;
	}

	function delete_model_close() {
		deleteModel = false;
	}


	async function handleDeleteAssignment(aid) {
		const { error, status } = await $page.data.supabase.from('assignments').delete().match({ assignment_id: aid });
		console.log(status)
		if (status === 204) {
			const newNotification =
				{
					title: "Success! 🥳",
					message: `Deleted Assignment!`
				};
			addNotification(newNotification, supabase, $page.data.session.user)
			delete_model_close();
			await invalidateAll();
		}
	}

	function hover(h) {
		hoverID = h;
	}

	function handleAssignment(id) {
		goto('/d/courses/' + data.slug + '/assignments/' + id);
	}

	// For drag me
	let left = 600;
	let top = 200;

	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('courses');
	});
</script>


<div class="w-full">

	<section class="p-1 mt-4">

		<div class="container">

			<button
				class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
				font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
				group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
				focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
				on:click={show_box}>
				<span
					class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
					dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
					Create
				</span>
			</button>

			<div>
			<div class="relative overflow-x-auto  sm:rounded-lg w-full">
				<TableSearch placeholder="Search by title..." hoverable={true} bind:inputValue={searchTerm}>
				<Table hoverable>
				<TableHead>
					<TableHeadCell>Title</TableHeadCell>
					<TableHeadCell>Category</TableHeadCell>
					<TableHeadCell>Due</TableHeadCell>
					<TableHeadCell>Points</TableHeadCell>
					<TableHeadCell>
						<span class="sr-only ">Edit</span>
					</TableHeadCell>
				</TableHead>
				<TableBody class="divide-y">
					{#key assignments}
				{#each filteredItems as { assignment_id, title, category, due, points }, i}
						<TableBodyRow on:click={() =>  handleAssignment(assignment_id)} class="cursor-pointer">
							<TableBodyCell >{title ? title : 'No title'}</TableBodyCell>
							<TableBodyCell >{category ? category : "No category" }</TableBodyCell>
							<TableBodyCell >{due ? due.substring(0, 10) : "No date" }</TableBodyCell>
							<TableBodyCell >{points ? points : "No Points" }</TableBodyCell>

							<TableBodyCell tdClass="py-4 whitespace-nowrap font-medium"  >
								<a on:click|stopPropagation={() => goto($page.url.pathname + "/" + assignment_id + "/edit")} class="font-medium
								text-blue-600 hover:underline dark:text-blue-500">
									Edit
								</a>
								<a on:click|stopPropagation={() => delete_model_open(assignment_id)} class="font-medium text-blue-600
								hover:underline dark:text-red-500 ">
									Delete
								</a>
							</TableBodyCell>
						</TableBodyRow>
				{/each}
						{/key}
				</TableBody>
			</Table>
				</TableSearch>

				<!--No courses found-->
				{#if assignments?.length === 0}
					<div
						class="flex p-4 mb-6 mt-4 ml-6 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50
						dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
						role="alert"
					>
						<svg
							aria-hidden="true"
							class="flex-shrink-0 inline w-5 h-5 mr-3"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1
								 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clip-rule="evenodd"
							/>
						</svg>
						<span class="sr-only">Info</span>
						<div>
							<span class="font-medium">No assignments found...</span>
						</div>
					</div>
				{/if}
			</div>
			</div>
		</div>
	</section>
</div>

{#if show_create_box}
	<!-- Main modal -->
	<div use:dragMe class="z-1000 fixed top-1/2 left-1/2">
		<div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
			<!-- Modal content -->
			<div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-700 sm:p-5">
				<!-- Modal header -->
				<div
					class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
				>
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Add Assignment</h3>
					<button
						type="button"
						on:click={close_box}
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto
						 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
						data-modal-toggle="defaultModal"
					>
						<svg
							aria-hidden="true"
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0
								 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
						<span class="sr-only">Close modal</span>
					</button>
				</div>
				<!-- Modal body -->
				<form method="POST" action="?/createAssignment" on:submit|preventDefault={handleSubmit}>
					<div class="grid gap-4 mb-4 sm:grid-cols-2">
						<div>
							<label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								Assignment Name
							</label>
							<input
								type="text"
								name="name"
								id="name"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
								 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
								  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder="Assignment Name"
								required
							/>
						</div>

						<div class="sm:col-span-2">
							<label
								for="description"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>Description</label
							>
							<textarea
								name="description"
								id="description"
								rows="4"
								class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
								 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600
								  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder="Summarize assignment description"
								required></textarea>
						</div>

						<div>
							<label
								for="points"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Points</label
							>
							<input
								type="text"
								name="points"
								id="points"
								value="0"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
								 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
								  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder=""
								required=""
							/>
						</div>

						<div>
							<label
								for="category"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label
							>
							<select
								name="category"
								id="category"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500
								 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
								 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								required
							>
								<option selected="">Select category</option>
								<option value="Assignment">Assignment</option>
								<option value="Quiz">Quiz</option>
								<option value="Project">Project</option>
							</select>
						</div>

						<div>
							<label
								for="displayas"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>Display Grade As</label
							>
							<select
								name="displayas"
								id="displayas"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500
								 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
								  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
							>
								<option value="Points">Points</option>
								<option value="Percentage">Percentage</option>
							</select>
						</div>

						<div>
							<label
								for="submissiontype"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>Submission Type</label
							>
							<select
								name="submissiontype"
								id="submissiontype"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500
								 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
								  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
							>
								<option value="Points">Online</option>
								<option value="Percentage">Physical</option>
							</select>
						</div>

						<div>
							<label
								for="modules"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Module</label
							>
							<select
								name="modules"
								id="modules"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500
								focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
								 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
							>
								<option value="">No module</option>
								{#if modules !== undefined}
								{#each modules as { module_title, id }, i}
								<option value="{id}">{module_title}</option>
								{/each}
								{/if}
							</select>
						</div>

						<div>
							<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
								>Due</label
							>
							<Datepicker {theme} bind:storeDueDate class="w-full" />
						</div>

						<!--<div>
              <label for="assignto" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assign To</label>
              <select name="assignto" id="assignto"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full rounded-lg
                       focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
                         dark:focus:border-primary-500">
                <option value="Everyone">Student</option>
                <option value="Everyone">Everyone</option>
                <option value="Empty">Empty</option>
              </select>
            </div>-->

						<!--<div>
							<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
								>Available from</label
							>
							<Datepicker {theme} bind:storeAvailableDate class="w-full" />
						</div>

						<div>
							<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
								>Available Until</label
							>
							<Datepicker {theme} bind:storeAvailableUntilDate class="w-full" />
						</div>
					-->
					</div>
					<button
							type="submit"
							class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
							font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
							group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
							focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800">
						<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
							dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
							Create
						</span>
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}

<!-- Model for removing assignment -->
<Modal title="Remove assignment" class="max-w-xs" bind:open={deleteModel}>
	<p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
	<div class="flex justify-center items-center space-x-4">
		<button on:click={() => deleteModel = false} data-modal-toggle="deleteModal" type="button" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
			No, cancel
		</button>
		<button on:click={() => handleDeleteAssignment(delete_assignment_id)} type="submit" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
			Yes, I'm sure
		</button>
	</div>
</Modal>
