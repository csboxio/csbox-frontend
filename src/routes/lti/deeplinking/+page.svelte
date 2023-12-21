<script lang="ts">
	import { page } from '$app/stores';
    import {onMount} from "svelte";
    import {goto, invalidateAll} from "$app/navigation";
    import * as url from "url";
    import {faExternalLink} from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa/src/fa.svelte';
    import DeepLinking from "$lib/lti/DeepLinking.svelte";
    import Settings from "$lib/components/Settings.svelte";
    import Courses from "$lib/blocks/Courses.svelte";

	export let data

	let { supabase, session, deeplinking, claim, lms_user_id} = data
	$: ({ supabase, session, deeplinking, claim, lms_user_id } = data)

    //let courses;
    //$: courses = data.courses.data;
    let hoverID;
    $: hoverID;

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

</script>

<body class="dark:bg-gray-600  bg-gray-100 antialiased bg-body text-body font-body">

    {#if !session}
        <section class="flex justify-center items-center flex-col p-8">
            <h2 class="text-xl font-bold dark:text-white tracking-wide leading-7 mb-4">Hey there! Let's get you logged in!</h2>
            <button class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    on:click={() => { goto('/lti/auth'); }}>
                Login
            </button>
            <a href="https://csbox.io/auth" target="_blank">
                <button class="flex items-center justify-center text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-blue-800">
                    I don't have an account...
                    <span class="inline-block align-middle ml-2">
                <div>
                    <Fa icon={faExternalLink}/>
                </div>
            </span>
                </button>
            </a>
        </section>

    {:else}

        {#if claim === 'student'}
            <h4 class="font-bold dark:text-red-500 tracking-wide leading-7 mb-1">Error: Student role, trying signing out, then signing in. If issue persists contact: support@csbox.io</h4>
                <button class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        type="button" on:click|preventDefault={async () => { await signOut()}}>
                    Signout
                    <span class="inline-block align-middle ml-2">
                </span>
                </button>
            {:else}
            {claim}
            {#if lms_user_id}
                {lms_user_id}
                <section>
                    <div class="pt-3 pb-3 px-8 dark:bg-gray-700 bg-white">
                        <div class="flex flex-wrap items-center justify-between -mx-2">
                            <div class="w-full lg:w-auto px-2 mb-6 lg:mb-0">
                                <h4 class="text-2xl font-bold dark:text-white  tracking-wide leading-7 mb-1">Select Content to Link To LMS</h4>
                                <!--<div class="w-full lg:w-auto px-2" >
                                <a href="https://csbox.io/d" target="_blank">
                                <button class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                        type="button">
                                    CSBOX
                                    <span class="inline-block align-middle ml-2">
                            <div>
                                <Fa icon={faExternalLink}/>
                            </div>
                        </span>
                                </button>
                                </a>
                            </div>
                                -->
                            </div>
                        </div>
                    </div>

                    <!--<div class="px-4">
                    <Courses bind:courses={courses} bind:hoverID={hoverID} bind:data={data}/>
                    </div>-->

                </section>
                {:else}
                No LMS user id
            {/if}
        {/if}

    {/if}
</body>
