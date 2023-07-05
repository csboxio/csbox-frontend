<script lang="ts">
    import Settings from "$lib/components/Settings.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import {navStore} from "../../../../lib/stores/stores.js";
    import {onMount} from "svelte";
    import '$lib/styles/calendar.css'

    let conversations = [
        {
            id: 1,
            date: "2023-07-01",
            subject: "This is the subject line",
            message: "A bunch of random things that don't matter...",
            sent_by: "Professor Guy",
            attachments: ["File"]
        },
        {
            id: 2,
            date: "2023-07-02",
            subject: "This is really important",
            message: "Nope not important...",
            sent_by: "Professor Guy 2",
            attachments: ["File"]
        },
    ];
    let selectedConversation = null;
    function selectConversation(conversation) {
        selectedConversation = conversation;
    }

    export let data

    let { supabase, session, user } = data
    $: ({ supabase, session, user } = data)


    onMount(() => {
        // Set the selected item when the page is mounted
        navStore.set('messages');
    });

</script>

<body class="bg-gray-600 antialiased bg-body text-body font-body">
<Navbar/>

<div class="mx-auto lg:ml-16">
    <section>
        <div class="pt-3 pb-3 px-8 dark:bg-gray-700 bg-white">
            <div class="flex flex-wrap items-center justify-between -mx-2">
                <div class="w-full lg:w-auto px-2 mb-6 lg:mb-0">
                    <h4 class="text-2xl font-bold dark:text-white  tracking-wide leading-7 mb-1">Messages</h4>
                </div>
                <div class="w-full lg:w-auto px-2">
                    <Settings bind:data={data}/>
                </div>
            </div>
        </div>
    </section>
    <section class="flex flex-col p-8 h-screen">
        <div class="flex">
            <!-- Left side - Conversations list -->
            <div class="w-1/3 pr-4">
                <ul>
                    {#each conversations as conversation}
                        <li
                                class="cursor-pointer border border-gray-400 p-2 mb-2 rounded {selectedConversation === conversation ? 'bg-gray-400' : 'bg-gray-500'}"
                                on:click={() => selectConversation(conversation)}>
                            <div class="text-gray-100 text-sm mb-1">{conversation.date}</div>

                            <div class="text-white font-bold mb-1">{conversation.sent_by}</div>
                            <div class="text-white ">{conversation.subject}</div>
                        </li>
                    {/each}
                </ul>
            </div>

            <!-- Right side - Selected conversation -->
            <div class="w-2/3 p-6 text-lg bg-gray-500 border border-gray-400 h-screen">
                {#if selectedConversation}
                    <h2 class="text-white text-2xl font-bold mb-2">{selectedConversation.subject}</h2>
                    <hr>
                    <p class="text-white mt-2">{selectedConversation.message}</p>
                    {#if selectedConversation.attachments.length > 0}
                        <div class="mt-4">
                            <h3 class="text-white font-bold">Attachments:</h3>
                            <ul>
                                {#each selectedConversation.attachments as attachment}
                                    <li class="text-white">{attachment}</li>
                                {/each}
                            </ul>
                        </div>
                    {/if}
                    {:else}
                    <h2 class="text-white text-xl font-bold">No conversations selected...</h2>
                {/if}
            </div>
        </div>
    </section>
</div>
</body>



