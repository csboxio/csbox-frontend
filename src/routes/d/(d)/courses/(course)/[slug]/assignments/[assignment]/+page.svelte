<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import {goto, invalidate, invalidateAll} from '$app/navigation';
	import {page} from "$app/stores";
	import {
		Modal,
		TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Table
	} from "flowbite-svelte";
	import QuillBlock from "$lib/blocks/quillBlock.svelte";
	import {updateAssignmentInsert} from "../../../../../../../../lib/utilities/quill.js";
	import {browser} from "$app/environment";
	import Fa from 'svelte-fa/src/fa.svelte';
	import {faChain, faCheck, faCircleNotch, faPencil, faPlus, faX} from '@fortawesome/free-solid-svg-icons';
	import {writable} from "svelte/store";
	import {beforeUpdate, onMount} from "svelte";
	import {format, formatDistanceToNow, parseISO} from "date-fns";
	import EditAssignment from "$lib/components/Course/block/EditAssignment.svelte";

	export let data;

	let { supabase, claim } = data
	$: ({ supabase, claim } = data)

	let loading;
	let assignment_data
	$: assignment_data = $page.data.assignment

	let assignment_slug;
	$: assignment_slug = $page.data.assignment_slug

	let assignments;
	$: assignments = $page.data.assignments

	let submitted;
	$: submitted = $page.data.submitted;

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

	async function handleSaveWorkspaceStarter(event) {
		if (browser) {
			const saveWorkspaceAsStartUrl = `https://ide.csbox.io/api/workspace/starter/save/${selectedWorkspaceSaveId}/${assignment_slug}`

			const response = await fetch(saveWorkspaceAsStartUrl, {
				headers: {
					'Content-Type': 'application/json'
				},
				mode: 'no-cors'
			});
			if (response.ok) {
				alert("Saved as starter")
			}
		}
	}

	async function redirectWorkspace(workspace_id) {
		if (browser) {
			try {

				const response = await fetch('https://ide.csbox.io/api/kube/redirect/' + workspace_id, {
					method: 'GET',
					mode: 'cors',
					credentials: 'omit'
				})

				if (!response.ok) {
					throw new Error('Network error')
				}

				const data = await response.json();

				const url = data.url;

				console.log(url)

				window.open('https://' + url, '_blank')

				deployModel = false;

			} catch (e) {
				console.log("Redirect error: " + e)
			}
		}

	}

	async function handleLoadWorkspaceStarter(event) {
		if (browser) {
			const openWorkspaceStarterUrl = `https://ide.csbox.io/api/workspace/starter/load/${selectedWorkspaceOpenId}/${assignment_slug}`


			const response = await fetch(openWorkspaceStarterUrl, {
				headers: {
					'Content-Type': 'application/json'
				},
				mode: 'no-cors'
			});
			if (response) {
				await redirectWorkspace(selectedWorkspaceOpenId)
			}
		}
	}

	let showStarterInfo
	function toggleStarterInfo() {
		showStarterInfo = !showStarterInfo
	}


	async function saveFunction() {
		await updateAssignmentInsert($page.params.assignment, supabase)
	}

	let active_workspaces

	async function loadWorkspaces() {
		const cacheOptions = {
			headers: {
				'Cache-Control': 'public, max-age=500',
			},
		};
		try {
			const response = await fetch("/api/workspace/all", cacheOptions);

			if (response.ok) {
				$: active_workspaces = await response.json()

				console.log(active_workspaces)
			}
		}
		catch (e) {
			console.log(e)
		}
	}

	let selectedWorkspaceSaveName
	let selectedWorkspaceOpenName
	let selectedWorkspaceSaveId
	let selectedWorkspaceOpenId
	let workspaceSaveSelector
	let workspaceOpenSelector

	let deployModel = false;
	const deployMessages = writable([]);

	let bucket = "assignments"
	let storePath = `assignment-${$page.params.assignment}-document`
	let filePath
	$: filePath = `${$page.params.slug}/assignments/${$page.params.assignment}/document.HTML?t=${assignment_data.updated_at}`

	let startAssignmentModal = false;
	let createOrLinkTemplateModal = false;
	let createNewTemplateModal = false;
	let linkTemplateModal = false;

	let templates;
	$: templates;

	async function handleNewTemplate(event) {
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
			createOrLinkTemplateModal = false;
			createNewTemplateModal = false;
			await invalidateAll();
		}
		console.log(result)
		await invalidateAll();
		await applyAction(result);
	}

	async function handleLinkTemplate(event) {
		loading = true;
		const data = new FormData(this);
		data.append('template_id', linkTemplateId)
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
			createOrLinkTemplateModal = false;
			createNewTemplateModal = false;
			linkTemplateModal = false;
			await invalidateAll();
		}
		console.log(result)
		await applyAction(result);
	}

	async function getTemplates() {
		const url = new URL('/api/workspace/templates', window.location.origin);
		const response = await fetch(url);
		const data = await response.json();
		templates = data
		console.log(data)
		//console.log(published)
		await invalidateAll();
		await startPages();

	}
	async function startPages() {
		await updateCurrentPageData()
	}

	async function unlinkAssignmentFromTemplate() {
		const url = new URL('/api/assignments/unlink_template/', window.location.origin);
		url.searchParams.set('assignment_id', $page.params.assignment)
		const response = await fetch(url);

		await invalidateAll();
	}

	async function editTemplate() {
		console.log("Edit template")
	}

	// Templates Page Data
	let currentPage = 0;
	let elementsPerPage = 5;

	let currentPageData = [];

	function updateCurrentPageData() {
		let start = currentPage * elementsPerPage;
		let end = start + elementsPerPage;
		if (templates) {
			currentPageData = templates.slice(start, end)
			isLastPage = currentPage === Math.floor(templates.length / elementsPerPage);
		}
	}

	function nextPage() {
		currentPage = Math.min(currentPage + 1, Math.floor(templates.length / elementsPerPage));
		updateCurrentPageData();
	}

	function previousPage() {
		currentPage = Math.max(currentPage - 1, 0);
		updateCurrentPageData();
	}

	// Link template

	let linkTemplateId;

	let isLastPage
	$: isLastPage

	// TODO Make the mode update (like the quillblock cancel preview save buttons don't make it change here)
	const mode = {
		edit: false,
		view: true
	};

	export function handleEdit() {
		//mode.edit = !mode.edit;
		//mode.view = !mode.view;
		editModal = true;
	}

	let startAssignment = false;

	let f_assignment_updated_at = null;
	let f_assignment_available_start = null;
	let f_assignment_available_end = null;
	let f_assignment_due = null;
	let f_submission_date = null

	$: if (assignment_data.updated_at) {
		f_assignment_updated_at = format(parseISO(assignment_data.updated_at), "yyyy-MM-dd'T'HH:mm");
	}

	$: if (assignment_data.available_start) {
		f_assignment_available_start = format(parseISO(assignment_data?.available_start), "yyyy-MM-dd'T'HH:mm");
	}

	$: if (assignment_data.available_end) {
		f_assignment_available_end = format(parseISO(assignment_data?.available_end), "yyyy-MM-dd'T'HH:mm");
	}

	$: if (assignment_data.due) {
		f_assignment_due =  format(parseISO(assignment_data?.due), "yyyy-MM-dd'T'HH:mm");
	}

	$: if (submitted.submission_updated_at) {
		const parsedDate = new Date(submitted.submission_updated_at);
		f_submission_date = format(parsedDate, "MMM dd hh:mm a");
	}

	$: assignment_published = assignment_data.published;

	beforeUpdate(() => {
		if (!assignment_data.published && claim === 'student') {
			goto('/d')
			throw new Error("Unable to render page.");
		}
	});

	async function publishAssignment(assignment_id) {
		assignment_published = !assignment_published
		const url = new URL('/api/assignments/publish/', window.location.origin);
		url.searchParams.append('assignment_id', assignment_id);
		const response = await fetch(url);
		const { res, error, status } = await response.json();
		//console.log(res, error, status)
		await invalidateAll();
	}

	async function unpublishAssignment(assignment_id) {
		assignment_published = !assignment_published
		const url = new URL('/api/assignments/unpublish/', window.location.origin);
		url.searchParams.append('assignment_id', assignment_id);
		const response = await fetch(url);
		const { res, error, status } = await response.json();
		//console.log(res, error, status)

		await invalidateAll();
	}

	let editModal;

	let groups;
	$: groups = $page.data.groups

	let modules;
	$: modules = $page.data.modules;

	console.log($page.data)

	let buttonText = assignment_published ? 'Published' : 'Unpublished';
	let buttonColor = assignment_published ? 'from-green-500 to-green-300' : 'from-blue-500 to-blue-300';

	function toggleAssignment() {
		buttonText = '...';
		if (assignment_published) {
			unpublishAssignment(assignment_slug);
			buttonText = 'Unpublished';
		} else {
			publishAssignment(assignment_slug);
			buttonText = 'Published';
		}
	}
