<script lang="ts">
	import Settings from '$lib/components/Settings.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
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


	// this is needed for the outside click div, that needs to be redone
	let model;

	/** @type {import('./$types').PageData} */
	export let data;
	let workspaces;
	$: workspaces = data.workspaces;
	let ide;
	$: ide = data.ide;

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

<body
	class="bg-gray-600 antialiased bg-body text-body font-body"
	on:click|stopPropagation={() => model.handleToggleMenuTopRight('outside')}
>
		<Navbar /><s></s>
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

				<Table shadow hoverable>
					<TableHead>
						<TableHeadCell>Title</TableHeadCell>
						<TableHeadCell>Created</TableHeadCell>
						<TableHeadCell>Configuration</TableHeadCell>
						<TableHeadCell>Status</TableHeadCell>
						<TableHeadCell>
							<span class="sr-only ">Actions</span>
						</TableHeadCell>
					</TableHead>
					<TableBody class="divide-y">
						{#each workspaces as { id, inserted_at, instance_config, instance_title, instance_state }}
							<TableBodyRow  class="cursor-pointer" >
								<TableBodyCell>{instance_title}</TableBodyCell>
								<TableBodyCell>{inserted_at.substring(0,10)}</TableBodyCell>
								<TableBodyCell>{ide[0].configuration[instance_config].name}</TableBodyCell>
								<TableBodyCell>{ide[0].status_codes[instance_state]}</TableBodyCell>
								<TableBodyRow>
									<Button ><Chevron>Dropdown button</Chevron></Button>
									<Dropdown tdClass="z-100" >
										<DropdownItem>Dashboard</DropdownItem>
										<DropdownItem>Settings</DropdownItem>
										<DropdownItem>Earnings</DropdownItem>
										<DropdownItem>Sign out</DropdownItem>
									</Dropdown>
								</TableBodyRow>
							</TableBodyRow>
							{/each}
					</TableBody>
				</Table>
			</section>
		</div>

</body>
