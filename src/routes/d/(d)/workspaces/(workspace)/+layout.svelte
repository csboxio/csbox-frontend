<script>
    import WorkspaceNav from "$lib/components/WorkspaceNav.svelte";
    import Navbar from '$lib/components/Navbar.svelte';
    import Settings from "$lib/components/Settings.svelte";
    import {redirect} from "@sveltejs/kit";
    import {afterUpdate, onMount} from "svelte";

    /** @type {import('./$types').PageData} */
    export let data

    let { supabase, session, user } = data
    $: ({ supabase, session, user } = data)

    let active_workspaces = [];
    onMount(() => {
        const storedWorkspaces = localStorage.getItem('active_workspaces');
        if (storedWorkspaces) {
            active_workspaces = JSON.parse(storedWorkspaces);
        }
        updateActiveWorkspaces()
    });

    afterUpdate(() => {
        localStorage.setItem('active_workspaces', JSON.stringify(active_workspaces));
    });

    function updateActiveWorkspaces(newWorkspaces) {
        active_workspaces = newWorkspaces;
    }



    $: {
        if (data && data.active_workspaces && data.active_workspaces.data) {
            active_workspaces = data.active_workspaces.data;
        } else {
            active_workspaces = [];
        }
    }

    $: {
        if (data === null) {
            // Handle error case when data is null
            console.error('Error: Data is null.');
            // Display an error message to the user or take any other necessary actions
        }
    }
</script>


<body class="bg-gray-600 antialiased bg-body text-body font-body">
<div >
    <Navbar />
    <div class="mx-auto lg:ml-16">
        <section>
            <div class="pt-3 pb-3 px-8 dark:bg-gray-700 bg-white">
                <div class="flex flex-wrap items-center justify-between -mx-2">
                    <div class="w-full lg:w-auto px-2 mb-6 lg:mb-0">
                        <h4 class="text-lg font-bold dark:text-white leading-7 mb-1 inline-block text-gray-100 inline-block">Workspaces</h4>
                    </div>
                    <div class="w-full lg:w-auto px-2">
                        <Settings bind:data={data} />
                    </div>
                </div>
            </div>
        </section>
        <div class="flex flex-row ">
            <aside class="h-screen sticky top-0">
                <WorkspaceNav {active_workspaces} />
            </aside>
            <div class="w-full">
            <slot />
            </div>
        </div>
    </div>
</div>
</body>