</script>

<div class="w-full">
	<!-- Top bar -->
	<div class="flex flex-wrap mt-4 space-x-2 px-4">
		<div class="flex-grow text-white text-2xl font-semibold pt-4">
			{assignment_data.title ? assignment_data.title : "No title"}

			<button class="text-gray-100 hover:text-gray-200"
					on:click={handleEdit}>
				<Fa icon={faPencil} size="sm" class=""/>
			</button>
		</div>

		<!-- Button group -->
		<div class="ml-auto flex space-x-2 pr-4 pt-4">

			{#if claim === 'instructor'}
			{#key assignment_published}
				<div>
					<button
							class={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
             font-medium text-gray-900 rounded-lg group bg-gradient-to-br ${buttonColor}
             group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
             focus:ring-4 focus:outline-none ${assignment_published ? 'focus:ring-green-200 dark:focus:ring-green-800' : 'focus:ring-blue-200 dark:focus:ring-blue-800'}`}
							on:mouseenter={() => { buttonColor = assignment_published ? 'from-blue-300 to-blue-500' : 'from-green-300 to-green-500'; buttonText = 'Unpublished'; }}
							on:mouseleave={() => { buttonColor = assignment_published ? 'from-green-500 to-green-300' : 'from-blue-500 to-blue-300'; buttonText = 'Published';} }
							on:click|stopPropagation={toggleAssignment}
					>
    <span
			class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
             dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
      {buttonText}
    </span>
					</button>
				</div>
			{/key}
			{/if}
			{#if claim === 'student'}
				<div>
					<button
							class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
								font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
								group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
								focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
							on:click={() => { startAssignment = true;}}>
						<span
								class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
									dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
							Start
						</span>
					</button>
				</div>

			<!-- Submit button-->
				<div>
					{#if submitted.submission_exists === false}
					<button
							class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
								font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
								group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
								focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
							on:click={() => {goto(window.location.pathname + '/submission')}}>
						<span
								class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
									dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
							Submit
						</span>
					</button>
						{:else}
						<button
								class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
								font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
								group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
								focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
								on:click={() => {goto(window.location.pathname + '/submission')}}>
						<span
								class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
									dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
							Re-submit
						</span>
						</button>
						{/if}
				</div>
			{/if}
		</div>
	</div>

	{#key assignment_data}
	<div class="text-white pt-4 space-x-4 px-4">
		<div class="flex">
			<div class="flex space-x-4">
		<b class="pr-2">Due</b> {assignment_data.due ? format(parseISO(assignment_data.due), "MMM dd hh:mm a") : "No due date"}
		<b class="pr-2">Points</b> {assignment_data.points ? assignment_data.points : "No points"}

		<div class="inline-flex flex items-center">
			<b>Template</b>
		{#if assignment_data.template_id === null}
			<div class="inline-block ">
				<Fa icon={faX} class="pl-2 text-red-500"/>
			</div>
			{:else}
				<div class="inline-block ">
					<Fa icon={faCheck} class="pl-2 text-green-500"/>
				</div>
		{/if}
		</div>
			</div>


		<!-- Submitted -->
			{#if claim === 'student'}
				<div class="ml-auto flex ">
					<div class="inline-flex flex items-center text-white">
						<b>Submitted</b>
						{#if submitted.submission_exists === false}
							<div class="inline-block ">
								<Fa icon={faX} class="pl-2 text-red-500"/>
							</div>
						{:else}
							<div class="inline-block ">
								<Fa icon={faCheck} class="pl-2 text-green-500"/>
							</div>
						{/if}
						<!-- TODO SUBMISSION DATE -->
						<div class="pl-2 text-gray-200 pr-4">
							{#if f_submission_date}
								{f_submission_date}
							{/if}
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
	{/key}
	{#key claim}
		{#if claim === 'instructor'}
	<div class="flex flex-wrap mt-4 space-x-2 px-4">
		<!-- Button group -->
		<div class=" flex space-x-2 pr-4 pt-4">

			<!-- Button group -->
				{#key assignment_data}
					<!-- Attach Template -->
					{#if assignment_data.template_id === null}
						<div>
							<button
									class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
								font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
								group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
								focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
									on:click={() => createOrLinkTemplateModal = true}>
						<span
								class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
									dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
							Attach Template
						</span>
							</button>
						</div>
					{:else}
						<!-- Edit Template -->
						<div>
							<button
									class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
								font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
								group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
								focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
									on:click={editTemplate}>
						<span
								class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
									dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
							Edit Template
						</span>
							</button>
						</div>
						<!-- Unlink template -->
						<div>
							<button
									class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
								font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
								group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
								focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
									on:click={unlinkAssignmentFromTemplate}>
						<span
								class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
									dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
							Unlink Template
						</span>
							</button>
						</div>
					{/if}
						<!-- Grade Button -->
						<div>
							<button
									class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
									font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
									group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
									focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
									on:click={() => {goto(window.location.pathname + '/grade')}}>
							<span
									class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
										dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
								Grade
							</span>
							</button>
						</div>
					{/key}
		</div>
	</div>
		{/if}
	{/key}
<div class="flex flex-grow w-full text-white py-4 px-2">
	<div class="flex flex-grow">
		<div class="flex-grow mr-4">
			<hr>
			<div class="pt-3">
			<div class="text-white text-xl font-semibold px-1">Instructions</div>
			</div>
			{#if claim === "student"}
				<QuillBlock bind:supabase={supabase} bind:storePath={storePath}
							bind:filePath={filePath} bind:bucket={bucket} bind:claim={claim}
							saveFunction={saveFunction} mode={mode} editButton={false}/>
			{/if}
			{#if claim === "instructor"}


				<QuillBlock bind:supabase={supabase} bind:storePath={storePath}
							bind:filePath={filePath} bind:bucket={bucket} bind:claim={claim}
							saveFunction={saveFunction} mode={mode} editButton={true}/>
			{/if}
				<!-- Old Workspace Stuff -->
				<!--
			<section class="flex p-1 mt-4">
				<div class="container">
					<div class="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert" on:click={() => toggleStarterInfo()}>
						<svg class="flex-shrink-0 inline w-4 h-4 mr-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
							<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
						</svg>
						<span class="sr-only">Info</span>
						<div>
							<span class="font-medium">Click me!</span>
							{#if showStarterInfo}
								<ul class="mt-1.5 ml-4 list-disc list-inside">
									<li>To create a assignment template, create a workspace and setup files and configuration.</li>
									<li>Once configured, select it in the dropdown "Select a Workspace".</li>
									<li>Click save, now students will be able to open Assignment Template, on this assignment..</li>
								</ul>
							{/if}
						</div>
					</div>

					<div class="mb-6">
					<div class="text-gray-100 font-bold text-xl mb-2">Assignment Template</div>
					<div class="  rounded-xl p-4 justify-between flex w-2/3">

						<div>
							<Button on:click={() => loadWorkspaces()} class="bg-gray-500 px-4 text-lg" title="Select a workspace to save starter from."><Chevron>{selectedWorkspaceSaveName === undefined ? 'Select a Workspace' : selectedWorkspaceSaveName}</Chevron></Button>
							<Dropdown bind:open={workspaceSaveSelector} >
								<DropdownItem>
									<div>Create new</div>
								</DropdownItem>
								{#key active_workspaces}
									{#if active_workspaces}
										{#each active_workspaces.data as workspace}
											<DropdownItem on:click={() => {
							selectedWorkspaceSaveName = workspace.workspace_name;
							workspaceSaveSelector = false;
							selectedWorkspaceSaveId = workspace.id;
						}}>
												<div class="inline-block mr-2">
													<WorkspaceStatus workspace_state={workspace.workspace_state}/>
												</div>
												<div class="inline-block">
													{workspace.workspace_name}
												</div>
											</DropdownItem>
										{/each}
									{:else}
										<div class="p-4">
											Loading...
										</div>
									{/if}
								{/key}
								{#if active_workspaces === undefined}
									<div class="p-2 text-red-500 text-sm">
										Error! support@csbox.io
									</div>
								{/if}
							</Dropdown>
						</div>
						{#if selectedWorkspaceSaveId !== undefined}
							<div>
								<button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
        							font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
        							group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
        							focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
										on:click={() => handleSaveWorkspaceStarter()}>
								<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
								dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
									Save
								</span>
								</button>
							</div>
						{/if}

					</div>
					</div>


					<div class="text-gray-100 font-bold text-xl mb-2 mt-4">Open Starter Workspace</div>
					<div class=" rounded-xl p-4 justify-between flex w-2/3">

						<div>
							<Button on:click={() => loadWorkspaces()} class="bg-gray-500 px-4 text-lg" title="Select a workspace to save starter from."><Chevron>{selectedWorkspaceOpenName === undefined ? 'Your Workspaces' : selectedWorkspaceOpenName}</Chevron></Button>
							<Dropdown bind:open={workspaceOpenSelector} >
								{#key active_workspaces}
									{#if active_workspaces}
										{#each active_workspaces.data as workspace}
											<DropdownItem on:click={() => {
							selectedWorkspaceOpenName = workspace.workspace_name;
							workspaceOpenSelector = false;
							selectedWorkspaceOpenId = workspace.id;
						}}>
												<div class="inline-block mr-2">
													<WorkspaceStatus workspace_state={workspace.workspace_state}/>
												</div>
												<div class="inline-block">
													{workspace.workspace_name}
												</div>
											</DropdownItem>
										{/each}
									{:else}
										<div class="p-4">
											Loading...
										</div>
									{/if}
								{/key}
								{#if active_workspaces === undefined}
									<div class="p-2 text-red-500 text-sm">
										Error! support@csbox.io
									</div>
								{/if}
							</Dropdown>
						</div>
						{#if selectedWorkspaceOpenId !== undefined}
							<div>
								<button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
        							font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
        							group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
        							focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
										on:click={() => handleLoadWorkspaceStarter()}>
								<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
								dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
									Open
								</span>
								</button>
							</div>
						{/if}

					</div>
				</div>
			</section>
				-->
		{#if claim !== 'student'}
			<section class="p-1 mt-4 mr-3 ">
				<div class=" w-full">
					{#if false}
						{#key mode}
						{#if mode.edit === true}
							<div class=" rounded-lg  text-white mt-2">
							<!--Edit assignment-->
							<form action="?/updateAssignment" method="POST" on:submit|preventDefault={handleSubmit}>
								<div class="text-white text-xl font-semibold pb-4">Assignment Data</div>
								<div class="">
									<button class="m-0.5 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
        							font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
        							group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
        							focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
											on:click={handleSubmit}>
								<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
								dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
									Save
								</span>
									</button>
								</div>
								<div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-4 mb-4 pt-4">
									<div>
										<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title:</label>
										<input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
										 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
										  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="title" name="title" bind:value={assignment_data.title}/>
									</div>
									<div>
										<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Points:</label>
										<input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
										 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
										  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="points" name="points" bind:value={assignment_data.points}/>
									</div>
									<div>
										<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due:</label>
										<input type="datetime-local" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
										 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
										  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="date" name="due" bind:value={f_assignment_due}/>
									</div>
									<div>
										<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category:</label>
										<input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
										 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
										  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="category" name="category" bind:value={assignment_data.category}/>
									</div>
									<div>
										<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available Start:</label>
										<input type="datetime-local" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
										 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
										  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="available_start" name="available_start" bind:value={f_assignment_available_start}/>
									</div>
									<div>
										<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available End:</label>
										<input type="datetime-local" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
										 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
										  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="available_end" name="available_end" bind:value={f_assignment_available_end}/>
									</div>
									<div>
										<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description:</label>
										<input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
										 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
										  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="description" name="description" bind:value={assignment_data.description}/>
									</div>
									<div>
										<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Display As:</label>
										<input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
										 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
										  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="display_as" name="display_as" bind:value={assignment_data.display_as}/>
									</div>
									<div>
										<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Submission Attempts:</label>
										<!--TODO -->
										<input disabled type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
										 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
										  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="submission_attempts" name="submission_attempts" bind:value={assignment_data.submission_attempts}/>
									</div>
									<div>
										<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade Type:</label>
										<input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
										 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
										  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="grade_type" name="grade_type" bind:value={assignment_data.grade_type}/>
									</div>
									<div >
										<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Updated At:</label>
										<input type="datetime-local"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
										 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
										  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="updated_at" name="updated_at" bind:value={f_assignment_updated_at}
											     />
									</div>
								</div>
							</form>
						</div>
						{/if}
							{/key}
					{:else}
					{/if}
				</div>
			</section>


		{/if}
		</div>
	</div>

</div>
</div>

<Modal title="Start Assignment" bind:open={startAssignment} class="max-w-xs" >
	<div class="text-center">
		Placeholder
	</div>
</Modal>

<Modal title="Starting Workspace" bind:open={deployModel} class="max-w-xs" >
	<div class="text-center">
		<div class="inline-block pr-4">
			<Fa icon={faCircleNotch} size="2x" spin />
		</div>
		{#if $deployMessages.length > 0}
			<div class="font-semibold text-white inline-block pr-4 align-super">{$deployMessages}</div>
		{:else}
			<div class="font-semibold text-white inline-block pr-4 align-super">Waiting...</div>
		{/if}
	</div>
</Modal>

<Modal title="Attach Template" bind:open={createOrLinkTemplateModal} class="max-w-xs" >
	<div>
	<div class="text-white font-semibold py-2">
		Build and Attach Template.
	</div>
	<button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-2 rounded flex items-center"
					on:click={() => {createNewTemplateModal = true; createOrLinkTemplateModal = false;}}>
		<div class="inline-block pr-1 ">
		<Fa icon={faPlus}/>
		</div>
		Template
	</button>
	</div>
	<div>
		<div class="text-white font-semibold py-2">
			Attach Existing Template
		</div>
	<button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-2 rounded flex items-center"
			on:click={() => {createOrLinkTemplateModal = false; linkTemplateModal = true; getTemplates();}}>
		<div class="inline-block pr-1">
		<Fa icon={faChain}/>
		</div>
		Find Template
	</button>
	</div>
</Modal>

<Modal title="Create Template" class="max-w-xs" bind:open={createNewTemplateModal}>
	<!-- Modal body -->
	<form method="POST" action="?/createTemplate" on:submit|preventDefault={handleNewTemplate}>
		<div class="grid gap-4 mb-4 sm:grid-cols-1">
			<div>
				<label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Template Name</label
				>
				<input
						type="text"
						name="name"
						id="name"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						placeholder="Template Name"
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
			Add new template
		</button>
	</form>
</Modal>

<Modal title="Link Template" class="max-w-xl" bind:open={linkTemplateModal}>
	<!-- Modal body -->
	<form method="POST" action="?/linkTemplate" on:submit|preventDefault={handleLinkTemplate}>
		<Table shadow hoverable >
			<TableHead>
				<TableHeadCell>Name</TableHeadCell>
				<TableHeadCell>Created</TableHeadCell>
				<TableHeadCell>Updated</TableHeadCell>
			</TableHead>
			<TableBody class="divide-y">
				{#if currentPageData}
				{#key currentPageData}
					{#each currentPageData as { id, inserted_at, updated_at, template_name}}
						<TableBodyRow class="cursor-pointer" color="{linkTemplateId === id ? 'blue' : ''}" on:click={() => { linkTemplateId = id; }}>
							<TableBodyCell>{template_name}</TableBodyCell>
							<TableBodyCell>{inserted_at?.substring(0,10)}</TableBodyCell>
							<TableBodyCell>{formatDistanceToNow(parseISO(updated_at), {addSuffix: true})}</TableBodyCell>
						</TableBodyRow>
					{/each}
				{/key}
				{/if}

			</TableBody>
		</Table>
		<div class="mt-4 flex justify-between">
			<button
					class="px-4 py-2 text-white rounded"
					on:click|preventDefault={previousPage}
					class:bg-gray-600={currentPage === 0}
					class:bg-blue-500={currentPage !== 0}

			>
				Back
			</button>
			<div class="text-white font-semibold  my-auto ">Page: {currentPage + 1}</div>
			<button
					class="px-4 py-2  text-white rounded"
					on:click|preventDefault={nextPage}
					class:bg-gray-600={isLastPage}
					class:bg-blue-500={!isLastPage}

			>
				Next
			</button>
		</div>
		<div class="py-4 mx-auto text-center justify-center">
		<button
				type="submit"
				class="px-4 py-2 bg-blue-500 text-white rounded"
				class:bg-gray-600={linkTemplateId === undefined}
				class:opacity-40={linkTemplateId === undefined}
				class:bg-blue-600={linkTemplateId !== undefined}
		>

			Link Template
		</button>
		</div>
	</form>
</Modal>


<EditAssignment
		assignment_id={assignment_data.assignment_id}
		bind:editModal={editModal}
		title={assignment_data.title}
		points={assignment_data.points}
		displayas={assignment_data.display_as}
		submissiontype={assignment_data.submission_type}
		published={assignment_data.published}
		module_id={assignment_data.in_module}
		bind:modules={modules}
		group_id={assignment_data.in_group}
		bind:groups={groups}
		formattedDueDate={f_assignment_due}
		formattedAvailableStart={f_assignment_available_start}
		formattedAvailableEnd={f_assignment_available_end}
/>