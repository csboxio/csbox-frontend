<script lang="ts">
    import Settings from "$lib/components/Settings.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import {page} from "$app/stores";
    import {goto, invalidateAll} from "$app/navigation";
    import {deserialize} from "$app/forms";
    import {Modal} from "flowbite-svelte";
    import Courses from "$lib/blocks/Courses.svelte";
    import {addNotification} from "../../../../lib/utilities/notifications.js";
    import {onMount} from "svelte";
    import {navStore} from "../../../../lib/stores/stores.js";

    let defaultModel = false;

    /** @type {import('./$types').PageData} */
    export let data;
    let { supabase, claim } = data
    $: ({ supabase, claim } = data)

    let courses;
    $: courses = data.courses.data;

    let user;
    $: user = $page.data.user

    let hoverID;
    $: hoverID;
    let open = false;
    export let show_create_box;

    let code_invalid = false;
    $: code_invalid;
    let error_message = "Code Invalid.";

    async function handleSubmit(event) {
        const data = new FormData(this);
        const response = await fetch(this.action, {
            method: 'POST',
            body: data
        });
        const result = deserialize(await response.text());
        invalidateAll();
        if (result?.data.data === "Enrollment successful") {
            invalidateAll();
            defaultModel = false;

            const newNotification =
                {
                    title: "Enrolled! 🥳",
                    message: "Wait for your instructor to accept you."
                };

            addNotification(newNotification, supabase, $page.data.session.user)
        }
        if (result?.data.error !== null) {
            if (result?.data.error.message === "Already Enrolled") {
                error_message = "Already Enrolled.";
                code_invalid = true;
            } else if (result?.data.error.message === "Enrollment unsuccessful") {
                error_message = "Code invalid.";
                code_invalid = true;
            }
        }
    }

    onMount(() => {
        // Set the selected item when the page is mounted
        navStore.set('courses');
    });
</script>

<body class="bg-gray-600 antialiased bg-body text-body font-body overflow-y-hidden">
<Navbar/>
<div class="mx-auto lg:ml-16">
    <section>
        <div class="pt-3 pb-3 px-8 dark:bg-gray-700 bg-white">
            <div class="flex flex-wrap items-center justify-between -mx-2">
                <div class="w-full lg:w-auto px-2 mb-6 lg:mb-0">
                    <h4 class="text-2xl font-bold dark:text-white  tracking-wide leading-7 mb-1">Courses</h4>
                </div>
                <div class="w-full lg:w-auto px-2">
                    <Settings bind:user={user.data} bind:supabase={supabase} />
                </div>
            </div>
        </div>
    </section>

    <section class="flex flex-col p-5 h-screen dark:bg-gray-600 bg-gray-200">

        <div>
        {#if courses}
        {#if claim === 'instructor'}
            {#if courses.length > 0}
                <!-- TODO LTI BUTTON MOVE SOMEWHERE BETTER
                <div class="inline-block">
                    <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-yellow-400 group-hover:from-red-500 group-hover:to-yellow-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-yellow-200 dark:focus:ring-yellow-700"
                            on:click={() => { goto('/lti/info')} }>
                <span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
                    LTI
                </span>
                    </button>
                </div> -->
            <div class="inline-block">
            <a>
                <button on:click={() => goto("/d/courses/create")}
                        class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-300 to-blue-500 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800">
						<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
							Create
						</span>
                </button>
            </a>
            </div>
            {/if}
        {/if}
            {#if courses.length > 0}
                <div class="inline-block">
                <a>
                    <button on:click={() => goto("/d/courses/join")}
                            class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-300 to-blue-500 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800">
						<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
							Join
						</span>
                    </button>
                </a>
                </div>
            {/if}
        {/if}
        </div>
        <Courses bind:courses={courses} bind:hoverID={hoverID} bind:data={data}/>
    </section>
</div>

</body>