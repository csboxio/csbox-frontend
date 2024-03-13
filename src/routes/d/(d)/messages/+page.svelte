<script lang="ts">
    import Settings from "$lib/components/Settings.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import {navStore} from "../../../../lib/stores/stores.js";
    import {onMount} from "svelte";
    import '$lib/styles/calendar.css'
    import {page} from "$app/stores";

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

    let messages;
    $: messages = $page.data.messages.data

    let selectedMessage;
    function selectMessage(message) {
        selectedMessage = message;
    }

    export let data

    let { supabase, session, claim } = data
    $: ({ supabase, session, claim } = data)

    let user;
    $: user = $page.data.user;


    onMount(() => {
        // Set the selected item when the page is mounted
        navStore.set('messages');
    });

</script>

<body class="bg-gray-600 antialiased bg-body text-body font-body">
<Navbar claim={claim}/>

<div class="mx-auto lg:ml-16">
    <section>
        <div class="sm:py-3 py-1 px-8 dark:bg-gray-700 bg-white">
            <div class="flex flex-wrap items-center justify-between -mx-2">
                <div class="lg:w-auto px-2 my-1 sm:my-2  ">
                    <h4 class="text-2xl font-bold dark:text-white  tracking-wide leading-7 mb-1">Messages</h4>
                </div>
                <div class="lg:w-auto px-2">
                    <Settings bind:supabase={supabase} bind:user={user.data} bind:claim={claim}/>
                </div>
            </div>
        </div>
    </section>
    <section class="flex flex-col p-8 h-screen">
        <div class="flex">
            <!-- Left side - Message list -->
            <div class="w-1/3 pr-4">
                <ul>
                    {#each messages as message}
                        <li
                                class="cursor-pointer border border-gray-400 p-2 mb-2 rounded {selectedMessage === message ? 'bg-gray-400' : 'bg-gray-500'}"
                                on:click={() => selectMessage(message)}>
                            <div class="text-gray-100 text-sm mb-1">{message.sent_at.substring(0,10)}</div>

                            <div class="text-white font-bold mb-1">{message.message.subject}</div>
                            <div class="text-white truncate ">{message.message.message}</div>
                        </li>
                    {/each}
                </ul>
            </div>

            <!-- Right side - Selected message -->
            <div class="w-2/3 p-6 text-lg bg-gray-500 border border-gray-400 h-screen">
                {#if selectedMessage}
                    <h2 class="text-white text-2xl font-bold mb-2">{selectedMessage.message.subject}</h2>
                    <hr>
                    <p class="text-white mt-2">{selectedMessage.message.message}</p>
                        <div class="mt-4">
                            <h3 class="text-white font-bold">Attachments:</h3>
                            <ul>
                                {#each selectedMessage.message.attachments as attachment}
                                    <a class="text-white mt-2 mr-2 underline" href="{attachment.url}">{attachment.name}</a>
                                {/each}
                            </ul>
                        </div>
                    {:else}
                    <h2 class="text-white text-xl font-bold">No message selected...</h2>
                {/if}
            </div>
        </div>
    </section>
</div>
</body>



