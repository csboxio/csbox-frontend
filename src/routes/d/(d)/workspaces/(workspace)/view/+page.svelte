<script lang="ts">
	import {goto, invalidate, invalidateAll} from "$app/navigation";
	import {
		Button,
		Chevron, DropdownItem,
		Table,
		Dropdown,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell, Modal, Radio, TableSearch,
	} from "flowbite-svelte";
	import { applyAction, deserialize } from "$app/forms";
	import WorkspaceNav from "$lib/components/WorkspaceNav.svelte";
	import WorkspaceStatus from "$lib/components/workspaceStatus.svelte";
	import {afterUpdate, onMount} from "svelte";

	import {page} from "$app/stores";
	import Settings from "$lib/components/Settings.svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import {navStore} from "$lib/stores/stores.js";
	import {writable} from "svelte/store";
	import {browser} from "$app/environment";
	import Fa from 'svelte-fa/src/fa.svelte';
	import {faAdd, faCircleNotch} from '@fortawesome/free-solid-svg-icons';
	import {formatDistanceToNow, parseISO} from "date-fns";

	/** @type {import('./$types').PageData | null} */
	export let data

	let { supabase, session } = data
	$: ({ supabase, session } = data)

	let user;
	$: user = $page.data.user;

	let workspaces;
	$: workspaces = $page.data.workspaces

	let active_workspaces;
	$: active_workspaces = data.active_workspaces;

	let healthcheck;
	$: healthcheck = $page.data.health_check

	let jwt_session;
	$: jwt_session = $page.data.jwt_session

	console.log(jwt_session)

	// Create Workspace
	let deployModal = false;
	let failedApiModal = false;
	let createWorkspaceModal = false;

	let createWorkspaceTypeSelect = 0;
	let createWorkspaceConfigSelect = 0;
	let createWorkspaceStorageSelect = 0;

	let selectedWorkspaceCreateType;
	$: selectedWorkspaceCreateType;
	let selectedWorkspaceCreateConfig
	$: selectedWorkspaceCreateConfig;
	let selectedWorkspaceCreateStorage;
	$: selectedWorkspaceCreateStorage;
	// ----------------

	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('workspaces');
	});

	let searchTerm = '';
	let filteredItems

	console.log(active_workspaces)

		$: filteredItems = active_workspaces.filter(
				(active_workspaces) => active_workspaces.workspace_name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
		);

	let ide;
	$: ide = $page.data.ide;
	export let show_create_box;
	let selectedConfig = null;


	async function handleSubmit(event) {
		const data = new FormData(this);
		const response = await fetch(this.action, {
			method: 'POST',
			body: data
		});
		const result = deserialize(await response.text());
		if (result.type === 'success') {
			// re-run all `load` functions, following the successful update
			await invalidateAll();
		}

		await applyAction(result);
	}

	async function handleCreateWorkspaceSubmit(event) {
		const data = new FormData(this);

		console.log(selectedWorkspaceCreateConfig)
		//data.set('type', selectedConfig);
		data.set('user_id', $page.data.session.user.id);
		data.set('image', selectedWorkspaceCreateConfig);

		const response = await fetch(this.action, {
			method: 'POST',
			body: data
		});
		const result = deserialize(await response.text());
		if (result.type === 'success') {
			// re-run all `load` functions, following the successful update
			await invalidateAll();
		}

		await invalidateAll();
		createWorkspaceModal = false;
		selectedWorkspaceCreateType = undefined;
		selectedWorkspaceCreateConfig = undefined;
		await applyAction(result);
	}

	// ---------- WEB SOCKETS --------------

	const workspaceActionMessages = writable([]);

	async function openWorkspace(workspace_id) {
		workspaceActionModal = true;
		workspaceActionModalTitle = "Opening Workspace"
		const websocketUrl = 'wss://ide.csbox.io/api/v1/workspace/open/'

		const socket = new WebSocket(websocketUrl + workspace_id);

		socket.onmessage = (event) => {
			const message = event.data;
			workspaceActionMessages.update((prevMessages) => [...prevMessages, message])
		}

		socket.onclose = async (event) => {
			console.log("Websocket closed.", event.code, event.reason)
			await redirectWorkspace(workspace_id)
			workspaceActionMessages.set([]);
			//await invalidate('/api/workspace')
		}

		socket.onerror = (error) => {
			console.log("Websocket error.", error)
		}
	}

	async function openWorkspaceFrame(workspace_id) {
		await goto(`${$page.url}/${workspace_id}`)
	}

	function failedResponseApi() {
		failedApiModal = true
		deployModal = false
		createWorkspaceModal = false
		workspaceActionModal = false
		//invalidateAll()
	}

	async function redirectWorkspace(workspace_id) {
		if (browser) {
			try {

				const response = await fetch('https://ide.csbox.io/api/v1/workspace/redirect/' + workspace_id, {
					method: 'GET',
					mode: 'cors',
					credentials: 'omit'
				})
				await invalidateAll()

				if (response.status == 412) {
					failedResponseApi()
				}

				if (!response.ok) {
					failedResponseApi()
					throw new Error('Network error')
				}
				const data = await response.json();
				const url = data.data
				window.open(url, '_blank')
				workspaceActionModal = false;
				workspaceActionMessages.set([]);
				await invalidateAll()
			} catch (e) {
				console.log("Redirect error: " + e)
				failedResponseApi()
			}
		}

	}


	async function stopWorkspace(workspace_id) {
		workspaceActionModal = true;
		workspaceActionModalTitle = "Stopping Workspace"

		const websocketUrl = 'wss://ide.csbox.io/api/v1/workspace/shutdown/'

		const socket = new WebSocket(websocketUrl + workspace_id);

		socket.onmessage = (event) => {
			const message = event.data;
			workspaceActionMessages.update((prevMessages) => [...prevMessages, message])
		}

		socket.onclose = async (event) => {
			console.log("Websocket closed.", event.code, event.reason)
			workspaceActionMessages.set([]);
			workspaceActionModal = false;
			await invalidateAll()
		}

		socket.onerror = (error) => {
			console.log("Websocket error.", error)
		}

	}

	//async function openWorkspaceFrame(workspace_id) {
	//	await goto(`${$page.url}/${workspace_id}`)
	//}

	async function deleteWorkspace(workspace_id) {
		const deleteWorkspaceUrl = 'https://ide.csbox.io/api/v1/workspace/delete/' + workspace_id
		try {
			const response = await fetch(deleteWorkspaceUrl, {
				headers: {
					'Content-Type': 'application/json'
				},
				mode: 'no-cors',
			});
			if (response.status == 200) {
				console.log("Stopped Workspace" + workspace_id);
			}
		}
		catch (e) {
			console.log(e)
		}
		await invalidateAll()
	}

	async function saveWorkspace(workspace_id) {
		const saveWorkspaceUrl = 'https://ide.csbox.io/api/v1/workspace/save/home/' + workspace_id

		const response = await fetch(saveWorkspaceUrl, {
			headers: {
				'Content-Type': 'application/json'
			},
			mode: 'no-cors'
		});
		await invalidate('api/workspace/all')
		if (response.status == 200) {
			console.log("Saved Workspace" + workspace_id);
		}
	}
	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('workspaces');
	});

	let workspaceActionModal = false
	let workspaceActionModalTitle = "Default Title"
