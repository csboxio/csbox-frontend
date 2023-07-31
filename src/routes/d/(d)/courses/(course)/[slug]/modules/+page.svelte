<script lang="ts">
	import { blur } from 'svelte/transition';
	import { applyAction, deserialize } from '$app/forms';
	import { goto, invalidateAll } from "$app/navigation";
	import { page } from '$app/stores';
	import { AccordionItem, Accordion, Modal } from "flowbite-svelte";
	import {onMount} from "svelte";
	import {navStore} from "../../../../../../../lib/stores/stores.js";
	import Fa from 'svelte-fa/src/fa.svelte';
	import {faCircleCheck, faFlag, faPencil} from "@fortawesome/free-solid-svg-icons";

	export let data;


	let { supabase, claim } = data
	$: ({ supabase, claim } = data)

	let loading;
	let show_create_box;
	let addModuleModel = false;
	let addAssignmentModel = false;
	let show_add_item;
	let item_id;
	let modules;
	let assignments;
	let quizzes;
	let selectedTypeAddItem;


	//TODO WHEN MOVING ITEMS IT SHOULD NOT CLOSE THAT ONES THAT ARE OPEN

	$: item_id;
	$: modules = $page.data.modules
	$: assignments = $page.data.assignments
	$: quizzes = $page.data.quizzes

	function create_module() {
		close_add_item();
		show_create_box = true;
	}

	function close_create_module() {
		show_create_box = false;
	}

	function add_item(id){
		addAssignmentModel = true
		item_id = id;
	}

	function close_add_item(){
		show_add_item = false;
	}

	function handleAssignment(id) {
		goto('/d/courses/' + data.slug + '/assignments/' + id);
	}

	let left = 600;
	let top = 200;

	async function handle_module_submit(event) {
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
			addModuleModel = false;
			addAssignmentModel = false;
			await invalidateAll();
		}
		console.log(result)
		await applyAction(result);
	}

	const items = Array(3);

	const open_all = () => items.forEach((_,i)=> items[i] = true)
	const close_all= () => items.forEach((_,i)=> items[i] = false)

	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('courses');
	});
</script>

