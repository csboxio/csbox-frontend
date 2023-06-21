<script lang="ts">
	import {onMount} from "svelte";

	let model;
	export let data;

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
	import { page } from "$app/stores";
	import { goto, invalidateAll } from "$app/navigation";
	import { addNotification } from "../../../../../../../lib/utilities/notifications.js";
	import {navStore} from "../../../../../../../lib/stores/stores.js";
	let searchTerm = '';
	let code = '';
	$: code;

	let peopleModel = false;
	let removeModel = false;

	let people;
	$: people = data.people

	$: filteredItems = people.filter(
			(enrollment_data) => enrollment_data.users.first_name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);

	let delete_people_id;
	function delete_model_open(id) {
		removeModel = true;
		delete_people_id = id;
	}

	function delete_model_close() {
		removeModel = false
	}

	export let show_create_box;

	function show_box() {
		show_create_box = true;
	}

	function close_box() {
		show_create_box = false;
	}
	async function handleGenerateCode() {
		const url = new URL('/api/people/code/', window.location.origin);
		url.searchParams.append('course', data.slug);
		const response = await fetch(url);
		const { res, error, status } = await response.json();
		code = res;
	}

	async function handleDeletePeople(_user_id) {
		const url = new URL('/api/people/delete/', window.location.origin);
		url.searchParams.append('course', data.slug);
		url.searchParams.append('user', _user_id);
		const response = await fetch(url);
		const { res, error, status } = await response.json();
		if (status === 200) {
			delete_model_close();
			await invalidateAll();
		}
		if (status === 400) {
			delete_model_close();
			alert("Cannot remove yourself.");
		}
		await invalidateAll();

	}

	async function handleAcceptUser(_user_id) {
		const url = new URL('/api/people/accept/', window.location.origin);
		url.searchParams.append('course', data.slug);
		url.searchParams.append('user', _user_id);
		const response = await fetch(url);
		const { res, error, status } = await response.json();
		console.log(res, error, status);
		if (status === 200) {
			const newNotification =
				{
					title: "Success! 👏",
					message: "New person enrolled."
				};
		addNotification(newNotification)
			goto(window.location.pathname)
		}
		if (status === 400) {
		console.log(error, data, status)
		}
		await invalidateAll();
	}

	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('courses');
	});
</script>

<div class="w-full">

	<section class="p-1">

		<div class="container">

			<h4 class="text-xl font-bold text-white -mx-auto my-5">People</h4>
			<button on:click={() => peopleModel = true}
				class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
				font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
				group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
				focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800">
				<span
					class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
					dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
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
										<TableBodyCell>
												<button on:click={() => handleAcceptUser(user_id)} class="{enrolled ? 'hidden' : 'block'} relative inline-flex items-center justify-center p-0.5 mb-1
										 	mr-1 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400
										 	to-green-600  hover:text-white dark:text-white
											focus:ring-4 focus:outline-none ">
											<span
												class="relative px-3 py-2.5 transition-all|local ease-in duration-75 bg-white
											dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
											Accept
											</span>
												</button>
											{#if enrolled}
												TRUE
											{/if}
										</TableBodyCell>
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

		<!-- Model for add people -->
		<Modal title="Add People" bind:open={peopleModel}>
			<form method="POST">
				<div class="grid gap-4 mb-6 px-6 sm:grid-cols-1">

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

					<div class="sm:col-span-2">
						<button type="button" class="px-3 py-2 text-sm font-medium text-center text-white
									 bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
									  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" on:click={() => handleGenerateCode()}>Generate Code</button>
					</div>
					{#if code !== ''}
						<div class="sm:col-span-2">
							<label
								for="code"
								class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Code</label
							>
							<h2 id="code" class="text-xl font-semibold text-gray-900 dark:text-white px-2.5">{code}</h2>

						</div>
					{/if}
				</div>
			</form>
		</Modal>

		<!-- Model for remove people -->
		<Modal title="Remove person" bind:open={removeModel}>
			<p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
			<div class="flex justify-center items-center space-x-4">
				<button on:click={() => removeModel = false} data-modal-toggle="deleteModal" type="button" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
					No, cancel
				</button>
				<button on:click={() => handleDeletePeople(delete_people_id)} type="submit" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
					Yes, I'm sure
				</button>
			</div>
		</Modal>
	</div>
</div>
