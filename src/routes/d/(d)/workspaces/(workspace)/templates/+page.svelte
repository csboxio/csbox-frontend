<script>
    import Fa from 'svelte-fa/src/fa.svelte';
    import {faAdd} from "@fortawesome/free-solid-svg-icons";
    import {fade, slide} from 'svelte/transition';

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
    import { create_in_transition } from "svelte/internal";
    import {applyAction, deserialize} from "$app/forms";
    import {invalidateAll} from "$app/navigation";
    import {formatDistanceToNow, parseISO} from "date-fns";


    /** @type {import('./$types').PageData | null} */
    export let data

    let { supabase, session } = data
    $: ({ supabase, session } = data)

    let user;
    $: user = $page.data.user;

    let templates;
    $: templates = $page.data.templates;

    let createTemplate;

    let selectedOption = 'new'; // Default selected option

    let element

    function selectOption(option) {
        selectedOption = option;
    }

    async function handleCreateTemplateSubmit(event) {
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

        await invalidateAll();
        await applyAction(result);
        createTemplate = false
    }
</script>

<!-- Content -->
<section class="flex flex-col p-8 inline-block w-full">

    {#if templates}
        {#if templates.length === 0}
            <div class="flex h-full pb-24 ">
                <div class="m-auto">
                    <div class="text-center justify-center text-white font-semibold text-2xl">
                        No Templates
                    </div>
                    <div class="text-center justify-center text-gray-200 pt-1 text-sm">
                        Create a new template for re-use.
                    </div>
                    <div class="text-center justify-center pt-4">
                        <div class="">
                            <div class="">
                                <button
                                        class="ml-0.5 relative inline-flex items-center justify-center p-0.5  mr-2 overflow-hidden text-sm
													font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
													group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
													focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
                                        on:click={() => { createTemplate = true }}>
												<span
                                                        class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
														dark:bg-gray-600 rounded-md group-hover:bg-opacity-0 flex items-center">
													<div class="inline-block">
														<Fa icon={faAdd}/>
													</div>
													<div class="inline-block pl-1">Template</div>
												</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    {/if}

    {#if templates}
        {#if templates.length !== 0}
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
					dark:bg-gray-600 rounded-md group-hover:bg-opacity-0 flex items-center">
					<div class="inline-block pr-1"><Fa icon={faAdd}/></div> <div class="inline-block">Create Template</div>
				</span>
            </button>
        </div>

    </div>
        <div class="relative sm:rounded-lg w-full overflow-x-auto overflow-y-hidden">
        <Table shadow hoverable class="mb-40">
            <TableHead>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Created</TableHeadCell>
                <TableHeadCell>Updated</TableHeadCell>

                <TableHeadCell>
                    <span class="sr-only ">Actions</span>
                </TableHeadCell>
            </TableHead>
            <TableBody class="divide-y">
                {#key templates}
                    {#each templates as { id, inserted_at, updated_at, template_name}}
                        <TableBodyRow class="cursor-pointer" >
                            <TableBodyCell>{template_name}</TableBodyCell>
                            <TableBodyCell>{inserted_at?.substring(0,10)}</TableBodyCell>
                            <TableBodyCell>{formatDistanceToNow(parseISO(updated_at), {addSuffix: true})}</TableBodyCell>
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
        {/if}
    {/if}
</section>

<Modal title="Create Template" bind:open={createTemplate} class="max-w-xs" >
    <div class="text-center ">

        <div class="font-semibold text-white  pr-4 ">
            <!-- Multi select -->
            <div class="flex justify-center space-x-1 overflow-hidden ">
                <button
                        class="flex-1 px-4 py-2 rounded-l-md"
                        class:bg-gray-500={selectedOption === 'new'}
                        class:bg-gray-800={selectedOption !== 'new'}
                        on:click={() => selectOption('new')}
                        style="min-width: 0;">
                    New
                </button>
                <button
                        class="flex-1 px-4 py-2 rounded-r-md "
                        class:bg-gray-500={selectedOption === 'git'}
                        class:bg-gray-800={selectedOption !== 'git'}
                        on:click={() => selectOption('git')}
                        style="min-width: 0;">
                    Git
                </button>
            </div>

            {#if selectedOption === "new"}
                <div class="p-4  space-y-4 mx-auto pt-8 ">
                    <div class="space-y-4 ">
                        <form method="POST" action="?/createTemplate" on:submit|preventDefault={handleCreateTemplateSubmit}>
                            <div class="mb-2 mx-auto">
                                <!-- Template Name-->
                                <label for="template_name" class="block mb-2 font-medium text-white dark:text-white">
                                    Template Name
                                </label>
                                <input type="text" name="template_name" id="template_name"
                                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 text-lg
		                                focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
		                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Name"
                                       required />

                            </div>

                            <Button color="blue" class="w-full" type="submit" >Create</Button>

                        </form>
                    </div>
                </div>
            {/if}

            {#if selectedOption === "git"}
                <div class="p-4">
                    Nothing here yet...
                </div>
            {/if}

        </div>
    </div>
</Modal>