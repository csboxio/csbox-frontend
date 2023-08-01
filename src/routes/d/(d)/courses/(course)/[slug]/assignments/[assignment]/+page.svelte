<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import {goto, invalidateAll} from '$app/navigation';
	import {page} from "$app/stores";
	import {Button, Chevron, Dropdown, DropdownItem, Input, Label, Tabs, TabItem, Modal} from "flowbite-svelte";
	import QuillBlock from "$lib/blocks/quillBlock.svelte";
	import {updateAssignmentInsert} from "../../../../../../../../lib/utilities/quill.js";
	import WorkspaceStatus from "$lib/components/workspaceStatus.svelte";
	import {browser} from "$app/environment";
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
	import {writable} from "svelte/store";


	export let data;

	let { supabase, claim } = data
	$: ({ supabase, claim } = data)

	let loading;
	let assignment_data
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

	let assignment;
	$: {
		assignment = assignments.find(
				assignment => assignment.assignment_id == assignment_slug
		)
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

</script>

<div class="flex flex-col text-white py-4 w-full">

	<Tabs class="bg-color-600" inactiveClasses="p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100">
		<TabItem open>
			<div slot="title" class="flex items-center gap-2 ">
				Instructions
			</div>

			<QuillBlock bind:supabase={supabase} bind:storePath={storePath}
						bind:filePath={filePath} bind:bucket={bucket} bind:claim={claim}
						saveFunction={saveFunction} />
		</TabItem>
		<TabItem>
			<div slot="title" class="flex items-center gap-2">
				Workspace
			</div>

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

		</TabItem>

		{#if claim !== 'student'}

		<TabItem>
			<div slot="title" class="flex items-center gap-2">
				Settings
			</div>

			<section class="p-1 mt-4">
				<div class="container">


					{#if assignment}
						<div class="bg-gray-800 p-6 rounded-lg shadow-md text-white mt-2">
							<!--Edit assignment-->
							<form action="?/updateAssignment" method="POST" >
								<div class="flex flex-wrap gap-4 mb-4 max-w-xl">
									<div>
										<Label class="font-semibold">Title:</Label>
										<Input type="text" class="text-gray-100" id="title" name="title" bind:value={assignment.title}/>
									</div>
									<div>
										<Label class="font-semibold">Points:</Label>
										<Input type="number" class="text-gray-100" id="points" name="points" bind:value={assignment.points}/>
									</div>
									<div>
										<Label class="font-semibold">Due:</Label>
										<Input type="text" class="text-gray-100" id="date" name="due" bind:value={assignment.due}/>
									</div>
									<div>
										<Label class="font-semibold">Category:</Label>
										<Input type="text" class="text-gray-100" id="category" name="category" bind:value={assignment.category}/>
									</div>
									<div>
										<Label class="font-semibold">Available Start:</Label>
										<Input type="text" class="text-gray-100" id="available_start" name="available_start" bind:value={assignment_data.available_start}/>
									</div>
									<div>
										<Label class="font-semibold">Available End:</Label>
										<Input type="text" class="text-gray-100" id="available_end" name="available_end" bind:value={assignment_data.available_end}/>
									</div>
									<div>
										<Label class="font-semibold">Description:</Label>
										<Input type="text" class="text-gray-100" id="description" name="description" bind:value={assignment_data.description}/>
									</div>
									<div>
										<Label class="font-semibold">Display As:</Label>
										<Input type="text" class="text-gray-100" id="display_as" name="display_as" bind:value={assignment_data.display_as}/>
									</div>
									<div>
										<Label class="font-semibold">Submission Attempts:</Label>
										<!--TODO -->
										<Input disabled type="text" class="text-gray-100" id="submission_attempts" name="submission_attempts" bind:value={assignment_data.submission_attempts}/>
									</div>
									<div>
										<Label class="font-semibold">Grade Type:</Label>
										<Input type="text" class="text-gray-100" id="grade_type" name="grade_type" bind:value={assignment_data.grade_type}/>
									</div>
									<div>
										<Label class="font-semibold">Updated At:</Label>
										<Input type="text"  class="text-gray-100" id="updated_at" name="updated_at" bind:value={assignment_data.updated_at}/>
									</div>

									<div>
										<button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
        							font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
        							group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
        							focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
												on:click={handleSubmit}>
								<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
								dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
									Submit
								</span>
										</button>
									</div>

								</div>
							</form>
						</div>
					{:else}

					{/if}
				</div>
			</section>

		</TabItem>

		{/if}
	</Tabs>


</div>

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