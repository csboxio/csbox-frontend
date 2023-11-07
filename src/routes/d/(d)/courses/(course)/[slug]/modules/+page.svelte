<script lang="ts">
	import { blur } from 'svelte/transition';
	import { applyAction, deserialize } from '$app/forms';
	import { goto, invalidateAll } from "$app/navigation";
	import { page } from '$app/stores';
	import { AccordionItem, Accordion, Modal } from "flowbite-svelte";
	import {onMount} from "svelte";
	import {navStore} from "../../../../../../../lib/stores/stores.js";
	import {
		faAdd,
		faCircleCheck, faClipboardQuestion, faFileCircleQuestion,
		faFlag,
		faGear,
		faPencil,
		faQuestionCircle,
		faRocket
	} from "@fortawesome/free-solid-svg-icons";
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
	import ModuleAccordionBody from "$lib/components/Course/modules/ModuleAccordionBody.svelte";
	import ModuleAccordion from "$lib/components/Course/modules/ModuleAccordion.svelte";
	import {format, parseISO} from "date-fns";
	import ModuleAccordionRow from "$lib/components/Course/modules/ModuleAccordionRow.svelte";
	import AssignmentAccordionRow from "$lib/components/Course/assignments/AssignmentAccordionRow.svelte";
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
	$: assignments = []
	$: quizzes = []

	function create_module() {
		close_add_item();
		show_create_box = true;
	}

	function close_create_module() {
		show_create_box = false;
	}

	async function add_item_to_module(id){
		const _assignments = async () => {
			const response =  await fetch(`/api/assignments/?course=${$page.params.slug}`)
			return response.json()
		}

		const _quizzes = async () => {
			const response = await fetch(`/api/quizzes/?course=${$page.params.slug}`)
			return response.json()
		}
		addAssignmentModel = true
		item_id = id;
		assignments = await _assignments()
		quizzes = await _quizzes()
	}

	function close_add_item(){
		show_add_item = false;
	}

	function handleAssignment(id) {
		goto('/d/courses/' + data.slug + '/assignments/' + id);
	}

	function handleQuiz(id) {
		goto('/d/courses/' + data.slug + '/quizzes/' + id);
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

	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('courses');
	});

	export let active = null;

</script>

<div class="w-full">
	<section class="pl-1 pt-1 mt-4">
		<div class="">

			{#if claim !== 'student'}

			<button on:click={() => addModuleModel = true}
				class="ml-0.5 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800">
				<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
					Create
				</span>
			</button>
			{/if}

			<div class="flex flex-col -mx-20 my-2 pl-14 -mb-6 text-white font-semibold mr-0.5 ">
				{#key modules}
					<ModuleAccordionBody bind:active>
				{#each modules as { module_title, module_id, assignments, quizzes, module_published }, i }
					<div transition:blur|local={{ duration: 200 }} class="mb-1 mx-6 cursor-pointer">
						<!--Module-->
						<div id="accordion-collapse" data-accordion="collapse">
							<ModuleAccordion id={i} module_id={module_id}
											 title={module_title}
											 published={module_published}
											 addAssignmentModel={addAssignmentModel}
											 item_id={module_id}
											 claim={claim}
											 on:addItem={add_item_to_module}>
									<!-- assignments -->

								  {#each assignments as assignment (assignment.assignment_id)}
										<AssignmentAccordionRow
												assignment_id={assignment.assignment_id}
												slug={data.slug}
												title={assignment.title}
												due={assignment.due}
												points={assignment.points}
												claim={claim}
												published={assignment.published}
												displayas={assignment.display_as}
												assignmentDueDate={assignment.due}
												assignmentStartDate={assignment.available_start}
												assignmentEndDate={assignment.available_end}
												module_id={assignment.in_module}
												modules={modules}
										></AssignmentAccordionRow>
									{/each}

									<!-- quizzes -->

								{#if false}
								{#each quizzes as {id, title, in_module, due, points, published}, i}
									<ModuleAccordionRow
											id={id}
											slug={data.slug}
											title={title}
											due={due}
											points={points}
											claim={claim}
											published={published}
											type="quiz"
									></ModuleAccordionRow>
								{/each}
								{/if}

								{#if assignments && quizzes}
									{#if assignments.length === 0 && quizzes.length === 0}
										<div class="py-2 px-6 pb-4">Nothing here...</div>
									{/if}
								{/if}

							</ModuleAccordion>

						</div>
						</div>
						<!--End of module-->
				{/each}
					</ModuleAccordionBody>
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
					{#key modules}
					{#each modules as { module_title, module_id }, i}
						<option value="{module_id}" selected={module_id === item_id}>{module_title}</option>
					{/each}
						{/key}
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
					{#key assignments}
					{#each assignments as {assignment_id, title, due}, i (assignment_id)}
						<option value="{assignment_id}">{title} | Due - {new Date(due).toDateString()}</option>
					{/each}
						{/key}
				</select>
			{/if}
			{#if selectedTypeAddItem === "quiz"}

				<label for="quiz_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a quiz</label>
				<select multiple name="quiz_id" id="quiz_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					{#key quizzes}
					{#each quizzes as {id, quiz_title, due}, i (id)}
						<option value="{id}">{quiz_title} | Due - {new Date(due).toDateString()}</option>
					{/each}
						{/key}
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


