<script lang="ts">
	import { blur } from 'svelte/transition';
	import { browser } from '$app/environment';
	import dayjs from 'dayjs';
	import { applyAction, deserialize } from '$app/forms';
	import { goto, invalidateAll } from "$app/navigation";
	import { page } from '$app/stores';
	import { AccordionItem, Accordion } from 'flowbite-svelte'



	export let data;

	let model;
	let loading;
	let show_create_box;

	let show_add_item;
	let add_item_name;
	$: add_item_name;

	let modules;
	$: modules = $page.data.modules;

	let assignments = $page.data.assignmentData;

	function create_module() {
		show_create_box = true;
	}

	function close_create_module() {
		show_create_box = false;
	}

	function add_item(id){
		add_item_name = id;
		console.log(add_item_name)
		show_add_item = true;
	}

	function close_add_item(){
		show_add_item = false;
	}

	function handleAssignment(id) {
		goto('/d/courses/' + data.slug + '/assignments/' + id);
	}

	let left = 600;
	let top = 200;

	function dragMe(node) {
		let moving = false;

		if (browser) {
			// Window scrolling Y changing saves state when close and open.
			top = top + window.scrollY;
			node.style.position = 'absolute';
			node.style.top = `${top}px`;
			node.style.left = `${left}px`;
			node.style.cursor = 'move';
			node.style.userSelect = 'none';

			node.addEventListener('mousedown', () => {
				moving = true;
			});

			window.addEventListener('mousemove', (e) => {
				if (moving) {
					// devicePixelRatio fixes zoomed in browser movement.
					left += e.movementX;
					top += e.movementY;
					node.style.top = `${top}px`;
					node.style.left = `${left}px`;
				}
			});

			window.addEventListener('mouseup', () => {
				moving = false;
			});
		}
	}

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
			close_create_module();
			await invalidateAll();
		}

		await applyAction(result);
	}
	let open_module;
</script>

<div class="flex flex-row ">
	<section class="p-1 ">
		<div class="container ">
			<h4 class="text-xl font-bold text-white -mx-auto my-5">Modules</h4>
			<button
				class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
				on:click={create_module}
			>
				<span
					class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0"
				>
					Create
				</span>
			</button>
			<div class="flex flex-col -mx-20 my-2 pl-14 -mb-6 text-white font-semibold ">
				{#each modules as { module_title, id }, i}
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
									<a on:click|stopPropagation={()=> {add_item(module_title)}}
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
									{#each assignments as {assignment_title, in_module}, i}
										{#if in_module === id}
											<a>
											<div class="py-4 px-5 text-gray-200 hover:text-white hover:scale-[1.002]"on:click={()=> {handleAssignment(assignments[i].id)}}>
												{assignment_title}
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
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Add Module {add_item_name}</h3>
					<button
						type="button"
						on:click={close_create_module}
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
				<form method="POST" action="?/createModule" on:submit|preventDefault={handle_module_submit}>
					<div class="grid gap-4 mb-4 sm:grid-cols-2">
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
								required=""
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
			</div>
		</div>
	</div>
{/if}

{#if show_add_item}
	<!-- Main modal -->
	<div use:dragMe class="z-1000 fixed top-1/2 left-1/2">
		<div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
			<!-- Modal content -->
			<div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-700 sm:p-5">
				<!-- Modal header -->
				<div
					class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
				>
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Add Item to {add_item_name}</h3>
					<button
						type="button"
						on:click={close_add_item}
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
							>
								<option value="">No module</option>
								{#each modules as { module_title, id }, i}
									<option value="{id}" selected={module_title === add_item_name}>{module_title}</option>
								{/each}
							</select>
						</div>


					</div>
					<div>
						<label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an item</label>
						<select multiple name="id" id="id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							{#each assignments as { id, assignment_title, inserted_at}}
								<option value="{id}">{assignment_title} | Created: {new Date(inserted_at).toDateString()}</option>
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
			</div>
		</div>
	</div>
{/if}
