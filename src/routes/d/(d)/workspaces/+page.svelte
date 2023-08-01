<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
	import {
		Button,
		Chevron, DropdownItem,
		Table,
		Dropdown,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell, Modal
	} from "flowbite-svelte";
	import { applyAction, deserialize } from "$app/forms";
	import WorkspaceNav from "$lib/components/WorkspaceNav.svelte";
	import WorkspaceStatus from "$lib/components/workspaceStatus.svelte";
	import {afterUpdate, onMount} from "svelte";

	import {page} from "$app/stores";
	import Settings from "$lib/components/Settings.svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import {navStore} from "../../../../lib/stores/stores.js";
	import {writable} from "svelte/store";
	import {browser} from "$app/environment";
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

	/** @type {import('./$types').PageData | null} */
	export let data = null;

	let workspaces;
	$: workspaces = $page.data.workspaces

	let active_workspaces;
	$: active_workspaces = $page.data.active_workspaces.data;

	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('workspaces');
	});


	if (active_workspaces != null) {
	$: active_workspaces = active_workspaces.sort((a, b) => {
		const dateA = new Date(a.created_at).getTime();
		const dateB = new Date(b.created_at).getTime();

		if (a.workspace_state === 0 && b.workspace_state !== 0) {
			return 1;
		} else if (a.workspace_state !== 1 && b.workspace_state === 1) {
			return -1;
		}
		return dateB - dateA;
	});
	}


	let ide;
	$: ide = $page.data.ide;

	export let show_create_box;

	let selectedConfig = null;


	function selectConfig(config) {
		selectedConfig = config;
	}

	function show_box() {
		show_create_box = true;
	}

	function close_box() {
		show_create_box = false;
	}

	async function handleSubmit(event) {
		const data = new FormData(this);
		const response = await fetch(this.action, {
			method: 'POST',
			body: data
		});
		const result = deserialize(await response.text());
		if (result.type === 'success') {
			// re-run all `load` functions, following the successful update
			close_box();
			await invalidateAll();
		}

		await applyAction(result);
	}

	// ---------- WEB SOCKETS --------------

	const deployMessages = writable([]);

	async function openWorkspace(workspace_id) {


		deployModel = true;
		const websocketUrl = 'wss://ide.csbox.io/api/workspace/open/'

		const socket = new WebSocket(websocketUrl + workspace_id);

		socket.onmessage = (event) => {
			const message = event.data;
			deployMessages.update((prevMessages) => [...prevMessages, message])
		}

		socket.onclose = async (event) => {
			console.log("Websocket closed.", event.code, event.reason)
			await redirectWorkspace(workspace_id)
		}

		socket.onerror = (error) => {
			console.log("Websocket error.", error)
		}
	}


	async function openWorkspaceFrame(workspace_id) {
		await goto(`${$page.url}/${workspace_id}`)
	}

	async function redirectWorkspace(workspace_id) {
		if (browser) {
			try {

				const response = await fetch('https://ide.csbox.io/api/workspace/redirect/' + workspace_id, {
					method: 'GET',
					mode: 'cors',
					credentials: 'omit'
				})

				if (!response.ok) {
					throw new Error('Network error')
				}

				const data = await response.json();

				console.log(data)

				const url = data.data

				window.open(url, '_blank')

				deployModel = false;

				deployMessages.set([]);

			} catch (e) {
				console.log("Redirect error: " + e)
			}
		}

	}


	async function stopWorkspace(workspace_id) {
		const stopWorkspaceUrl = 'https://ide.csbox.io/api/workspace/shutdown/' + workspace_id

		const response = await fetch(stopWorkspaceUrl, {
			headers: {
				'Content-Type': 'application/json'
			},
			mode: 'no-cors'
		});
		if (response.status == 200) {
			console.log("Stopped Workspace" + workspace_id);
		}
	}

	async function saveWorkspace(workspace_id) {
		const saveWorkspaceUrl = 'https://ide.csbox.io/api/workspace/save/home/' + workspace_id

		const response = await fetch(saveWorkspaceUrl, {
			headers: {
				'Content-Type': 'application/json'
			},
			mode: 'no-cors'
		});
		if (response.status == 200) {
			console.log("Saved Workspace" + workspace_id);
		}
	}
	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('workspaces');
	});
	let deployModel = false;
</script>

<body class="bg-gray-600 antialiased bg-body text-body font-body">

<!-- Nav bar on the left of the screen-->
<Navbar/>

<div class="mx-auto lg:ml-16">

	<!-- Top bar of settings -->
	<section>
		<div class="pt-3 pb-3 px-8 dark:bg-gray-700 bg-white">
			<div class="flex flex-wrap items-center justify-between -mx-2">
				<div class="w-full lg:w-auto px-2 mb-6 lg:mb-0">
					<h4 class="text-2xl font-bold dark:text-white  tracking-wide leading-7 mb-1">Workspaces</h4>
				</div>
				<div class="w-full lg:w-auto px-2">
					<Settings bind:data={data}/>
				</div>
			</div>
		</div>
	</section>

	<div class="flex min-h-screen">
	<!-- Work space navigation -->
	<aside class="h-screen sticky top-0 inline-block" >
		<WorkspaceNav active_workspaces={active_workspaces}/>
	</aside>
			<!-- Content -->
			<section class="flex flex-col p-8 inline-block w-full">
				<div class="relative sm:rounded-lg w-full overflow-x-auto overflow-y-hidden">
				<Table shadow hoverable>
					<TableHead>
						<TableHeadCell></TableHeadCell>
						<TableHeadCell>Title</TableHeadCell>
						<TableHeadCell>Created</TableHeadCell>
						<TableHeadCell>Type</TableHeadCell>
						<TableHeadCell>
							<span class="sr-only ">Actions</span>
						</TableHeadCell>
					</TableHead>
					<TableBody class="divide-y">
						{#if active_workspaces}
							{#key active_workspaces}
								{#each active_workspaces as { id, inserted_at, workspace_name, image_name, type, workspace_state }}
									<TableBodyRow  class="cursor-pointer" >
									<TableBodyCell> <WorkspaceStatus workspace_state={workspace_state}/> </TableBodyCell>
									<TableBodyCell>{workspace_name}</TableBodyCell>
									<TableBodyCell>{inserted_at?.substring(0,10)}</TableBodyCell>
									<TableBodyCell>{type}</TableBodyCell>
									<TableBodyCell>
										<Button>
											<Chevron>Actions</Chevron>
										</Button>
									<Dropdown>
										<DropdownItem> <div on:click={async () => await openWorkspace(id)}>Open</div> </DropdownItem>
										<DropdownItem> <div on:click={async () => await stopWorkspace(id)}>Stop</div> </DropdownItem>
										<DropdownItem> <div on:click={async () => await saveWorkspace(id)}>Save</div> </DropdownItem>
									</Dropdown>
									</TableBodyCell>
									</TableBodyRow>
								{/each}
							{/key}
						{/if}

					</TableBody>
				</Table>
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
			</section>
		</div>
    </div>
</body>

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
