<!-- App.svelte -->
<script>
    import {page} from "$app/stores";
    import { blur } from 'svelte/transition';
    import {browser} from "$app/environment";
    import {onMount} from "svelte";
    import {writable} from "svelte/store";


    let deployModel = false;
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

                console.log(url)

                window.open(url, '_blank')

                deployModel = false;

                deployMessages.set([]);

            } catch (e) {
                console.log("Redirect error: " + e)
            }
        }

    }

    let isExpanded = false;
    let isTabVisible = false;

    function toggleExpansion() {
        isExpanded = !isExpanded;
    }

    function handleMouseEnter(event) {
        const windowHeight = window.innerHeight;
        const mousePosY = event.clientY;
        const topThirdThreshold = windowHeight / 3;

        isTabVisible = mousePosY < topThirdThreshold;
        console.log(mousePosY, topThirdThreshold)
    }

    function handleMouseLeave() {
        isTabVisible = false;
    }

    onMount(() => {
        openWorkspace($page.data.workspace_id)
    });

</script>

<style>
    .tab {
        @apply fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-500 rounded-full w-8 h-8 flex justify-center items-center text-white cursor-pointer;
        @apply transition-all duration-300;
    }

    .expanded {
        @apply w-24 h-8 top-2; /* Adjust the size and positioning for the expanded state */
        @apply bg-gray-500; /* Add background color for the expanded state */
    }

    .arrow {
        @apply border-t-3 border-white w-3 h-2.5 transform transition-transform duration-300;
    }

    .arrow-expanded {
        @apply rotate-180;
    }

    .content-container {
        @apply absolute top-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center;
    }

    .content {
        @apply bg-gray-500 text-white text-center mt-2 p-2 rounded;
    }

    .tab-container {
        /* Set the container height to 1/3 of the screen */
        height: calc(100vh / 3);
    }

    full-screen-iframe {
        width: 100%;
        height: 100vh; /* 100vh stands for 100% of the viewport height */
        border: none; /* Remove borders (if any) around the iframe */
    }
</style>
<body class="h-screen">
<div class="relative tab-container" on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
    {#if isTabVisible}
        <div
                class={`tab ${isExpanded ? "expanded" : ""}`}
                on:click={toggleExpansion} transition:blur
        >
            <div class={`arrow ${isExpanded ? "arrow-expanded" : ""}`}></div>
        </div>
    {/if}
    {#if isExpanded && isTabVisible}
        <div class="content-container" transition:blur>
            <div class="content">
                <p>Workspace Name</p>
                <div class="mt-2">
                    <button class="bg-blue-500 text-white px-2 py-1 rounded mr-2">Exit</button>
                    <button class="bg-blue-500 text-white px-2 py-1 rounded">Save</button>
                </div>
            </div>
        </div>
    {/if}
</div>

</body>
