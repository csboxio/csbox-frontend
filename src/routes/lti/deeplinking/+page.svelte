<script lang="ts">
	import { page } from '$app/stores';
    import {goto, invalidate, invalidateAll} from "$app/navigation";
    import {faExternalLink} from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa/src/fa.svelte';
    import {applyAction, deserialize} from "$app/forms";
    import {browser} from "$app/environment";
    import Courses from "$lib/blocks/Courses.svelte";
    import CoursePicker from "$lib/blocks/CoursePicker.svelte";
	export let data
	let { supabase, session, deeplinking, claim, lms_user_id} = data
	$: ({ supabase, session, deeplinking, claim, lms_user_id } = data)

    let courses;
    $: courses = data.courses.data;
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

    async function handleSubmit(event) {
        const data = new FormData(this);
        console.log(deeplinking.user_id)
        data.append('lms_user_id', deeplinking.user_id)

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

    function checkLinkedCourseID() {
        if (!deeplinking || !deeplinking.course || !deeplinking.course.id || !Array.isArray(courses)) {
            return false; // If any required parameters are missing or incorrect, return false
        }

        const courseId = deeplinking.course.id;

        console.log(courseId)
        return courses.some(course => course.lms_course_id === courseId);
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
                {#if checkLinkedCourseID()}
                    <section>
                        <div class="pt-3 pb-3 px-8 dark:bg-gray-700 bg-white">
                            <div class="flex flex-wrap items-center justify-between -mx-2">
                                <div class="w-full lg:w-auto px-2 mb-6 lg:mb-0">
                                    <h4 class="text-2xl font-bold dark:text-white  tracking-wide leading-7 mb-1">Select Content to Link To LMS</h4>

                                </div>
                            </div>
                        </div>

                    </section>
                {:else}
                    <div class="flex justify-center items-center h-screen bg-gray-700">
                        <div class=" w-full bg-gray-800 shadow-lg shadow-gray-600 rounded p-8">
                            <div class="flex justify-center mb-6">
                                <img src="/logo-text-white.png" alt="Logo" class="h-12 w-auto">
                            </div>
                            <section class="flex flex-col items-center space-y-4 py-8">
                                <h2 class="text-xl block truncate text-sm font-bold text-blue-500 animate-text bg-gradient-to-r from-red-400 via-red-200 to-red-100 bg-clip-text text-transparent text-5xl font-black">No course is linked!</h2>
                                <h2 class="text-lg block truncate text-md font-bold text-white ">Link a existing course, or create one!</h2>
                                <div class="px-1">
                                <CoursePicker bind:courses={courses} />
                                </div>
                            </section>
                        </div>
                    </div>
                {/if}
                <!-- INSTRUCTOR & NOT LINKED LMS ID -->
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
