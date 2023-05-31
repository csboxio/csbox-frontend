<script lang="ts">
	import { blur } from 'svelte/transition';
	import { browser } from '$app/environment';
	import dayjs from 'dayjs';
	import { applyAction, deserialize } from '$app/forms';
	import { goto, invalidateAll } from "$app/navigation";
	import { page } from '$app/stores';
	import { AccordionItem, Accordion, Modal } from "flowbite-svelte";



	export let data;

	let model;
	let loading;
	let show_create_box;

	let addModuleModel = false;
	let addAssignmentModel = false;

	let show_add_item;
	let add_item_name;
	$: add_item_name;

	let modules;
	$: modules = $page.data.modules
	//console.log(modules)

	let assignments;
	$: assignmentData = $page.data.assignmentData

	function create_module() {
		close_add_item();
		show_create_box = true;
	}

	function close_create_module() {
		show_create_box = false;
	}

	function add_item(id){
		addAssignmentModel = true
		add_item_name = id;
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
			// re-run all `load` functions, following the successful update
			addModuleModel = false;
			addAssignmentModel = false;
			await invalidateAll();
		}

		await applyAction(result);
	}
	let open_module;
</script>

<div class="w-full">
	<section class="p-1 ">
		<div class="container">
			<h4 class="text-xl font-bold text-white -mx-auto my-5">Modules</h4>
			<button on:click={() => addModuleModel = true}
				class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
			>
				<span
					class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0"
				>
					Create
				</span>
			</button>
			<div class="flex flex-col -mx-20 my-2 pl-14 -mb-6 text-white font-semibold ">

				{#each modules as { module_title, id, assignments }, i}
					<div transition:blur|local={{ duration: 200 }} class="mb-6 mx-6 cursor-pointer">
						<!--Module-->
						<Accordion
							activeClasses="bg-gray-400 dark:bg-gray-800 text-blue-600 dark:text-white focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800"
							inactiveClasses="text-gray-200 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500 bg-gray-700 dark:text-white">


								<AccordionItem inactiveClasses="">
									<span slot="header">
										{module_title}
									</span>
									<!-- Plus symbol to the right of the module title -->
									<a on:click|stopPropagation={() => {add_item(module_title)}}
										 class="text-gray-200 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
									>
										Add
										<span class="ml-auto">
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
										</span>
									</a>
									<!-- End of plus symbol -->
									{#each assignments as {title, in_module}, i}
										{#if in_module === id}
											<a>
											<div class="py-4 px-2 text-gray-200 hover:text-white hover:scale-[1.002]"on:click={()=> {handleAssignment(assignments[i].assignment_id)}}>
												{title === '' ? 'Assignment Error..' : title}
											</div>
											</a>
											{/if}
									{/each}
								</AccordionItem>

						</Accordion>
						</div>
						<!--End of module-->
				{/each}
			</div>
		</div>
	</section>
</div>

<Modal title="Add module" bind:open={addModuleModel}>
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
<Modal title="Add assignment to module" bind:open={addAssignmentModel}>
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
						<option value="{id}" selected={module_title === add_item_name}>{module_title}</option>
					{/each}
				</select>
			</div>


		</div>
		<div>
			<label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an item</label>
			<select multiple name="id" id="id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
				{#each assignmentData as {id, assignment_title, inserted_at}}
					<option value="{id}">{assignment_title} | Created - {new Date(inserted_at).toDateString()}</option>
				{/each}
			</select>
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


