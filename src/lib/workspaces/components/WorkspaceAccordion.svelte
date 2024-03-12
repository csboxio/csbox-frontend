<script lang="ts">
    import {createEventDispatcher, getContext} from 'svelte';
    import {slide} from "svelte/transition";
    import Fa from 'svelte-fa/src/fa.svelte';
    import {
        faAngleDown,
        faArrowDown,
        faCheckCircle,
        faCircle, faCircleChevronDown, faCircleNotch,
        faCircleXmark, faEllipsisVertical,
        faGear, faPlay, faPlus, faStop
    } from "@fortawesome/free-solid-svg-icons";
    import {backOut, circOut, cubicOut, quintOut} from "svelte/easing";
    import {writable} from "svelte/store";
    import {Dropdown, DropdownItem, Modal} from "flowbite-svelte";
    import WorkspaceStatus from "$lib/workspaces/components/WorkspaceStatus.svelte";
    import {formatDistanceToNow, parseISO} from "date-fns";
    import { flip } from 'svelte/animate';
    import {page} from "$app/stores";
    import {browser} from "$app/environment";
    import {invalidate, invalidateAll} from "$app/navigation";



    export let id;
    export let workspace_name;
    export let inserted_at;
    export let tier;
    export let workspace_state;

    let isHovered = false;
    let isFocused = false;

    let workspaceActionModal = false
    let workspaceActionModalTitle = "Default Title"
    const workspaceActionMessages = writable([]);
    let deployModal = false;
    let failedApiModal = false;
    let createWorkspaceModal = false;

    let isOpen = localStorage.getItem(id + 'workspace_accordion') === 'true' || false;
    const isOpenStore = writable(isOpen);

    isOpenStore.subscribe(value => {
        localStorage.setItem(id + 'workspace_accordion', value.toString());
    });

    function toggleOpen() {
        isOpenStore.update(isOpen => !isOpen);
    }

    // OPEN Workspace Functions
    async function openWorkspace(workspace_id) {
        workspaceActionModal = true;
        workspaceActionModalTitle = "Opening Workspace"
        const websocketUrl = `wss://ide.csbox.io/api/workspace/open`

        const socket = new WebSocket(websocketUrl);

        socket.onopen = (event) => {
            let workspace_object = {
                "user_id": $page.data.session.user.id,
                "workspace_id_str": workspace_id.toString()
            }
            console.log(workspace_object)
            socket.send(JSON.stringify(workspace_object));
        }

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
                const response = await fetch(`https://ide.csbox.io/api/redirect/${workspace_id}`, {
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

    async function shutdownWorkspace(workspace_id) {
        workspaceActionModal = true;
        workspaceActionModalTitle = "Stopping Workspace"

        const websocketUrl = 'wss://ide.csbox.io/api/workspace/shutdown'

        const socket = new WebSocket(websocketUrl + workspace_id);

        socket.onopen = (event) => {
            let workspace_object = {
                "user_id": $page.data.session.user.id,
                "workspace_id_str": workspace_id
            }
            socket.send(JSON.stringify(workspace_object));
        }

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

</script>


<div class="my-2 border-gray-500  border-2 rounded-xl"
     class:bg-gray-700={!isHovered}
     class:bg-gray-600={isHovered}>

    <button
            on:click={toggleOpen}
            on:mouseenter={() => isHovered = true}
            on:mouseleave={() => isHovered = false}
            on:focus={() => isFocused = true}
            on:blur={() => isFocused = false}
            class="flex text-left w-full focus:outline-none items-center p-4">

        <div class="
            w-8
            transform
            transition
            text-gray-300"
             class:scale-y-[-1]={$isOpenStore}
             class:text-blue-400={isHovered || isFocused}>
            <Fa icon={faAngleDown}></Fa>
        </div>

        <WorkspaceStatus workspace_state={workspace_state}/>

        <div class="grid grid-cols-4 grid-rows-1 gap-4 w-full pl-3">

            <span class="
            border-b-2 inline-block border-transparent font-semibold text-sm transition text-white
            transition text-lg truncate "
                  class:border-opacity-50={isFocused}
                  class:border-blue-300={isFocused}>
                {workspace_name}
            </span>

            <span class="
                    block mt-1 text-xs text-gray-300
                    border-b-2 inline-block border-transparent
                    transition text-lg"
                  class:border-opacity-50={isFocused}
                  class:border-blue-300={isFocused}>
                    {tier}
                </span>

            <span class="
                    block mt-1 text-xs text-gray-300
                    border-b-2 inline-block border-transparent
                    transition text-lg"
                  class:border-opacity-50={isFocused}
                  class:border-blue-300={isFocused}>
                    {formatDistanceToNow(parseISO(inserted_at), {addSuffix: true})}
                </span>
        </div>

        <button class="dark:hover:bg-gray-800 hover:bg-gray-300 p-2 rounded">

            {#key workspace_state}
                {#if workspace_state === "running"}
                    <div in:flip={{ delay: 250, duration: 250, easing: quintOut }} on:click={async () => await shutdownWorkspace(id)}>
                        <Fa icon={faStop} size="lg" class="text-red-200 rounded"/>
                    </div>
                {:else}
                    <div in:flip={{ delay: 250, duration: 250, easing: quintOut }} on:click={async () => await openWorkspace(id)}>
                        <Fa icon={faPlay} size="lg" class="text-green-200 rounded"/>
                    </div>
                {/if}
            {/key}

        </button>



        <div class="w-8 transform transition text-gray-300"

                 class:text-blue-400={isHovered || isFocused}>

            </div>


                <!-- It's the transform -->
                <div class="
            w-8
            transition
            text-gray-300"
                     class:text-blue-400={isHovered || isFocused}>

                </div>

                <button on:click|stopPropagation class="pl-1 text-gray-300 hover:text-white px-4 text-center justify-center">
                    <div class="text-center justify-center"><Fa icon={faEllipsisVertical} size="lg"></Fa></div>
                </button>
                <Dropdown containerClass="absolute z-50 top-8 right-0" class="bg-gray-500 rounded">
                    <div class="cursor-pointer py-2 px-6 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-white " on:click={async () => await openWorkspace(id)}>Open</div>
                    <div class="cursor-pointer py-2 px-6 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-white " on:click={async () => await shutdownWorkspace(id)}>Stop</div>
                    <div class="cursor-pointer py-2 px-6 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-white " on:click={async () => await saveWorkspace(id)}>Save</div>
                    <div class="cursor-pointer py-2 px-6 text-sm hover:bg-red-500 dark:hover:bg-red-600 py-1 overflow-hidden rounded-b-lg text-white "  on:click={async () => await deleteWorkspace(id)}>Delete</div>
                </Dropdown>



    </button>

    {#if $isOpenStore}
        <div class=""
             transition:slide|local={{duration: 250, easing: cubicOut}}>
            <slot/>
        </div>
    {/if}
</div>

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
        <div class="font-semibold text-white inline-block pr-4 align-super">We had an internal error...</div>
        <div class="font-semibold text-white inline-block pr-4 align-super text-sm">Try again in a few minutes.</div>
        <div class="font-semibold text-white inline-block pr-4 align-super text-sm">Contact support@csbox.io, if this error persists.</div>
    </div>
</Modal>
