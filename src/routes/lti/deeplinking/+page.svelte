<script lang="ts">
	import { page } from '$app/stores';
    import {goto, invalidate, invalidateAll} from "$app/navigation";
    import {faExternalLink} from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa/src/fa.svelte';
    import {applyAction, deserialize} from "$app/forms";
    import CoursePicker from "$lib/blocks/CoursePicker.svelte";
	export let data
	let { supabase, session, claim, lms_user_id, launch} = data
	$: ({ supabase, session, claim, lms_user_id, launch } = data)

    let hoverID;
    $: hoverID;

    let selected;

    async function signOut() {
        try {
            let { error } = await  $page.data.supabase.auth.signOut()
            if (error) throw error
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
        await invalidateAll();
    }

    async function handleSubmit(event) {
        const data = new FormData(this);
        data.append('lms_user_id', launch.userInfo.id)

        const response = await fetch(this.action, {
            method: 'POST',
            body: data
        });

        const result = deserialize(await response.text());

        if (result.type === 'success') {
            await invalidateAll();
            await supabase.auth.signOut()
        }

        applyAction(result);

    }
</script>

<body class="dark:bg-gray-600  bg-gray-100 antialiased bg-body text-body font-body">

    <!--- NO SESSION -->
    {#if !session}
        <div class="flex justify-center items-center h-screen bg-gray-700">
            <div class="max-w-md w-full bg-gray-800 shadow-lg shadow-gray-600 rounded p-8">
                <div class="flex justify-center mb-6">
                    <img src="/logo-text-white.png" alt="Logo" class="h-12 w-auto">
                </div>
                <section class="flex flex-col items-center space-y-4 py-8">
                    <h2 class="text-xl block truncate text-sm font-bold text-blue-500 animate-text bg-gradient-to-r from-blue-400 via-teal-500 to-purple-200 bg-clip-text text-transparent text-5xl font-black">Let's get you logged in!</h2>
                    <button class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            on:click={() => { goto('/lti/auth'); }}>
                        Login
                    </button>
                    <a href="https://csbox.io/auth" target="_blank" class="w-full">
                        <button class="w-full text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-blue-800">
                            I don't have an account...
                            <span class="inline-block align-middle ml-2">
                        <div>
                            <Fa icon={faExternalLink}/>
                        </div>
                    </span>
                        </button>
                    </a>
                </section>
            </div>
        </div>

    {:else}

        <!-- STUDENT -->
        {#if claim !== 'instructor'}
            <h4 class="font-bold dark:text-red-500 tracking-wide leading-7 mb-1">Error: NOT INSTRUCTOR, trying signing out, then signing in. If issue persists contact: support@csbox.io</h4>
                <button class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        type="button" on:click|preventDefault={async () => { await signOut()}}>
                    Signout
                    <span class="inline-block align-middle ml-2">
                </span>
                </button>
            {:else}
            <!-- INSTRUCTOR & HAS LINKED LMS ID-->
            {#if lms_user_id}
                <script type="module">
                window.location.href = '/lti/deeplinking/linkcourse';
                </script>
                <!-- INSTRUCTOR & NOT LINKED LMS USER ID -->
                {:else}
                <div class="flex justify-center items-center h-screen bg-gray-700">
                    <div class="max-w-md w-full bg-gray-800 shadow-lg shadow-gray-600 rounded p-8">
                        <div class="flex justify-center mb-6">
                            <img src="/logo-text-white.png" alt="Logo" class="h-12 w-auto">
                        </div>
                        <section class="flex flex-col items-center space-y-4 py-8">
                            <h2 class="text-xl block truncate text-sm font-bold text-blue-500 animate-text bg-gradient-to-r from-blue-400 via-teal-500 to-purple-200 bg-clip-text text-transparent text-5xl font-black">Link LMS to CSBOX account?</h2>
                            <form method="POST" action="?/link_lms_id" on:submit|preventDefault={handleSubmit}>
                                <button class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                        type="submit">
                                    Yes
                                </button>
                            </form>

                        </section>
                    </div>
                </div>
            {/if}
        {/if}

    {/if}
</body>
