<script>
    import Navbar from '$lib/components/Navbar.svelte';
    import Settings from '$lib/components/Settings.svelte';
    import {page} from '$app/stores';
    import '$lib/quilljs.css';
    import {browser} from "$app/environment";
    import Fa from 'svelte-fa/src/fa.svelte';
    import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
    import {afterUpdate, onMount, tick} from "svelte";
    import WorkspaceNav from "$lib/workspaces/components/WorkspaceNav.svelte";


    let healthcheck;
    $: healthcheck = $page.data.health_check

    export let data

    let { supabase, claim, user } = data
    $: ({ supabase, claim, user } = data)

    let pathname = '';
    let extractedName;

    function extractNameFromPath() {
        pathname = $page.url.pathname;
        const pathnameParts = pathname.split("/");
        if (pathnameParts.length > 3) {
            return pathnameParts[3].charAt(0).toUpperCase() + pathnameParts[3].substring(1)
        }
    }

    afterUpdate(() => {
        extractedName = extractNameFromPath();
    });
</script>

<body class="dark:bg-gray-600 bg-gray-300 antialiased bg-body text-body font-body">
<div>
    <Navbar bind:claim={claim}/>
    <div class="mx-auto lg:ml-16">
        <section>
            <div class="sm:py-3 py-1 px-8 dark:bg-gray-700 bg-white">
                <div class="flex flex-wrap items-center justify-between -mx-2">
                    <div class="lg:w-auto px-2 my-1 sm:my-2  ">
                        {#if browser}
                            <h4 class="text-lg font-bold font-bold dark:text-white leading-7 mb-1 inline-block inline-block">Workspaces</h4>
                            <div class="inline-block dark:text-white text-black">
                                <Fa icon={faArrowRight} size="xs" />
                            </div>

                            {#key extractedName}
                                <h4 class="text-lg font-bold dark:text-white text-black leading-7 mb-1 inline-block"> {extractedName}</h4>
                            {/key}
                        {/if}
                    </div>
                    <div class="lg:w-auto px-2">
                        <Settings bind:user={user.data} bind:supabase={supabase} />
                    </div>
                </div>
            </div>
        </section>
        <div class="flex flex-row ">
            <aside class="h-screen sticky top-0">
                <WorkspaceNav healthcheck={healthcheck}/>
            </aside>
            <slot />
        </div>
    </div>
</div>
</body>
