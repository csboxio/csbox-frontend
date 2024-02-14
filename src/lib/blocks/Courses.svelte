<script lang="ts">
    import {goto, invalidateAll} from "$app/navigation";
    import {browser} from "$app/environment";
    import {blur} from "svelte/transition";
    import {page} from "$app/stores";
    import tilt from '$lib/fun/tilt.js';
    import {courseNavStore} from "$lib/stores/stores.ts";
    import Fa from 'svelte-fa/src/fa.svelte';
    import {faAdd} from "@fortawesome/free-solid-svg-icons";
    import {createEventDispatcher} from "svelte";
    import {Modal} from "flowbite-svelte";
    import {deserialize} from "$app/forms";
    import {addNotification} from "../utilities/notifications.js";

    export let courses
    export let hoverID

    /** @type {import('./$types').PageData} */
    export let data;
    let {supabase, claim} = data
    $: ({supabase, claim} = data)

    let joinCourse = false;
    $: courses
    let reverse = false;
    let open;

    let code_invalid = false;
    $: code_invalid;
    let error_message = "Code Invalid.";

    async function handleHideCourse(course_id, pid) {
        console.log($page.data.session?.user.id, pid)
        const {error, data, status} = await $page.data.supabase.rpc('hide_course',
            {_user_id: pid, _course_id: course_id})
        console.log(error, data, status)
        if (status === 200) {
            //delete_model_close();
            await invalidateAll();
        }
        invalidateAll();
    }

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
            joinCourse = false;

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
</script>