<div class="w-full">
	<section class="p-1 mt-4">
		<div class="container">

			{#if claim !== 'student'}

			<button on:click={() => addModuleModel = true}
				class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800">
				<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
					Create
				</span>
			</button>
			{/if}

			<button on:click={open_all} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300
			font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
				Open All
			</button>
			<button on:click={close_all} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300
			font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
				Close All
			</button>

			<div class="flex flex-col -mx-20 my-2 pl-14 -mb-6 text-white font-semibold mr-1">


				{#key modules}
					<Accordion multiple>
				{#each modules as { module_title, id, assignments }, i}
					<div transition:blur|local={{ duration: 200 }} class="mb-1 mx-6 cursor-pointer">
						<!--Module-->
						<div id="accordion-collapse" data-accordion="collapse">
						<AccordionItem class="bg-gray-700 border-gray-100" bind:open={items[i]}>

									<span slot="header" class="text-white text-lg">
										{module_title}
									</span>

									<!-- Plus symbol to the right of the module title -->
									{#if claim !== 'student'}
										<div class="justify-between">
									<a on:click|stopPropagation={() => {add_item(module_title)}}
										 class="text-gray-200 pb-4 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
										<span class="ml-auto">
											<svg
													class=" -ml-1 w-6 h-6"
													fill="currentColor"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg">
												<path
														fill-rule="evenodd"
														d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
														clip-rule="evenodd"
												/>
											</svg>
										</span> Item
									</a>

										<div class="justify-between inline-block">
									<a on:click|stopPropagation={() => {add_item(module_title)}}
										   class="text-gray-200 pb-4 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white ml-2">
											<span class="ml-auto mt-2">
												<svg
													class="-ml-1 w-6 h-6"
													fill="currentColor"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg">
													<svg xmlns="http://www.w3.org/2000/svg" height="0.8em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>
											</svg>
										</span> Settings
									</a>
										</div>
										</div>
									{/if}
									<!-- End of plus symbol -->

									<!-- assignments -->
									{#each assignments as {title, in_module}, i}
										{#if in_module === id}
											<a>
											<div class="py-4 px-4 text-lg text-gray-200 hover:text-white hover:bg-gray-500 text-white border-t"
												 on:click={()=> {handleAssignment(assignments[i].assignment_id)}}>
												<Fa class="inline-block pr-4" icon={faPencil}/>
												{title === '' ? 'Assignment Error..' : title}
											</div>
											</a>
											{/if}
									{/each}

									<!-- quizzes -->
									{#each quizzes as {quiz_title, in_module}, i}
										{#if in_module === id}
											<a>
												<div class="py-4 px-4 text-lg text-gray-200 hover:text-white hover:bg-gray-500 text-white border-t">
													<Fa class="inline-block pr-4" icon={faCircleCheck}/>
													{quiz_title === '' ? 'Quizzes Error..' : quiz_title}
												</div>
											</a>
										{/if}
									{/each}
							{#if assignments && quizzes}
								{#if assignments.length === 0}
									Nothing here
								{/if}
							{/if}
								</AccordionItem>

						</div>
						</div>
						<!--End of module-->
				{/each}
					</Accordion>
					{/key}
				{#if modules?.length === 0}
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
							<span class="font-medium">No modules found...</span>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</section>
</div>

<Modal title="Add module" class="max-w-xs" bind:open={addModuleModel}>
		<!-- Modal body -->
		<form method="POST" action="?/createModule" on:submit|preventDefault={handle_module_submit}>
			<div class="grid gap-4 mb-4 sm:grid-cols-1">
				<div>
					<label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Module Name</label
					>
					<input
						type="text"
						name="name"
						id="name"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						placeholder="Module Name"
						required
					/>
				</div>
			</div>
			<button
				type="submit"
				class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
			>
				<svg
					class="mr-1 -ml-1 w-6 h-6"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
						clip-rule="evenodd"
					/>
				</svg>
				Add new module
			</button>
		</form>
</Modal>

<!-- Add assignment to module -->
<Modal title="Add item to module" class="max-w-xs" bind:open={addAssignmentModel}>
	<form method="POST" action="?/addItemToModule" on:submit|preventDefault={handle_module_submit}>
		<div class="grid gap-4 mb-4 sm:grid-cols-2">

			<div>
				<label
					for="modules"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Module</label
				>
				<select
					name="modules"
					id="modules"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
					required
				>
					{#each modules as { module_title, id }, i}
						<option value="{id}" selected={id === add_item}>{module_title}</option>
					{/each}
				</select>
			</div>

			<div>
				<label
						for="type"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Type</label
				>
				<select bind:value={selectedTypeAddItem}
						name="type"
						id="type"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						required>
						<option value="assignment">Assignment</option>
						<option value="quiz">Quiz</option>

				</select>
			</div>


		</div>
		<div>
			{#if selectedTypeAddItem === "assignment"}
			<label for="assignment_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an assignment</label>
			<select multiple name="assignment_id" id="assignment_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
				{#each assignments as {assignment_id, title, due}}
					<option value="{assignment_id}">{title} | Due - {new Date(due).toDateString()}</option>
				{/each}
			</select>
				{/if}
			{#if selectedTypeAddItem === "quiz"}

			<label for="quiz_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a quiz</label>
			<select multiple name="quiz_id" id="quiz_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
				{#each quizzes as {id, quiz_title, due}}
					<option value="{id}">{quiz_title} | Due - {new Date(due).toDateString()}</option>
				{/each}
			</select>
				{/if}
		</div>
		<button
			type="submit"
			class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
		>
			<svg
				class="mr-1 -ml-1 w-6 h-6"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
					clip-rule="evenodd"
				/>
			</svg>
			Add new item
		</button>
	</form>
</Modal>


