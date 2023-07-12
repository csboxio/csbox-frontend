<script>
    import WorkspaceNav from "$lib/components/WorkspaceNav.svelte";
    import Navbar from '$lib/components/Navbar.svelte';
    import Settings from "$lib/components/Settings.svelte";
    import {redirect} from "@sveltejs/kit";

    /** @type {import('./$types').PageData} */
    export let data

    let { supabase, session, user } = data
    $: ({ supabase, session, user } = data)

    let instances = [];
    $: {
        if (data && data.instances && data.instances.data) {
            instances = data.instances.data;
        } else {
            instances = [];
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



<div class="mx-auto lg:ml-16">
    <Navbar />
    <section>
        <div class="pt-3 pb-3 px-8 bg-gray-700">
            <div class="flex flex-wrap items-center justify-between -mx-2">
                <div class="w-full lg:w-auto px-2 mb-6 lg:mb-0">
                    <h4 class="text-lg font-bold dark:text-white leading-7 mb-1 inline-block text-gray-100 inline-block">{course.course_title}</h4>
                </div>
                <div class="w-full lg:w-auto px-2">
                    <div class="sm:flex items-center">
                        <div class="w-full sm:w-auto mb-6 sm:mb-0 sm:mr-4">

                        </div>
                        <Settings bind:data={data}/>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<div class="flex flex-row ">
    <aside class="h-screen sticky top-0">
        <WorkspaceNav {instances}/>
    </aside>
    <div class="w-full">
        <slot/>
    </div>
</div>

