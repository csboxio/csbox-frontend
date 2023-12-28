<script>
    import CourseNav from '$lib/components/CourseNav.svelte';
    import Navbar from '$lib/components/Navbar.svelte';
    import Settings from '$lib/components/Settings.svelte';
    import {page} from '$app/stores';
    import '$lib/quilljs.css';
    import {browser} from "$app/environment";
    import Fa from 'svelte-fa/src/fa.svelte';
    import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
    import {afterUpdate, onMount, tick} from "svelte";
    import WorkspaceNav from "$lib/components/WorkspaceNav.svelte";


    let active_workspaces;
    $: active_workspaces = data.active_workspaces;

    let healthcheck;
    $: healthcheck = $page.data.health_check

    export let data

    let { supabase, claim } = data
    $: ({ supabase, claim } = data)

    let pathname = '';
    let extractedName;

    let user = $page.data.user;


    function extractNameFromPath() {
        pathname = $page.url.pathname;
        const pathnameParts = pathname.split("/");
        if (pathnameParts.length > 3) {
            return pathnameParts[3].charAt(0).toUpperCase() + pathnameParts[3].substring(1)
        }
    }

    extractedName = extractNameFromPath();
</script>

<body class="bg-gray-600 antialiased bg-body text-body font-body">
<div>
    <Navbar bind:claim={claim}/>
    <div class="mx-auto lg:ml-16">
        <section>
            <div class="pt-3 pb-3 px-8 dark:bg-gray-700 bg-white">
                <div class="flex flex-wrap items-center justify-between -mx-2">
                    <div class="w-full lg:w-auto px-2 mb-6 lg:mb-0">
                        <h4 class="text-lg font-bold dark:text-white text-black leading-7 mb-1 inline-block text-gray-100 inline-block">Workspaces</h4>
                        <div class="inline-block dark:text-white text-black">
                            <Fa icon={faArrowRight} size="xs" />
                        </div>

                            <h4 class="text-lg font-bold dark:text-white   leading-7 mb-1 inline-block"> {extractedName}</h4>

                    </div>
                    <div class="w-full lg:w-auto px-2">
                        <Settings bind:user={user} bind:supabase={supabase} />
                    </div>
                </div>
            </div>
        </section>
        <div class="flex flex-row ">
            <aside class="h-screen sticky top-0">
                <WorkspaceNav active_workspaces={active_workspaces} healthcheck={healthcheck}/>
            </aside>
            <slot />
        </div>
    </div>
</div>
</body>
