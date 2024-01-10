<script lang="ts">
    import CoursePicker from "$lib/blocks/CoursePicker.svelte";
    import {goto, invalidate, invalidateAll} from "$app/navigation";
    import {page} from "$app/stores";
    import {Accordion, AccordionItem} from "flowbite-svelte";

    export let data
    let { supabase, session, launch, claim, lms_user_id} = data
    $: ({ supabase, session, launch, claim, lms_user_id } = data)

    let courses;
    $: courses = data.courses.data;

    let selected;

    async function linkLMSCourse() {
        const response = await fetch('/api/lti/link_lms_course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {'lms_course_id': launch.course.id, 'lms_user_id': launch.userInfo.id, 'course_id': selected} )
        })

        await invalidateAll()
    }

    async function createLMSCourse() {
        const course = {
            _inserted_at: new Date(),
            _user_id: $page.data.session.user.id,
            _lms_user_id: launch.userInfo.id,
            _lms_course_id:  launch.launchInfo.context.id,
            _course_title: launch.launchInfo.context.title,
            _course_prefix: launch.launchInfo.context.label,
            _course_contact: launch.userInfo.email,
        }


        const response = await fetch('/api/lti/create_lms_course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { course: course } )
        })

        await invalidateAll()
    }


    function checkLinkedCourseID() {
        // launch.launchInfo.context.id is the course id from the LMS
        if (!launch || !launch.launchInfo.context|| !launch.launchInfo.context.id || !Array.isArray(courses)) {
            return false;
        }

        const courseId = launch.launchInfo.context.id;

        return courses.some(course => course.lms_course_id === courseId);
    }

    let check_linked = checkLinkedCourseID();
    $: check_linked = checkLinkedCourseID()

    let course_id
    $: course_id = courses.find(course => course.lms_course_id === launch.launchInfo.context.id)?.id;


    let show_existing_courses
    $: show_existing_courses = false;
</script>

{#key check_linked}
{#if checkLinkedCourseID()}
    <div class="flex justify-center items-center h-screen bg-gray-700">
        <div class="max-w-md w-full bg-gray-800 shadow-lg shadow-gray-600 rounded p-8">
            <div class="flex justify-center mb-6">
                <img src="/logo-text-white.png" alt="Logo" class="h-12 w-auto">
            </div>
            <section class="flex flex-col items-center space-y-4 py-8">
                <h2 class="text-xl block truncate text-sm font-bold text-blue-500 animate-text bg-gradient-to-r from-blue-400 via-teal-500 to-purple-200 bg-clip-text text-transparent text-5xl font-black">Link course resources</h2>
                    <button class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            type="submit"
                    on:click={() => goto(`/lti/deeplinking/${course_id}/assignments`)}>
                        Assignments
                    </button>
            </section>
        </div>
    </div>
{:else}
    <div class="flex justify-center items-center h-full bg-gray-800 overflow-y-hidden mb-2">
        <div class="w-full p-8 h-screen mb-12">
            <div class="flex justify-center mb-6 ">
                <img src="/logo-text-white.png" alt="Logo" class="h-12 w-auto">
            </div>
            <section class="flex flex-col items-center space-y-4">
                <h2 class="text-xl block truncate text-sm font-bold text-blue-500 animate-text bg-gradient-to-r from-red-400 via-red-200 to-red-100 bg-clip-text text-transparent text-5xl font-black">No course found!</h2>
                {#if selected}
                    <button
                            class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            on:click={() => { linkLMSCourse() }}
                            type="button">
                        Link Course
                    </button>
                {:else}
                    <button
                            class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            on:click={() => { createLMSCourse() }}
                            type="button">
                        Create Course
                    </button>
                {/if}
                <Accordion>
                    <AccordionItem>
                        <span slot="header">Existing Unlinked Courses</span>
                        <p class="mb-2 text-gray-400 dark:text-gray-400">Select a course below to link to LMS.</p>

                        <div class="px-1">
                            <CoursePicker bind:courses={courses} bind:selected={selected} />
                        </div>
                    </AccordionItem>
                </Accordion>

            </section>
        </div>
    </div>
{/if}
{/key}