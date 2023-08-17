<script lang="ts">
	import {onMount} from "svelte";
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
	import Fa from 'svelte-fa/src/fa.svelte';
	import {faCheck, faCopy} from "@fortawesome/free-solid-svg-icons";
	import {formatDistanceToNow, parseISO} from "date-fns";


	export let data;
	let { supabase, claim } = data
	$: ({ supabase, claim } = data)

	let searchTerm = '';
	let code = '';
	$: code;

	let peopleModel = false;
	let removeModel = false;

	let people: any[] | undefined;

	$: people = data?.people;

	$: filteredItems = (people ?? []).filter(
			(enrollment_data) =>
					enrollment_data?.first_name?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);

	let delete_people_id;
	let delete_people_name;
	function delete_model_open(id, name) {
		removeModel = true;
		delete_people_id = id;
		delete_people_name = name;
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
		addNotification(newNotification, supabase, $page.data.session.user)
			goto(window.location.pathname)
		}
		if (status === 400) {
		console.log(error, data, status)
		}
		await invalidateAll();
	}

	function copyCode() {
		navigator.clipboard.writeText(code)
				.then(() => {
					console.log('Code copied to clipboard');
				})
				.catch(err => {
					console.error('Unable to copy code to clipboard:', err);
				});
	}

	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('courses');
	});
</script>

<div class="w-full">

	<section class="p-1 mt-4">

		<div class="container">

			{#if claim !== 'student'}

			<button on:click={() => { peopleModel = true; handleGenerateCode() }}
				class="ml-0.5 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
				font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
				group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
				focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800">
				<span
					class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
					dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
					Add
				</span>
			</button>
			{/if}


			<div class="">
				<div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
					<TableSearch placeholder="Search by first name..." hoverable={true} bind:inputValue={searchTerm}>
						<Table shadow hoverable>
							<TableHead>
								<TableHeadCell>Name</TableHeadCell>
								{#if claim !== 'student'}
								<TableHeadCell>Enrolled</TableHeadCell>
									<TableHeadCell>Date Enrolled</TableHeadCell>
									<TableHeadCell>
									<span class="sr-only ">Edit</span>
								</TableHeadCell>
								{/if}
							</TableHead>
							<TableBody class="divide-y">
								{#each filteredItems as {id, enrolled, first_name, last_name, enrollment_date }}

								<TableBodyRow  class="cursor-pointer">
										<TableBodyCell>{first_name} {last_name}</TableBodyCell>
									{#if claim !== 'student'}
										<TableBodyCell>
												<button on:click={() => handleAcceptUser(id)} class="{enrolled ? 'hidden' : 'block'} relative inline-flex items-center justify-center p-0.5
										 	overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400
										 	to-green-600  hover:text-white dark:text-white
											focus:ring-4 focus:outline-none ">
											<span
												class="relative px-2 py-2 transition-all|local ease-in duration-75 bg-white
											dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
											Accept
											</span>
												</button>
											{#if enrolled}
												<Fa icon={faCheck} class="pl-6 text-green-500"/>
											{/if}
										</TableBodyCell>

										<TableBodyCell>
											<div class="text-gray-200 text-xs ">
											{formatDistanceToNow(parseISO(enrollment_date), {addSuffix: true})}
											</div>
										</TableBodyCell>

										<TableBodyCell tdClass="py-4 whitespace-nowrap font-medium">
											{#if id !== $page.data.session.user.id}
											<a class="font-medium
											text-blue-600 hover:underline dark:text-blue-500 px-1">
												Edit
											</a>
											<a on:click|stopPropagation={() => delete_model_open(id, `${first_name} ${last_name}`)} class="font-medium text-blue-600
											hover:underline dark:text-red-500">
												Remove
											</a>
											{/if}
										</TableBodyCell>
									{/if}
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
		<Modal title="Generate Join Code" class="max-w-xs" bind:open={peopleModel}>
			<form method="POST">
				<p  class=" font-semibold text-gray-900 dark:text-white px-2">Distribute this code to join your course, and you'll grant them access.</p>
				<p  class="text-xs py-2 font-semibold text-gray-900 dark:text-gray-200 px-2">Valid for 48 hours.</p>
					<div class="py-4 px-2 inline-block">
						<button type="button" class="px-3 py-3 font-medium text-center text-white
									 bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
									  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" on:click={() => handleGenerateCode()}>Generate</button>
					</div>
					{#if code !== ''}
						<div class=" inline-block px-2">
							<h2 id="code" class="text-2xl font-semibold space-x-2  text-gray-900 dark:text-white py-2 px-2 border rounded tracking-widest">{code}</h2>
						</div>

						<div class="inline-block text-xl text-gray-200 hover:text-blue-500 cursor-pointer" title="Click to copy code" on:click={copyCode}>
							<Fa icon={faCopy} size="xl"/>
						</div>
					{/if}

			</form>
		</Modal>

		<!-- Model for remove people -->
		<Modal title="Remove person" class="max-w-xs" bind:open={removeModel}>
			<p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to unenroll <b>{delete_people_name}</b>? </p>
			<b>All data will be lost, instantly.</b>
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
