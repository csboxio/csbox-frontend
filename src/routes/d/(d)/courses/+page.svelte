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
    let {supabase, claim} = data
    $: ({supabase, claim} = data)

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

            //addNotification(newNotification, supabase, $page.data.session.user)
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
        <div class="sm:py-3 py-1 px-8 dark:bg-gray-700 bg-white">
            <div class="flex flex-wrap items-center justify-between -mx-2">
                <div class="lg:w-auto px-2 my-1 sm:my-2  ">
                    <h4 class="text-2xl font-bold dark:text-white  tracking-wide leading-7 mb-1">Courses</h4>
                </div>
                <div class=" lg:w-auto px-2">
                    <Settings bind:supabase={supabase} bind:user={user.data}/>
                </div>
            </div>
        </div>
    </section>

    <section class="flex flex-col p-5 h-screen dark:bg-gray-600 bg-gray-200">
        <Courses bind:courses={courses} bind:data={data} bind:hoverID={hoverID}/>
    </section>
</div>
</body>