<section class="flex flex-col">
    <div>
        <!-- Existing courses menu -->
        {#if courses}
            {#if claim === 'instructor'}
                {#if courses.length > 0}
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
                        <button on:click={() => { joinCourse = true; }}
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
</section>
<div class="container m-4 mx-8">
    <div class="flex flex-wrap -mx-12 -mb-2">
        <!--Each course-->
        {#key courses}
            {#if courses}
                {#each courses as { id, inserted_at, course_image_url, course_title, course_prefix, course_number, course_term, hidden, course_color}, i (id)}
                    {#if !hidden}
                        <div class="relative mb-8 mx-4 cursor-pointer">
                            <div class=" min-w-xs max-w-xs">
                                <div class="relative group">
                                    <a on:click={() => {
                                        $courseNavStore = "Home"
                                           goto(`/d/courses/${id}`)
                                        }}>
                                        <!-- Color line at the top -->
                                        <div class="absolute top-0 left-0 w-full h-2 bg-{course_color}-500 glow  z-10 group-hover:scale-105 group-hover:top-[-6px] rounded-t-[25px]  "></div>
                                        <div class="absolute group-hover:scale-105 -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-400 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-1500 group-hover:duration-200 "></div>
                                        <div class="">
                                            <div class="relative p-6 bg-gray-700 rounded-xl group-hover:scale-105 transition|local duration-1500 ">
                                                {#if course_image_url}
                                                    <img src={course_image_url === '' ? '/favicon.png' : course_image_url + '?t=' + inserted_at} class="relative inline-flex items-center justify-center w-20 h-auto mb-6 rounded-lg drop-shadow-2xl  mr-24" alt='Course Image'/>
                                                    {:else}
                                                    <img src='/favicon.png' class="relative inline-flex items-center justify-center w-20 h-auto mb-6 rounded-lg drop-shadow-2xl  mr-24" alt='Course Image'/>
                                                {/if}
                                                <a on:click|stopPropagation={() => {
                                                    hoverID = i;
                                                    open = true;
                                                }}>
                                                    <div class=" inline-block absolute top-1 right-0 m-5 text-gray-300 hover:text-gray-200">
                                                        <svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                    </div>
                                                </a>
                                                <div class="text-xl text-white font-bold mb-3 "
                                                     style="word-break: break-word;">
                                                    {course_title === '' ? 'Course Name' : course_title}
                                                </div>
                                                <h4 class="text-xl text-white font-bold mb-1"
                                                    style="word-break: break-word;">
                                                    {course_prefix === '' ? 'Empty' : course_prefix}
                                                    {course_number === null ? '' : course_number}
                                                </h4>
                                                <h4 class="text-gray-300 mb-1">{course_term != null ? course_term : ''}</h4>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Setting course menu -->
                        {#if hoverID === i && open && browser}
                            <div transition:blur|local={{ duration: 200 }} id="edit" class="relative z-20">
                                <div class="absolute block rounded-md bg-gray-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div class="text-sm text-gray-900 dark:text-white">
                                        <div class="p-2 truncate font-bold hover:underline  w-24 cursor-pointer"
                                             on:click={() => {
                                                 $courseNavStore = "Settings"
                                                 goto(`/d/courses/${JSON.stringify(courses[i].id)}/settings`)
                                             }}>
                                            Edit
                                        </div>
                                    </div>
                                    <div class="inline-block absolute top-0 right-0 m-2 text-gray-300 hover:text-gray-100 hover:scale-110 cursor-pointer"
                                         on:click|stopPropagation={() => {
                                             open = false;
                                         }}>
                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        {/if}
                    {/if}
                {/each}
            {/if}
        {/key}
    </div>
</div>

{#key courses}
    {#if courses && browser}


        {#if courses.length === 0 && claim === "student"}
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div class="m-auto">
                    <div class="text-center justify-center text-white font-semibold text-2xl">
                        No Courses
                    </div>
                    <div class="text-center justify-center text-gray-200 pt-1 text-sm">
                        Ask your instructor for a join code.
                    </div>
                    <div class="text-center justify-center pt-4">
                        <div class="">
                            <div class="">
                                <button on:click={() => joinCourse = true}
                                        class="ml-0.5 relative inline-flex items-center justify-center p-0.5  mr-2 overflow-hidden text-sm
													font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
													group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
													focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800">
												<span
                                                        class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
													dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
													<div class="inline-block">
														Join
													</div>
												</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}

        {#if courses.length === 0 && claim === "instructor"}
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div class="m-auto text-center justify-center">
                    <div class="text-white font-semibold text-3xl pb-2">
                        No courses
                    </div>
                    <div class="text-gray-300 text-md inline-block">
                        Join a existing course:
                    </div>
                    <a on:click={() => joinCourse = true} class="inline-block text-blue-400 text-md hover:underline cursor-pointer">
                        Join
                    </a>
                    <div class="text-center">
                        <div class="text-gray-300 pt-1 text-md inline-block">
                            Import from LMS:
                        </div>
                        <a on:click={() => goto('/lti/info')}
                           class="inline-block text-red-400 text-md hover:underline cursor-pointer">
                            Learn
                        </a>
                    </div>
                    <div class="text-center justify-center pt-4">

                        <button on:click={() => {goto('/d/courses/create')}}
                                class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm
                                font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
                                group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
                                focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800">
                            <span
                                    class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
                                    dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
                                <div class="inline-block">
                                    Create
                                </div>
                            </span>
                        </button>

                    </div>
                </div>
            </div>
        {/if}
    {/if}
{/key}


<!-- Model for join course -->
<Modal bind:open={joinCourse} class="max-w-xs" title="Join Course">
    <form action="?/joinCourse" class="flex flex-col items-center justify-center h-full" method="POST"
          on:submit|preventDefault={handleSubmit}>
        <div class="text-center justify-center text-gray-200 pt-1 pb-2 text-xs inline-block text-center justify-center">
            After joining, you must be accepted.
        </div>
        <div class="mb-2 p-2">
            <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
            focus:border-primary-600 block  p-2.5 dark:bg-gray-100 dark:border-gray-500 dark:placeholder-gray-400
            dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    id="code" name="code" placeholder="Code" required type="text" />
        </div>
        {#if code_invalid}
            <div class="flex p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                 role="alert">
                <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor"
                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clip-rule="evenodd"></path>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                    <span class="font-medium">Failed!</span> {error_message}
                </div>
            </div>
        {/if}
        <div class="flex items-center justify-between pb-2">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                Submit
            </button>
        </div>
    </form>

</Modal>