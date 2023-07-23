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
	import {afterUpdate, onMount} from "svelte";
	import {navStore} from "../../../../../lib/stores/stores.js";
	import {page} from "$app/stores";

	/** @type {import('./$types').PageData | null} */
	export let data = null;

	let workspaces;
	$: workspaces = $page.data.workspaces

	let active_workspaces;
	$: active_workspaces = $page.data.active_workspaces.data;

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

</script>


<body class="bg-gray-600 antialiased bg-body text-body font-body">
		<div class="mx-auto">
			<section class="pl-2">
				<div class="container my-4">
						<button
							class="relative inline-flex items-center justify-center p-0.5 my-2 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-300 to-blue-500 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
							on:click={() => goto("workspaces/create")}>
						<span
							class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0"
						>
							Create
						</span>
						</button>
				</div>

				<div class="relative overflow-x-auto  sm:rounded-lg w-full">
				<Table shadow hoverable>
					<TableHead>
						<TableHeadCell>Title</TableHeadCell>
						<TableHeadCell>Created</TableHeadCell>
						<TableHeadCell>Configuration</TableHeadCell>
						<TableHeadCell>Status</TableHeadCell>
						<!--<TableHeadCell>
							<span class="sr-only ">Actions</span>
						</TableHeadCell>-->
					</TableHead>
					<TableBody class="divide-y">
						{#if active_workspaces}
							{#key active_workspaces}
						{#each active_workspaces as { id, created_at, workspace_name, image_name, type, workspace_state }}
							<TableBodyRow  class="cursor-pointer" >
								<TableBodyCell>{workspace_name}</TableBodyCell>
								<TableBodyCell>{created_at}</TableBodyCell>
								<TableBodyCell>{image_name}</TableBodyCell>
								<!--<TableBodyCell>{ide[0].status_codes[workspace_state]}</TableBodyCell>-->
								<TableBodyCell>
									<button class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm
									font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-300 to-blue-500
									group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
									focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
									on:click={() => goto("http://ide.csbox.io/api/kube/deploy/" + id)}>
									<span
									class="relative px-3 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600
									rounded-md group-hover:bg-opacity-0">
									Open
									</span>
								</button>


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

</body>