</script>

			<!-- Content -->
			<section class="flex flex-col p-8 inline-block w-full">

				{#if active_workspaces}
					{#if active_workspaces.length === 0}
						<div class="flex h-full pb-24 ">
							<div class="m-auto">
						<div class="text-center justify-center text-white font-semibold text-2xl">
							No Workspaces
						</div>
						<div class="text-center justify-center text-gray-200 pt-1 text-sm">
							Create a new workspace to start developing with no limits.
						</div>
								<div class="text-center justify-center pt-4">
									<div class="">
										<div class="">
											<button
													class="ml-0.5 relative inline-flex items-center justify-center p-0.5  mr-2 overflow-hidden text-sm
													font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
													group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
													focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
													on:click={() => { createWorkspaceModal = true }}>
												<span
													class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
													dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
													<div class="inline-block">
														<Fa icon={faAdd}/>
													</div>
													<div class="inline-block">
														Workspace
													</div>
												</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					{/if}
				{/if}

				{#if active_workspaces}
					{#if active_workspaces.length !== 0}

				<div class="mx-0.5 flex justify-between">
					<div class="">
				<button
						class="ml-0.5 relative inline-flex items-center justify-center p-0.5  mr-2 overflow-hidden text-sm
				font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
				group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
				focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
						on:click={() => { createWorkspaceModal = true }}>
				<span
						class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
					dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
					<div class="inline-block"><Fa icon={faAdd}/></div> <div class="inline-block">New Workspace</div>
				</span>
				</button>
					</div>
					{#if healthcheck}
						<div class="py-2">
      <span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-3 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
                <span class="w-2 h-2 mr-1 bg-green-500 rounded-full animate-pulse"></span>
                Available
            </span>
						</div>
					{:else}
						<div class="py-2">
      <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-3 py-1 rounded-full dark:bg-red-900 dark:text-red-300">
                <span class="w-2 h-2 mr-1 bg-red-500 rounded-full animate-pulse"></span>
                Unavailable
            </span>
						</div>
					{/if}
				</div>


				<div class="relative sm:rounded-lg w-full overflow-x-auto overflow-y-hidden">
					<TableSearch placeholder="Search by name..." hoverable={true} bind:inputValue={searchTerm}>
					<Table shadow hoverable class="mb-40">
					<TableHead>
						<TableHeadCell></TableHeadCell>
						<TableHeadCell>Name</TableHeadCell>
						<TableHeadCell>Created</TableHeadCell>
						<TableHeadCell>Type</TableHeadCell>

						<TableHeadCell>
							<span class="sr-only ">Actions</span>
						</TableHeadCell>
					</TableHead>
					<TableBody class="divide-y">
						{#key filteredItems}
								{#each filteredItems as { id, inserted_at, workspace_name, type, workspace_state }}
									<TableBodyRow class="cursor-pointer" >
									<TableBodyCell> <WorkspaceStatus workspace_state={workspace_state}/> </TableBodyCell>
									<TableBodyCell>{workspace_name}</TableBodyCell>
									<TableBodyCell>{formatDistanceToNow(parseISO(inserted_at), {addSuffix: true})}</TableBodyCell>
									<TableBodyCell>{type}</TableBodyCell>
									<TableBodyCell>
										<Button >
											<Chevron>Actions</Chevron>
										</Button>

									<Dropdown containerClass="absolute z-50">
										<DropdownItem> <div on:click={async () => await openWorkspace(id)}>Open</div> </DropdownItem>
										<DropdownItem> <div on:click={async () => await stopWorkspace(id)}>Stop</div> </DropdownItem>
										<DropdownItem> <div on:click={async () => await saveWorkspace(id)}>Save</div> </DropdownItem>
										<DropdownItem slot="footer"> <div on:click={async () => await deleteWorkspace(id)}>Delete</div> </DropdownItem>
									</Dropdown>
									</TableBodyCell>
									</TableBodyRow>
								{/each}
							{/key}

					</TableBody>
				</Table>
					</TableSearch>
					{#if !active_workspaces}
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
								<span class="font-medium">No workspaces found...</span>
							</div>
						</div>
					{/if}
				</div>

						{/if}
				{/if}

			</section>

<Modal title="{workspaceActionModalTitle}" bind:open={workspaceActionModal} class="max-w-xs" >
	<div class="text-center">
		<div class="inline-block pr-4">
		<Fa icon={faCircleNotch} size="2x" spin />
		</div>
		{#if $workspaceActionMessages.length > 0}
			<div class="font-semibold text-white inline-block pr-4 align-super">
				{$workspaceActionMessages[$workspaceActionMessages.length - 1]}
			</div>
			{:else}
			<div class="font-semibold text-white inline-block pr-4 align-super">Waiting...</div>
		{/if}
	</div>
</Modal>


<!-- Failed Modal-->
<Modal title="Error" bind:open={failedApiModal} class="max-w-xs" >
	<div class="text-center">
		<div class="font-semibold text-white inline-block pr-4 align-super">We had an internal error...</div>
	</div>
</Modal>

<!-- Create Modal -->
<Modal title="Create Workspace" bind:open={createWorkspaceModal} class="max-w-xs" >
	<div class="space-y-4">
		<form method="POST" action="?/createWorkspace" on:submit|preventDefault={handleCreateWorkspaceSubmit}>
				<div class="mb-2">
					<!-- Workspace Name-->
					<label for="workspace_name" class="block mb-2 font-medium text-white dark:text-white">
						Workspace Name
					</label>
					<input type="text" name="workspace_name" id="workspace_name"
						   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 text-lg
		focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
		dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						   placeholder="Name"
						   required />
				</div>

				<div class="mb-2">

					<!-- Workspace Type-->
					<label for="type" class="block mb-2 font-medium text-white dark:text-white">
						Workspace Type
					</label>
					<div id="type">
						{#if ide}
						<Button color="alternative" class="w-full">
							<Chevron> {selectedWorkspaceCreateType !== undefined ? ide.type.configurations[createWorkspaceTypeSelect].name : '. . .' }</Chevron>
						</Button>
						<Dropdown class="w-44 p-2 space-y-3 text-sm w-full">
								{#each Object.entries(ide.type.configurations) as [key, config]}
									<li>
										<Radio on:click={() => { selectedWorkspaceCreateType = config.name}} name="type" bind:group={createWorkspaceTypeSelect} value={key}>{config.name}</Radio>
									</li>
								{/each}
						</Dropdown>
						{/if}
					</div>
				</div>

				<!-- Workspace Configuration -->
				<div class="mb-2">
					<label for="type" class="block mb-2 font-medium text-white dark:text-white">
						Config
					</label>
					<div id="config">
						<Button color="alternative" class="w-full">
							<Chevron> {selectedWorkspaceCreateConfig !== undefined ? ide.language.languages[createWorkspaceConfigSelect].name : '. . .' }</Chevron>
						</Button>
						<Dropdown class="w-44 p-2 space-y-3 text-sm w-full">
							{#if ide}
								{#each Object.entries(ide.language.languages) as [key, config]}
									<li>
										<Radio on:click={() => { selectedWorkspaceCreateConfig = config.image}} name="type" bind:group={createWorkspaceConfigSelect} value={key}>{config.name}</Radio>
									</li>
								{/each}
							{/if}
						</Dropdown>

					</div>

				</div>

				<!-- Workspace storage size -->
				<div class="mb-5">
					<label for="storage" class="block mb-2 font-medium text-white dark:text-white">
						Storage Size
					</label>
					<div id="storage">
						<Button color="alternative" class="w-full">
							<Chevron> {selectedWorkspaceCreateStorage !== undefined ? ide.storage.configurations[createWorkspaceStorageSelect].name : '. . .' }</Chevron>
						</Button>
						<Dropdown class="w-44 p-2 space-y-3 text-sm w-full">
							{#if ide}
								{#each Object.entries(ide.storage.configurations) as [key, config]}
									<li>
										<Radio on:click={() => { selectedWorkspaceCreateStorage = config.name}} name="type" bind:group={createWorkspaceStorageSelect} value={key}>{config.name} - {config.size}</Radio>
									</li>
								{/each}
							{/if}
						</Dropdown>

					</div>
				</div>

			<div>
				<Button color="blue" class="w-full" type="submit" >Create</Button>
			</div>
		</form>
	</div>
</Modal>
