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


    export let courses
    export let hoverID
    export let selected;

    let open;

    let code_invalid = false;
    $: code_invalid;

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
                                    <a on:click={() => { selected = id}}>
                                        <!-- Color line at the top -->
                                        <div class="absolute top-0 left-0 w-full h-2 bg-{course_color}-500 glow  z-10 group-hover:scale-105 group-hover:top-[-6px] rounded-t-[25px]  "></div>
                                        <div class="absolute group-hover:scale-105 -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-400 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-1500 group-hover:duration-200 "></div>
                                        <div class="">
                                            <div class="relative p-6 bg-gray-700 rounded-xl group-hover:scale-105 transition|local duration-1500 ">
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

