<script lang="ts">
    import Settings from "$lib/components/Settings.svelte"
    import Navbar from "$lib/components/Navbar.svelte"
    import {page} from "$app/stores";
    import CourseNav from "$lib/components/CourseNav.svelte";
    let model;
    export let data;
    let course_data = data.courseData

    let assignments = [ {id: '123', inserted_at: '1/1/2000', message:'First Python Assignment', user_id:'123-123-123', course_id:'123'} ]
</script>

<div class="flex flex-row">
    <section class="p-1">
        <div class="container mx-12 my-5">
            <h4 class="text-xl font-bold text-white -mx-10 my-5">Assignments</h4>


            <div class="flex flex-wrap -mx-10 -mb-6 text-white font-semibold">

                {#each assignments as {id, inserted_at, message, user_id, course_id }, i}
                    <a href="" data-sveltekit-preload-data="hover">
                        <div class="mb-8">
                            <div class="min-w-xs max-w-xs ">
                                <div class="relative group ">
                                    <div class="absolute group-hover:scale-105 -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-400 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-1500 group-hover:duration-200"></div>
                                    <div>
                                        <div class="relative p-6 bg-gray-700 rounded-xl group-hover:scale-105 transition|local duration-1500">
                                            <h4 class="text-base text-white font-bold">{message === "" ? "assignment" : message}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                {/each}
                <!--No courses found-->
                {#if assignments.length === 0}
                    <div class="flex p-4 mb-12 mt-6 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                        <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Info</span>
                        <div>
                            <span class="font-medium">No assignments found...</span>
                        </div>
                    </div>
                {/if}

            </div>
        </div>

                <a href="">
                    <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-300 to-blue-500 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800">
  <span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
      Create
  </span>
                    </button>
                </a>

    </section>
</div>
