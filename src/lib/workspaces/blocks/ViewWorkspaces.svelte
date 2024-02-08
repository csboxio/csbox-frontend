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
    let workspaceActionModal = false
    let workspaceActionModalTitle = "Default Title"
    const workspaceActionMessages = writable([]);

    let deployModal = false;
    let failedApiModal = false;

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

    // Workspace Functions
    async function openWorkspace(workspace_id) {
        workspaceActionModal = true;
        workspaceActionModalTitle = "Opening Workspace"
        const websocketUrl = `wss://ide.csbox.io/api/user/${$page.data.session.user.id}/workspace/${workspace_id}/open`

        const socket = new WebSocket(websocketUrl);

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

    function failedResponseApi() {
        failedApiModal = true
        deployModal = false
        createWorkspaceModal = false
        workspaceActionModal = false
    }

    async function redirectWorkspace(workspace_id) {
        if (browser) {
            try {

                const response = await fetch(`https://ide.csbox.io/api/user/${$page.data.session.user.id}/workspace/${workspace_id}/redirect`, {
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
        } catch (e) {
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

    // End of Workspace Functions

    // Workspace Form Actions

    let selectedWorkspaceCreateType;
    $: selectedWorkspaceCreateType;
    let selectedWorkspaceCreateConfig
    $: selectedWorkspaceCreateConfig;
    let createWorkspaceTypeSelect = 0;
    let createWorkspaceConfigSelect = 0;

    async function handleCreateWorkspaceSubmit(event) {
        const data = new FormData(this);

        data.set('workspace_name', workspaceName);
        data.set('user_id', $page.data.session.user.id);
        data.set('image', selectedWorkspaceCreateConfig);

        const response = await fetch(this.action, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
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
						</span></button>
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

            <div class="relative sm:rounded-lg overflow-x-auto overflow-y-hidden">
                <TableSearch placeholder="Search by name..." hoverable={true} bind:inputValue={searchTerm}>
                    <Table shadow hoverable class="mb-40 w-full bg-gray-800">
                        <TableHead>

                            <TableHeadCell>Name</TableHeadCell>
                            <TableHeadCell>Created</TableHeadCell>
                            <TableHeadCell>Type</TableHeadCell>
                            <TableHeadCell>
                                <span class="sr-only ">Actions</span>
                            </TableHeadCell>
                        </TableHead>
                        <TableBody class="divide-y">
                            {#key filteredItems}
                                {#each filteredItems as {id, inserted_at, workspace_name, type, workspace_state}}
                                    <TableBodyRow>
                                        <TableBodyCell>
                                            <WorkspaceStatus workspace_state={workspace_state}/>
                                            <div class="pl-2 cursor-pointer hover:text-blue-400 text-md inline-block"
                                                 on:click={() => { openWorkspace(id); }}>{workspace_name}</div>
                                        </TableBodyCell>
                                        <TableBodyCell>{formatDistanceToNow(parseISO(inserted_at), {addSuffix: true})}</TableBodyCell>
                                        <TableBodyCell>{type}</TableBodyCell>
                                        <TableBodyCell>
                                            <!-- Gear Icon -->
                                            <button class="dark:hover:bg-gray-800 hover:bg-gray-300  p-2 rounded" >
                                                <Fa icon={faGear} size="lg" class="rounded" />
                                            </button>
                                            <!-- Gear Icon Drop down -->
                                            <Dropdown containerClass="absolute z-50 px-4 " class="bg-gray-400 rounded" color="custom">
                                                <div class="cursor-pointer py-2 px-6 text-sm hover:bg-gray-100 dark:hover:bg-gray-600" on:click={async () => await openWorkspace(id)}>Open</div>
                                                <div class="cursor-pointer py-2 px-6 text-sm hover:bg-gray-100 dark:hover:bg-gray-600" on:click={async () => await stopWorkspace(id)}>Stop</div>
                                                <div class="cursor-pointer py-2 px-6 text-sm hover:bg-gray-100 dark:hover:bg-gray-600" on:click={async () => await saveWorkspace(id)}>Save</div>
                                                <div class="cursor-pointer py-2 px-6 text-sm hover:bg-red-500 dark:hover:bg-red-600 py-1 overflow-hidden rounded-b-lg"  on:click={async () => await deleteWorkspace(id)}>Delete</div>
                                            </Dropdown>

                                            <button class="dark:hover:bg-gray-800 hover:bg-gray-300 p-2 rounded">
                                                {#key workspace_state}
                                                    {#if workspace_state === "running"}
                                                        <div in:flip={{ delay: 250, duration: 250, easing: quintOut }} on:click={async () => await stopWorkspace(id)}>
                                                            <Fa icon={faStop} size="lg" class="text-red-200 rounded"/>
                                                        </div>
                                                    {:else}
                                                        <div in:flip={{ delay: 250, duration: 250, easing: quintOut }} on:click={async () => await openWorkspace(id)}>
                                                            <Fa icon={faPlay} size="lg" class="text-green-200 rounded"/>
                                                        </div>
                                                    {/if}
                                                {/key}
                                            </button>
                                        </TableBodyCell>
                                    </TableBodyRow>
                                {/each}
                            {/key}

                        </TableBody>
                    </Table>
                </TableSearch>
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

<Modal bind:open={workspaceActionModal} class="max-w-xs dark:bg-gray-500 bg-gray-200" title="{workspaceActionModalTitle}">
    <div class="text-center">
        <div class="inline-block pr-2">
            <Fa icon={faCircleNotch} size="2x" spin/>
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
<Modal bind:open={failedApiModal} class="max-w-md dark:bg-gray-500 bg-gray-200" title="Error">
    <div class="text-center">
        <div class="font-semibold text-white inline-block pr-4 align-super">We had an internal error... 😔</div>
        <div class="font-semibold text-white inline-block pr-4 align-super">Contact support@csbox.io, if this error persists.</div>
    </div>
</Modal>

<Modal bind:open={createWorkspaceModal} class="max-w-md dark:bg-gray-500 bg-gray-200 text-white" color="custom" title="Create Workspace">
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

                <!-- Workspace Type-->
                <label class="block mb-2 font-medium text-white dark:text-white" for="type">
                    Type <span class="text-red-500">*</span>
                </label>
                <div id="type">
                    {#if ide}
                        <Button color="custom" class="w-full text-white bg-gray-600">
                            <Chevron> {selectedWorkspaceCreateType !== undefined ? ide.type.configurations[createWorkspaceTypeSelect].name : '. . .' }</Chevron>
                        </Button>
                        <Dropdown class=" p-2 space-y-3 text-sm">
                            {#each Object.entries(ide.type.configurations) as [key, config]}
                                <li>
                                    <Radio on:click={() => { selectedWorkspaceCreateType = config.name}} name="type"
                                           bind:group={createWorkspaceTypeSelect} value={key}>{config.name}</Radio>
                                </li>
                            {/each}
                        </Dropdown>
                    {/if}
                </div>
            </div>

            <!-- Workspace Configuration -->
            <div class="mb-6">
                <label class="block mb-2 font-medium text-white dark:text-white" for="type">
                    Config <span class="text-red-500">*</span>
                </label>
                <div id="config">
                    <Button class="w-full text-white bg-gray-600" color="custom">
                        <Chevron> {selectedWorkspaceCreateConfig !== undefined ? ide.language.languages[createWorkspaceConfigSelect].name : '. . .' }</Chevron>
                    </Button>
                    <Dropdown class="w-44 p-2 space-y-3 text-sm w-full">
                        {#if ide}
                            {#each Object.entries(ide.language.languages) as [key, config]}
                                <li>
                                    <Radio on:click={() => { selectedWorkspaceCreateConfig = config.image}} name="type"
                                           bind:group={createWorkspaceConfigSelect} value={key}>{config.name}</Radio>
                                </li>
                            {/each}
                        {/if}
                    </Dropdown>

                </div>

            </div>

            <div>
                <Button class="w-full my-4" color="blue" type="submit">Create</Button>
            </div>
        </form>
    </div>
</Modal>
