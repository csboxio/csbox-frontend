<script lang="ts">
	import { supabaseClient } from "../../../../../../lib/utilities/supabaseClient.js";

	let model;
	export let data;
	import { dragMe } from '$lib/utilities/dragMe.ts'

	let course_data = data.courseData;
	let enrollment_data = data.enrollmentData
	import {
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from "flowbite-svelte";
	import { page } from "$app/stores";
	import { invalidateAll } from "$app/navigation";
	let searchTerm = '';
	let code = '';
	$: code;

	$: filteredItems = enrollment_data.filter(
			(enrollment_data) => enrollment_data.users.first_name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);

	let delete_people_id;
	let delete_people;
	function delete_model_open(id) {
		delete_people_id = id;
		delete_people = true;
	}

	function delete_model_close() {
		delete_people = false;
	}

	export let show_create_box;

	function show_box() {
		show_create_box = true;
	}

	function close_box() {
		show_create_box = false;
	}
	async function handleGenerateCode() {
		const { error, data, status } = await supabaseClient.rpc('new_enroll_code', {course_id: $page.data.slug, created_by: $page.data.session?.user.id})
		console.log(error, data, status)
		if (status === 200) {
			code = data;
		}
	}

	async function handleDeletePeople(pid) {
		const { error, data, status } = await supabaseClient.rpc('unenroll_user',
				{_sender_id: $page.data.session?.user.id, _user_id: pid, _course_id: $page.params.slug})
		console.log(error, data, status)
		if (status === 200) {
			delete_model_close();
			await invalidateAll();
		}
		if (status === 400) {
			delete_model_close();
			alert("Cannot remove yourself.")
		}
	}


</script>

<div class="w-full">

	<section class="p-1">

		<div class="container">

			<h4 class="text-xl font-bold text-white -mx-auto my-5">People</h4>
			<button
				class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
				font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
				group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
				focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800">
				<span
					class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
					dark:bg-gray-600 rounded-md group-hover:bg-opacity-0" on:click={show_box}>
					Add
				</span>
			</button>

			<div class="py-4">
				<div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
					<TableSearch placeholder="Search by first name..." hoverable={true} bind:inputValue={searchTerm}>
						<Table shadow hoverable>
							<TableHead>
								<TableHeadCell>Name</TableHeadCell>
								<TableHeadCell>Enrolled</TableHeadCell>
								<TableHeadCell>Date Enrolled</TableHeadCell>
								<TableHeadCell>
									<span class="sr-only ">Edit</span>
								</TableHeadCell>
							</TableHead>
							<TableBody class="divide-y">
								{#each filteredItems as {user_id, enrolled, enrollment_date, users }}

								<TableBodyRow  class="cursor-pointer">
										<TableBodyCell>{users.first_name} {users.last_name}</TableBodyCell>
										<TableBodyCell>{enrolled}</TableBodyCell>
										<TableBodyCell>{enrollment_date.substring(0, 10)}</TableBodyCell>
										<TableBodyCell tdClass="py-4 whitespace-nowrap font-medium">
											<a class="font-medium
								text-blue-600 hover:underline dark:text-blue-500 px-1">
												Edit
											</a>
											<a on:click|stopPropagation={() => delete_model_open(user_id)} class="font-medium text-blue-600
								hover:underline dark:text-red-500">
												Remove
											</a>
										</TableBodyCell>
									</TableBodyRow>
									{/each}
							</TableBody>
						</Table>
					</TableSearch>
				</div>
			</div>
		</div>
	</section>
	<div>
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
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Add People</h3>
							<button
								type="button"
								on:click={close_box}
								class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
								<span class="sr-only">Close modal</span>
							</button>
						</div>
						<!-- Modal body -->
						<form method="POST">
							<div class="grid gap-4 mb-4 sm:grid-cols-2">

								<!-- TODO TYPE
								<div>
									<label
										for="type"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label
									>
									<select
										name="type"
										id="type"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										required
									>
										<option selected="">Select type</option>
										<option value="Basic">Student</option>
										<option value="Basic">Teacher</option>
										<option value="Basic">TA</option>
									</select>
								</div>
								-->

								<div class="sm:col-span-2">
									<button type="button" class="px-3 py-2 text-sm font-medium text-center text-white
									 bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
									  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" on:click={() => handleGenerateCode()}>Generate Code</button>

								</div>

								{#if code !== ''}
								<div class="sm:col-span-2">
									<label
										for="code"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code</label
									>
									<h2 id="code" class="text-lg font-semibold text-gray-900 dark:text-white px-2.5">{code}</h2>

								</div>
								{/if}
							</div>
						</form>
					</div>
				</div>
			</div>
		{/if}

		<!-- Delete people -->
		{#if delete_people}
			<div class="fixed z-20 inset-x-0 max-w-max mx-auto">
				<div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
					<div class="relative p-9 text-center bg-white rounded-lg shadow dark:bg-gray-700 sm:p-5">

						<button on:click={() => delete_people = false} type="button" class="text-gray-400 absolute top-2.5
						 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex
						  items-center dark:hover:bg-gray-700 dark:hover:text-white" data-modal-toggle="deleteModal">
							<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
								 xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414
									  0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10
									   11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd">
							</path>
							</svg>
							<span class="sr-only">Close modal</span>
						</button>

						<svg class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
						<p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
						<div class="flex justify-center items-center space-x-4">
							<button on:click={() => delete_people = false} data-modal-toggle="deleteModal" type="button" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
								No, cancel
							</button>
							<button on:click={() => handleDeletePeople(delete_people_id)} type="submit" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
								Yes, I'm sure
							</button>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
