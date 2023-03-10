<script lang="ts">
    import {applyAction, deserialize} from "$app/forms";
    import {invalidateAll} from "$app/navigation";
    import {getSupabase} from "@supabase/auth-helpers-sveltekit";
    import { supabaseClient } from "$lib/utilities/supabaseClient";
    import { blur } from 'svelte/transition'
    import {browser} from "$app/environment";

    let model;
    export let data;
    export let show_create_box;
    let loading;
    let assignments;
    $: assignments = data.assignmentData

    function show_box() {
        show_create_box = true;
    }

    function close_box() {
        show_create_box = false;
    }

    let course_data = data.courseData

    let open = false;


    async function handleSubmit(event) {
        loading = true;
        const data = new FormData(this);


        const response = await fetch(this.action, {
            method: 'POST',
            body: data,
            headers: {
                'x-sveltekit-action': 'true',
                'cache-control': 'max-age=3600'
            }
        });

        const result = deserialize(await response.text());

        if (result.type === 'success') {
            // re-run all `load` functions, following the successful update
            close_box()
            await invalidateAll();
        }

        await applyAction(result);
    }


    let hoverID;
    $: hoverID;

    async function handleDeleteAssignment(cid) {
        console.log("clicked", cid)
        open = false;
        const { error, status } = await supabaseClient.from("assignments")
            .delete()
            .match({"id": cid})
        if (status === 204) {
            open = false;
            await invalidateAll();
        }
    }

    function hover(h) {
        hoverID = h
    }

    let left = 950;
    let top = 200;

    function dragMe(node) {
        let moving = false;

        if (browser) {
            // Window scrolling Y changing saves state when close and open.
            top = top + window.scrollY

            node.style.position = 'absolute';
            node.style.top = `${top}px`;
            node.style.left = `${left}px`;
            node.style.cursor = 'move';
            node.style.userSelect = 'none';

            node.addEventListener('mousedown', () => {
                moving = true;
            });

            window.addEventListener('mousemove', (e) => {
                if (moving) {
                    console.log(window.devicePixelRatio)
                    // devicePixelRatio fixes zoomed in browser movement.
                    left += e.movementX / window.devicePixelRatio;
                    top += e.movementY / window.devicePixelRatio;
                    node.style.top = `${top}px`;
                    node.style.left = `${left}px`;
                }
            });

            window.addEventListener('mouseup', () => {
                moving = false;
            });
        }

    }
</script>


<div class="flex flex-row">
    <section class="p-1">
        <div class="container mx-1 my-8">
            <h4 class="text-xl font-bold text-white -mx-auto my-5">Assignments</h4>
            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
                    on:click={show_box}>
                <span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
                  Create
              </span>
            </button>
            <div class="flex flex-col -mx-20 my-2 pl-14 -mb-6 text-white font-semibold delay-50">
                {#each assignments as {id, assignment_title, category, desc}, i}
                        <div transition:blur="{{duration: 200}}" class="mb-6 mx-6">
                            <div id = {id} class="max-w-2xl min-w-xl min-h-xs max-h-xs">
                                <div class="relative group ">
                                    <div class="absolute group-hover:scale-105 -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-400 rounded-lg blur opacity-0 group-hover:opacity-30 {hoverID === i && open ? 'opacity-30 scale-105' : ''} transition duration-1500 group-hover:duration-200"></div>
                                    <div>
                                        <div class="relative p-5 bg-gray-700 rounded-xl group-hover:scale-105 transition|local duration-1500">
                                            <a data-sveltekit-preload-data="hover">
                                            <h4 class="text-base text-white font-bold">{assignment_title === "" ? "No title found..." : assignment_title}</h4>
                                            <!--Popup-->
                                                <div class="inline-block absolute top-0 right-0 m-5 text-gray-300 hover:text-gray-100 hover:scale-105"
                                                     href="#"
                                                     on:click={() => { hoverID = i; open = true; }}>
                                                    <svg width="24" height="24" viewbox="0 0 24 24" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                                              stroke="currentColor" stroke-width="2"
                                                              stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                                                              stroke="currentColor" stroke-width="2"
                                                              stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                                                              stroke="currentColor" stroke-width="2"
                                                              stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {#if hoverID === i && open && browser}
                                    <div transition:blur="{{duration: 200}}" id="edit" class="relative  w-1/2 bottom-16 left-[105%]">
                                       <div class="absolute block rounded-md bg-gray-500 z-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div class="text-sm text-gray-900 dark:text-white">
                                            <div class="p-2 truncate font-bold hover:underline hover:bg-gray-700 w-24 ">Edit</div>
                                            <div class="p-2 truncate font-bold hover:underline hover:bg-gray-700 hover:text-red-400" on:click={handleDeleteAssignment(id)}>Delete</div>
                                        </div>
                                        <div class="inline-block absolute top-0 right-0 m-2 text-gray-300 hover:text-gray-100 hover:scale-110"
                                             href="#"
                                             on:click={() => { open = false; }}>
                                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                      clip-rule="evenodd"></path>
                                            </svg>
                                        </div>

                                    </div>
                                    </div>
                                {/if}
                            </div>
                        </div>

                {/each}
                <!--No courses found-->
                {#if assignments.length === 0}
                    <div class="flex p-4 mb-12 mt-6 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                         role="alert">
                        <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor"
                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                  clip-rule="evenodd"></path>
                        </svg>
                        <span class="sr-only">Info</span>
                        <div>
                            <span class="font-medium">No assignments found...</span>
                        </div>
                    </div>
                {/if}

            </div>
        </div>
    </section>
</div>


{#if show_create_box}
    <!-- Main modal -->
    <div use:dragMe class="z-1000 fixed top-1/2 left-1/2 ">
        <div class="relative p-4 w-full max-w-2xl h-full md:h-auto ">
            <!-- Modal content -->
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-700 sm:p-5 ">
                <!-- Modal header -->
                <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Add Assignment
                    </h3>
                    <button type="button" on:click={close_box}
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="defaultModal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clip-rule="evenodd"></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <form method="POST" action="?/createAssignment" on:submit|preventDefault={handleSubmit}>
                    <div class="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label for="name"
                                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" name="name" id="name"
                                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                   placeholder="Type assignment name" required="">
                        </div>

                        <div>
                            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <select name="category" id="category"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option selected="">Select category</option>
                                <option value="Assignment">Assignment</option>
                                <option value="Quiz">Quiz</option>
                                <option value="Project">Project</option>
                            </select>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="description"
                                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea name="description" id="description" rows="4"
                                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      placeholder="Write assignment description here"></textarea>
                        </div>
                    </div>
                    <button type="submit"
                            class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                  clip-rule="evenodd"></path>
                        </svg>
                        Add new assignment
                    </button>
                </form>
            </div>
        </div>
    </div>
{/if}





