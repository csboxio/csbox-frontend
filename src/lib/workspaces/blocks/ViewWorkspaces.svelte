<script lang="ts">
    import {
        Table,
        Dropdown,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell, TableSearch, Modal, Button, Chevron, Radio,
    } from "flowbite-svelte";
    import WorkspaceStatus from "$lib/workspaces/components/WorkspaceStatus.svelte";
    import Fa from 'svelte-fa/src/fa.svelte';
    import {
        faAdd, faCircleNotch, faGear, faPlay, faStop
    } from '@fortawesome/free-solid-svg-icons';
    import {formatDistanceToNow, parseISO} from "date-fns";
    import { flip } from 'svelte/animate';
    import { quintOut } from 'svelte/easing';
    import {page} from "$app/stores";
    import {writable} from "svelte/store";
    import {browser} from "$app/environment";
    import {invalidate, invalidateAll} from "$app/navigation";
    import {applyAction, deserialize} from "$app/forms";
    import {onMount} from "svelte";
    import WorkspaceAccordionBody from "$lib/workspaces/components/WorkspaceAccordionBody.svelte";
    import WorkspaceAccordion from "$lib/workspaces/components/WorkspaceAccordion.svelte";

    // Variables
    export let active_workspaces;
    export let healthcheck;
    export let ide;

    let filteredItems;
    let searchTerm = '';

    $: filteredItems = active_workspaces?.filter(
        (active_workspaces) => active_workspaces.workspace_name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );

    let workspaceName = '';

    let createWorkspaceModal = false;
    function generateRandomWorkspaceName() {
        const getRandomWord = () => {
            const memorableWords = [
                'apple', 'banana', 'cherry', 'dragon', 'elephant', 'fox', 'grape',
                'harmony', 'island', 'jazz', 'kiwi', 'lemon', 'mango', 'nightingale',
                'ocean', 'piano', 'quasar', 'rainbow', 'serendipity', 'tangerine', 'umbrella',
                'vibrant', 'whisper', 'xanadu', 'yellow', 'zeppelin',
                'butterfly', 'cascade', 'dolphin', 'eclipse', 'flamingo', 'giraffe', 'horizon',
                'illusion', 'jubilee', 'kaleidoscope', 'lullaby', 'marvel', 'nirvana', 'opal',
                'paradise', 'quiver', 'radiant', 'sapphire', 'tranquil', 'uplifting', 'velvet',
                'whirlwind', 'xylophone', 'yonder', 'zephyr', 'ambrosia', 'blissful', 'cynosure',
                'divinity', 'ethereal', 'felicity', 'gossamer', 'halcyon', 'infinite', 'jubilant',
                'kismet', 'luminous', 'mellifluous', 'nectar', 'oblivion', 'pristine', 'quintessence',
                'resplendent', 'serenity', 'talisman', 'upbeat', 'voluptuous', 'wonderment', 'xylograph',
                'yearning', 'zestful', 'azure', 'bucolic', 'celestial', 'dandelion', 'effervescent',
                'fandango', 'glisten', 'hallowed', 'ineffable', 'jocund', 'kowtow', 'labyrinthine',
                'mirthful', 'nostalgia', 'opulent', 'placid', 'quintessential', 'radiant', 'seraphic',
                'tranquility', 'uplifting', 'verdant', 'whimsical', 'yonder', 'zephyrous',
                'acquiesce', 'benevolence', 'cachet', 'dexterity', 'effulgent', 'fruition', 'garrulous',
                'idyllic', 'juxtapose', 'kaleidoscopic', 'lamentation', 'magnanimous',
                'nepenthe', 'obfuscate', 'panache', 'sesquipedalian',
                'tumultuous', 'ubiquitous', 'vicissitude', 'wherewithal', 'yarely', 'zenithal',
                'alacrity', 'belligerent', 'cacophony', 'debilitate', 'effervesce', 'facetious', 'garrulity',
                'haphazard', 'indomitable', 'juxtaposition', 'kaleidoscopic', 'loquacious', 'mellifluous',
                'nonchalant', 'oscillation', 'peculiar', 'quagmire', 'resilient', 'sycophant', 'transcendent',
                'ubiquitous', 'vernacular', 'whimsical', 'yonder', 'zealous', 'aberration',
                'benevolent', 'cacophony', 'deleterious', 'effulgent', 'fallacious', 'gregarious', 'harangue',
                'iconoclast', 'juxtapose', 'kowtow', 'labyrinthine', 'mellifluous', 'nefarious', 'obfuscate',
                'peregrinate', 'quixotic', 'reverie', 'sycophant', 'taciturn', 'ubiquitous', 'verisimilitude',
                'whimsical', 'yarely', 'zealous', 'aberration', 'benevolent', 'cacophony', 'deleterious',
                'effulgent', 'fallacious', 'gregarious', 'harangue', 'iconoclast', 'juxtapose', 'kowtow',
                'labyrinthine', 'mellifluous', 'nefarious', 'obfuscate', 'peregrinate', 'quixotic', 'reverie',
                'sycophant', 'taciturn', 'ubiquitous', 'verisimilitude', 'whimsical', 'yarely', 'zealous',
                'aberration', 'benevolent', 'cacophony', 'deleterious', 'effulgent', 'fallacious', 'gregarious', 'harangue',
                'iconoclast', 'juxtapose', 'kowtow', 'labyrinthine', 'mellifluous', 'nefarious', 'obfuscate', 'peregrinate',
            ];
            const randomIndex = Math.floor(Math.random() * memorableWords.length);
            return memorableWords[randomIndex];
        };

        workspaceName = `${getRandomWord()}-${getRandomWord()}-${getRandomWord()}`;
    }
    // Modal
    function openCreateWorkSpaceModel() {
        createWorkspaceModal = true;
        generateRandomWorkspaceName();
    }

    // End of Workspace Functions

    // Workspace Form Actions

    let selectedWorkspaceCreateTier;
    $: selectedWorkspaceCreateTier;
    let selectedWorkspaceCreateConfig
    $: selectedWorkspaceCreateConfig;
    let createWorkspaceTierSelect = 0;
    let createWorkspaceConfigSelect = 0;

    async function handleCreateWorkspaceSubmit(event) {
        const data = new FormData(this);

        data.set('workspace_name', workspaceName);
        data.set('user_id', $page.data.session.user.id);
        data.set('image', selectedWorkspaceCreateConfig);

        const response = await fetch(this.action, {
            method: 'POST',
            body: data
        });

        console.log(response)

        const result = deserialize(await response.text());
        if (result.type === 'success') {
            // re-run all `load` functions, following the successful update
            await invalidateAll();
        }

        await invalidateAll();
        createWorkspaceModal = false;
        selectedWorkspaceCreateTier = undefined;
        selectedWorkspaceCreateConfig = undefined;
        await applyAction(result);
    }

    let tierDropdown;
    let tierDropdownButton;

    let configDropdown;
    let configDropdownButton;

    const toggleTierDropdown = () => {
        tierDropdown.classList.toggle('hidden');
    };

    const toggleConfigDropdown = () => {
        configDropdown.classList.toggle('hidden');
    };

    onMount(() => {
        // Attach click event listener to document
        document.addEventListener('click', handleDocumentClick);

        // Cleanup event listener on component destruction
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    });

    const handleDocumentClick = (event) => {
        // Check if the dropdown element and button element are defined
        if (tierDropdown && tierDropdownButton) {
            // Check if the click is outside the dropdown and button
            if (!(tierDropdown.contains(event.target) || tierDropdownButton.contains(event.target))) {
                tierDropdown.classList.add('hidden');
            }
        }

        if (configDropdown && configDropdownButton) {
            // Check if the click is outside the dropdown and button
            if (!(configDropdown.contains(event.target) || configDropdownButton.contains(event.target))) {
                configDropdown.classList.add('hidden');
            }
        }
    };

