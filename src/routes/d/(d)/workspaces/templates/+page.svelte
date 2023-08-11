<script>
    import Fa from 'svelte-fa/src/fa.svelte';
    import {faAdd} from "@fortawesome/free-solid-svg-icons";
    import {
        Button,
        Chevron, Dropdown, DropdownItem, Modal,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell
    } from "flowbite-svelte";
    import {page} from "$app/stores";
    import Settings from "$lib/components/Settings.svelte";
    import WorkspaceNav from "$lib/components/WorkspaceNav.svelte";
    import Navbar from "$lib/components/Navbar.svelte";


    /** @type {import('./$types').PageData | null} */
    export let data

    let templates;
    $: templates = $page.data.templates;

    let createTemplate;
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

    <div class="flex ">
        <!-- Work space navigation -->
        <aside class=" sticky top-0 inline-block" >
            <WorkspaceNav />
        </aside>

<!-- Content -->
<section class="flex flex-col p-8 inline-block w-full">

    <div class="mx-0.5 mb-4 flex justify-between">
        <div class="">
            <button
                    class="ml-0.5 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
				font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
				group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
				focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
                    on:click={() => {createTemplate = true;}}
                    >
				<span
                        class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
					dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
					<div class="inline-block"><Fa icon={faAdd}/></div> <div class="inline-block">Create Template</div>
				</span>
            </button>
        </div>

    </div>


    <div class="relative sm:rounded-lg w-full overflow-x-auto overflow-y-hidden">
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
                {#key templates}
                    {#each templates as { id, inserted_at, workspace_name, type, workspace_state }}
                        <TableBodyRow class="cursor-pointer" >
                            <TableBodyCell>{workspace_name}</TableBodyCell>
                            <TableBodyCell>{inserted_at?.substring(0,10)}</TableBodyCell>
                            <TableBodyCell>{type}</TableBodyCell>
                            <TableBodyCell>
                                <Button >
                                    <Chevron>Actions</Chevron>
                                </Button>

                                <Dropdown containerClass="absolute z-50">
                                    <DropdownItem> <div>Something</div> </DropdownItem>
                                </Dropdown>
                            </TableBodyCell>
                        </TableBodyRow>
                    {/each}
                {/key}

            </TableBody>
        </Table>
        {#if !templates}
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
                    <span class="font-medium">No templates found...</span>
                </div>
            </div>
        {/if}
    </div>
</section>
    </div>
</div>
</body>

<Modal title="Create Template" bind:open={createTemplate} class="max-w-full" >
    <div class="text-center">
        <div class="font-semibold text-white inline-block pr-4 align-super"></div>
    </div>
</Modal>