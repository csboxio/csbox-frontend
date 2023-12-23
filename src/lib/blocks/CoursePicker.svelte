<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import { browser } from "$app/environment";
    import { blur } from "svelte/transition";
    import { page } from "$app/stores";
    import tilt from '$lib/fun/tilt.js';
    import {courseNavStore} from "$lib/stores/stores.ts";
    import Fa from 'svelte-fa/src/fa.svelte';
    import {faAdd} from "@fortawesome/free-solid-svg-icons";
    import {createEventDispatcher} from "svelte";
    import {Modal} from "flowbite-svelte";
    import {deserialize} from "$app/forms";
    import {addNotification} from "../utilities/notifications.js";


    export let courses;
    export let selected;

    function handleCourseSelection(id) {
        if (selected === id) {
            selected = null; // Toggle off selection if clicked again
        } else {
            selected = id; // Select the clicked course
        }
    }
</script>

<div class="container m-4 mx-8">
    <div class="flex flex-wrap -mx-12 -mb-2">
        <!--Each course-->
        {#key courses}
            {#if courses}
                {#each courses as { id, inserted_at, course_image_url, course_title, course_prefix, course_number, course_term, hidden, course_color }, i (id)}
                    {#if !hidden}
                        <div class="relative mb-8 mx-4 cursor-pointer">
                            <div class=" min-w-xs max-w-xs">
                                <div class="relative group">
                                    <a on:click={() => { handleCourseSelection(id) }}>
                                        <!-- Color line at the top -->
                                        <div class="">
                                            <!-- Rest of your course box content -->
                                            <div class="relative p-6 bg-gray-700 rounded-xl group-hover:scale-105 transition|local duration-1500 {selected === id ? 'border-2 border-blue-400' : 'border-0'}">
                                                <img src={course_image_url === null ? 'https://dummyimage.com/150x150/000/fff' : course_image_url + '?t=' + inserted_at} class="relative inline-flex items-center justify-center w-20 h-20 mb-6 rounded-lg drop-shadow-2xl  mr-24" alt='Course Image' />
                                                <div class="text-xl text-white font-bold mb-3 " style="word-break: break-word;">
                                                    {course_title === '' ? 'Course Name' : course_title}
                                                </div>
                                                <h4 class="text-xl text-white font-bold mb-1" style="word-break: break-word;">
                                                    {course_prefix === '' ? 'Empty' : course_prefix}
                                                    {course_number}
                                                </h4>
                                                <h4 class="text-gray-300 mb-1">{course_term}</h4>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    {/if}
                {/each}
            {/if}
        {/key}
    </div>
</div>