</script>

<section class="flex flex-col py-8 px-2 mr-4 inline-block w-full">
    {#key active_workspaces}
        {#if active_workspaces.length === 0}
            <div class="flex h-full pb-24 ">
                <div class="m-auto">
                    <div class="text-center justify-center text-white font-semibold text-2xl">
                        No workspaces found.
                    </div>
                    <div class="text-center justify-center text-gray-200 pt-1 text-sm">
                        Click here to create one.
                    </div>
                    <div class="text-center justify-center pt-4">
                        <div class="">
                            <div class="">
                                <button
                                        class="ml-0.5 relative inline-flex items-center justify-center p-0.5  mr-2 overflow-hidden text-sm
													font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
													group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
													focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
                                        on:click={() => { openCreateWorkSpaceModel() }}>
												<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
														dark:bg-gray-600 rounded-md group-hover:bg-opacity-0 flex items-center">
													<div class="inline-block">
														<Fa icon={faAdd}/>
													</div>
													<div class="inline-block pl-1">Create</div>
												</span>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    {/key}

    {#if active_workspaces}
        {#if active_workspaces.length !== 0}
            <div class="mx-0.5 flex justify-between">
                <div class="">

                    <button class="ml-0.5 relative inline-flex items-center justify-center p-0.5  mr-2 overflow-hidden text-sm
						font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
						group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
						focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
                            on:click={() => { openCreateWorkSpaceModel(); }}>

						<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
							dark:bg-gray-600 rounded-md group-hover:bg-opacity-0 flex items-center">
							<div class="inline-block pr-1"><Fa icon={faAdd}/></div> <div class="inline-block">New Workspace</div>
						</span>
                    </button>

                </div>

                {#if healthcheck}
                    <div class="py-2">
                        <span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-3 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
                            <span class="w-2 h-2 mr-1 bg-green-500 rounded-full animate-pulse"></span>Available</span>
                    </div>
                {:else}
                    <div class="py-2">
							<span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-3 py-1 rounded-full dark:bg-red-900 dark:text-red-300">
								<span class="w-2 h-2 mr-1 bg-red-500 rounded-full animate-pulse"></span>Unavailable</span>
                    </div>
                {/if}

            </div>

            <div class="relative sm:rounded-lg overflow-x-auto overflow-y-auto h-screen">
                <TableSearch placeholder="Search by name..." hoverable={true} bind:inputValue={searchTerm} >
                </TableSearch>


                {#key filteredItems}
                    {#each filteredItems as {id, inserted_at, workspace_name, tier, workspace_state}}
                        <WorkspaceAccordion id={id} workspace_name={workspace_name} workspace_state={workspace_state} tier={tier} inserted_at={inserted_at}></WorkspaceAccordion>
                    {/each}
                {/key}


                {#if !active_workspaces}
                    <div class="flex p-4 mb-6 mt-4 ml-6 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50
						dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                        <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
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

<Modal bind:open={createWorkspaceModal} class="max-w-md text-white"  title="Create Workspace">
    <div class="space-b-8">
        <form action="?/createWorkspace" method="POST" on:submit|preventDefault={handleCreateWorkspaceSubmit}>
            <div class="mb-2">
                <!-- Workspace Name -->
                <label class="block mb-2 font-medium text-white dark:text-white" for="name">
                    Name <span class="text-red-500">*</span>
                    <p class="text-gray-400 dark:text-gray-300 text-sm mt-1">The workspace name to use.</p>
                </label>
                <div class="flex items-center space-x-2">
                    <input
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 text-lg
              focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            id="name"
                            name="name"
                            required
                            type="text"
                            value={workspaceName}
                    />
                </div>
            </div>


            <div class="mb-6">

                <!-- Workspace Tier-->
                <label class="block mb-2 font-medium text-white dark:text-white" for="tier">
                    Tier <span class="text-red-500">*</span>
                </label>
                <div id="tier">
                    {#if ide}
                        <div class="w-full cursor-pointer relative inline-block text-left">
                            <div
                                    bind:this={tierDropdownButton}
                                    class="w-full text-white bg-gray-600 hover:bg-gray-700 py-2 px-2 rounded-md select-none font-semibold"
                            on:click={toggleTierDropdown}
                            >
                            {ide.tier.configurations[createWorkspaceTierSelect].name}
                        </div>

                        <div bind:this={tierDropdown} class="absolute z-10 hidden divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 w-full space-y-1 p-1 font-semibold">
                            {#each Object.entries(ide.tier.configurations) as [key, config] (key)}
                                <div on:click={() => {
                                    createWorkspaceTierSelect = key;
                                    selectedWorkspaceCreateTier = config.name;
                                    toggleTierDropdown();
                                }}
                                     class="{`font-normal py-2 px-4 text-white cursor-pointer border-none rounded-md hover:bg-gray-400 ${createWorkspaceTierSelect === key ? 'bg-gray-400' : ''} my-0`}">
                                    <div class="font-semibold">{config.name}</div> Up to {config.cpu} cores, {config.memory} RAM, {config.storage}
                                </div>
                            {/each}
                        </div>
                        </div>
                    {/if}
                </div>
            </div>

            <!-- Workspace Configuration -->
            <div class="mb-6">
                <label class="block mb-2 font-medium text-white dark:text-white" for="tier">
                    Config <span class="text-red-500">*</span>
                </label>
                <div id="config">
                    {#if ide}
                        <div class="w-full cursor-pointer relative inline-block text-left">
                            <div
                                    bind:this={configDropdownButton}
                                    class="w-full text-white bg-gray-600 hover:bg-gray-700 py-2 px-2 rounded-md select-none font-semibold"
                                    on:click={toggleConfigDropdown}
                            >
                                {ide.language.languages[createWorkspaceConfigSelect].name}
                            </div>


                            <div bind:this={configDropdown} class="absolute z-10 hidden divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 w-full space-y-1 p-1 font-semibold">
                                {#each Object.entries(ide.language.languages) as [key, config] (key)}
                                    <div on:click={() => {
                                    createWorkspaceConfigSelect = key;
                                    selectedWorkspaceCreateConfig = config.name;
                                    toggleConfigDropdown();
                                }}
                                         class="{`py-2 px-4 text-white cursor-pointer border-none rounded-md hover:bg-gray-400 ${createWorkspaceConfigSelect === key ? 'bg-gray-400' : ''} my-0`}">
                                        {config.name}
                                    </div>
                                {/each}
                            </div>
                        </div>

                    {/if}
                </div>

            </div>

            <div>
                <Button class="w-full my-4" color="blue" type="submit">Create</Button>
            </div>
        </form>
    </div>
</Modal>
