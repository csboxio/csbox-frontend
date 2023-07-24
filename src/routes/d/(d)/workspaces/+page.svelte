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
		TableHeadCell
	} from "flowbite-svelte";
	import { applyAction, deserialize } from "$app/forms";
	import WorkspaceNav from "$lib/components/WorkspaceNav.svelte";
	import WorkspaceStatus from "$lib/components/workspaceStatus.svelte";
	import {afterUpdate, onMount} from "svelte";

	import {page} from "$app/stores";
	import Settings from "$lib/components/Settings.svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import {navStore} from "../../../../lib/stores/stores.js";

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


	let ide;
	$: ide = $page.data.ide;

	/*function fetchWorkspaces() {
		getWorkspaces()
				.then((_workspaces) => {
					workspaces = _workspaces;
					localStorage.setItem('storedWorkspaces', JSON.stringify(workspaces))
				})
				.catch((error) => {
					console.log('Error workspaces: ', error)
				})
	}*/

	/*function fetchIde() {
		getIde()
				.then((_ide) => {
					ide = _ide;
					localStorage.setItem('storedIde', JSON.stringify(ide))
				})
				.catch((error) => {
					console.log('Error ide: ', error)
				})
	}*/

	/*async function getWorkspaces() {
		const workspaces = await fetch(`/api/workspace`, {
			headers: {
				'Cache-Control': 'public, max-age=500',
			},
		})
		return {
			workspaces: await workspaces.json(),
		}
	}*/

	/*async function getIde() {
		const ide = await fetch(`/api/workspace/ide?v=1`, {
			headers: {
				'Cache-Control': 'public, max-age=500',
			},
		})
		return {
			ide: await ide.json(),
		}
	}*/


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

	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('workspaces');
	});

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

				<div class="relative overflow-x-auto  sm:rounded-lg w-full">
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
						{#each active_workspaces as { id, created_at, workspace_name, image_name, type, workspace_state }}
							<TableBodyRow  class="cursor-pointer" >
								<TableBodyCell> <WorkspaceStatus workspace_state={workspace_state}/> </TableBodyCell>

								<TableBodyCell>{workspace_name}</TableBodyCell>
								<TableBodyCell>{created_at.substring(0,10)}</TableBodyCell>
								<TableBodyCell>{type}</TableBodyCell>
								<TableBodyCell>
									<Button><Chevron>Actions</Chevron></Button>
									<Dropdown >
										<DropdownItem>Open*</DropdownItem>
										<DropdownItem> <div on:click={() => goto(`http://ide.csbox.io/api/kube/deploy/${id}`)}>Deploy</div> </DropdownItem>
										<DropdownItem> <div on:click={() => fetch(`http://ide.csbox.io/api/workspace/download/home/${id}`).then((response) => {
											if(response.ok) {
												return response
											}
											throw new Error("Something went wrong.")
										}).then((responseJson) => {
											console.log(responseJson)
										})
										.catch((error) => {
											console.log(error)
										}) }>Save</div> </DropdownItem>
										<DropdownItem>Delete*</DropdownItem>
									</Dropdown>
								</TableBodyCell>


							</TableBodyRow>
							{/each}
								{/key}
							{/if}
					</TableBody>
				</Table>
				</div>
			</section>
		</div>
    </div>
</body>
