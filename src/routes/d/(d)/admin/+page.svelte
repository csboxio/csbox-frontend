<script lang="ts">
    import Settings from "$lib/components/Settings.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import {navStore} from "../../../../lib/stores/stores.js";
    import {onMount} from "svelte";
    import '$lib/styles/calendar.css'

    import AdminNav from "$lib/components/AdminNav.svelte";
    export let data

    let { supabase, session, user, claim } = data
    $: ({ supabase, session, user, claim } = data)


    onMount(() => {
        // Set the selected item when the page is mounted
        navStore.set('admin');
    });


</script>

<body class="bg-gray-600 antialiased bg-body text-body font-body">

<!-- Nav bar on the left of the screen-->
<Navbar/>

<div class="mx-auto lg:ml-16">

    <!-- Top bar of settings -->
    <section>
        <div class="pt-3 pb-3 px-8 dark:bg-gray-700 bg-white">
            <div class="flex flex-wrap items-center justify-between -mx-2">
                <div class="w-full lg:w-auto px-2 mb-6 lg:mb-0">
                    <h4 class="text-2xl font-bold dark:text-white  tracking-wide leading-7 mb-1">Admin</h4>
                </div>
                <div class="w-full lg:w-auto px-2">
                    <Settings bind:data={data}/>
                </div>
            </div>
        </div>
    </section>


    <div class="flex min-h-screen">

        <!-- Work space navigation -->
        <aside class="h-screen sticky top-0 inline-block" >
            <AdminNav />
        </aside>
        <!-- Content -->
        <section class="flex flex-col p-8 inline-block w-full">

            <div class="relative overflow-x-auto  sm:rounded-lg w-full">
            </div>
        </section>

    </div>
</div>
</body>

