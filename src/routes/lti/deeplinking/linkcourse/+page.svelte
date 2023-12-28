<script lang="ts">
    import CoursePicker from "$lib/blocks/CoursePicker.svelte";
    import {goto} from "$app/navigation";

    export let data
    let { supabase, session, deeplinking, claim, lms_user_id} = data
    $: ({ supabase, session, deeplinking, claim, lms_user_id } = data)

    let courses;
    $: courses = data.courses.data;

    let selected;

    async function linkLMSCourse() {
        const response = await fetch('/api/lti/link_lms_course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {'lms_course_id': deeplinking.course.id, 'course_id': selected} )
        })
        console.log(response.json())

    }

    function checkLinkedCourseID() {
        if (!deeplinking || !deeplinking.course || !deeplinking.course.id || !Array.isArray(courses)) {
            return false; // If any required parameters are missing or incorrect, return false
        }

        const courseId = deeplinking.course.id;

        console.log(courseId)
        return courses.some(course => course.lms_course_id === courseId);
    }

    let course_id
    $: course_id = courses.find(course => course.lms_course_id === deeplinking.course.id)?.id;

</script>

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
    <div class="flex justify-center items-center h-screen bg-gray-800">
        <div class="w-full p-8 h-screen mb-12">
            <div class="flex justify-center mb-6 ">
                <img src="/logo-text-white.png" alt="Logo" class="h-12 w-auto">
            </div>
            <section class="flex flex-col items-center space-y-4">
                <h2 class="text-xl block truncate text-sm font-bold text-blue-500 animate-text bg-gradient-to-r from-red-400 via-red-200 to-red-100 bg-clip-text text-transparent text-5xl font-black">No course is linked!</h2>
                <h2 class="text-lg block truncate text-md font-bold text-white">Select a course to link, or create one</h2>
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

                            type="button">
                        Create Course (TODO)
                    </button>
                {/if}
                <div class="px-1">
                    <CoursePicker bind:courses={courses} bind:selected={selected} />
                </div>
            </section>
        </div>
    </div>
{/if}
