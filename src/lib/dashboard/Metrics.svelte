<script lang="ts">
    import Fa from 'svelte-fa/src/fa.svelte';
    import {
        faAngleDown, faAngleUp,
        faBook, faFileCircleExclamation, faFileCircleXmark,
        faPeopleGroup, faUserGraduate
    } from "@fortawesome/free-solid-svg-icons";
    import {page} from "$app/stores";

    let dashboard;
    $: dashboard = $page.data.dashboard;

    let showMore;
    $: showMore = false;
</script>

<!-- Metrics -->
<div class="mb-5">
    <div class="flex flex-wrap -mx-3 -mb-6">
        <!-- Number of courses -->
        <div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6 ">
            <div class="max-w-sm mx-auto py-8 px-6 bg-gray-500 rounded-xl drop-shadow-xl">
                <div class="max-w-xs mx-auto text-center">
                    <div class="flex mx-auto w-12 h-12 mb-4 items-center justify-center bg-blue-500 bg-opacity-20 text-blue-500 rounded-xl">
                        <Fa icon={faBook} size="lg"></Fa>
                    </div>
                    <span class="text-xs text-gray-300 font-semibold">Courses</span>
                    {#if dashboard}
                        <h4 class="text-2xl leading-8 text-gray-100 font-semibold mb-4">{dashboard[0].num_courses}</h4>
                    {/if}
                </div>
            </div>
        </div>

        <!-- Number of students -->
        <div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6 ">
            <div class="max-w-sm mx-auto py-8 px-6 bg-gray-500 rounded-xl drop-shadow-xl">
                <div class="max-w-xs mx-auto text-center">
                    <div class="flex mx-auto w-12 h-12 mb-4 items-center justify-center bg-blue-500 bg-opacity-20 text-blue-500 rounded-xl">
                        <Fa icon={faPeopleGroup} size="lg"></Fa>
                    </div>
                    <span class="text-xs text-gray-300 font-semibold">Students </span>
                    {#if dashboard}
                        <h4 class="text-2xl leading-8 text-gray-100 font-semibold mb-4">{dashboard[0].total_num_people}</h4>
                    {/if}
                </div>
            </div>
        </div>

        <!-- Number of missing assignments -->
        <div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6 ">
            <div class="max-w-sm mx-auto py-8 px-6 bg-gray-500 rounded-xl drop-shadow-xl">
                <div class="max-w-xs mx-auto text-center">
                    <div class="flex mx-auto w-12 h-12 mb-4 items-center justify-center bg-blue-500 bg-opacity-20 text-blue-500 rounded-xl">
                        <Fa icon={faFileCircleXmark} size="lg"></Fa>
                    </div>
                    <span class="text-xs text-gray-300 font-semibold">Missing Assignments</span>
                    {#if dashboard}
                        <h4 class="text-2xl leading-8 text-gray-100 font-semibold mb-4">{dashboard[0].total_num_missing}</h4>
                    {/if}
                </div>
            </div>
        </div>

        <!-- Average grade -->
        <div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6 ">
            <div class="max-w-sm mx-auto py-8 px-6 bg-gray-500 rounded-xl drop-shadow-xl">
                <div class="max-w-xs mx-auto text-center">
                    <div class="flex mx-auto w-12 h-12 mb-4 items-center justify-center bg-blue-500 bg-opacity-20 text-blue-500 rounded-xl">
                        <Fa icon={faUserGraduate} size="lg"></Fa>
                    </div>
                    <span class="text-xs text-gray-300 font-semibold">Average Grade</span>
                    {#if dashboard}
                        <h4 class="text-2xl leading-8 text-gray-100 font-semibold mb-4">{dashboard[0].avg_avg_grade}%</h4>
                    {/if}
                </div>
            </div>
        </div>
    </div>

    <!-- Show more button -->
    <div class="text-center justify-center flex mt-4 mx-auto">
        <div>
            <button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
		focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600
		dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" on:click={() => {showMore = !showMore;}}>
                <div class="inline-block">{showMore === true ? 'Hide' : 'More'}</div>
                {#if showMore}
                    <div class="inline-block ml-2"><Fa icon={faAngleUp} size="lg"></Fa></div>
                {:else}
                    <div class="inline-block ml-2"><Fa icon={faAngleDown} size="lg"></Fa></div>
                {/if}
            </button>
        </div>
    </div>

    <!-- Show more -->
    {#if showMore}
        <div class="flex flex-wrap -mx-3 -mb-6 mt-2">
            <div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6 ">
                <div class="max-w-sm mx-auto py-8 px-6 bg-gray-500 rounded-xl drop-shadow-xl">
                    <div class="max-w-xs mx-auto text-center">
                        <div class="flex mx-auto w-12 h-12 mb-4 items-center justify-center bg-blue-500 bg-opacity-20 text-blue-500 rounded-xl">
                            <Fa icon={faFileCircleExclamation} size="lg"></Fa>
                        </div>
                        <span class="text-xs text-gray-300 font-semibold">Assignments Ungraded</span>
                        <h4 class="text-2xl leading-8 text-gray-100 font-semibold mb-4">{dashboard[0].total_num_ungraded}</h4>
                    </div>
                </div>
            </div>

            <div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6 ">
                <div class="max-w-sm mx-auto py-8 px-6 bg-gray-500 rounded-xl drop-shadow-xl">
                    <div class="max-w-xs mx-auto text-center">
                        <div class="flex mx-auto w-12 h-12 mb-4 items-center justify-center bg-blue-500 bg-opacity-20 text-blue-500 rounded-xl">
                            <Fa icon={faFileCircleXmark} size="lg"></Fa>
                        </div>
                        <span class="text-xs text-gray-300 font-semibold">Assignments Late</span>
                        <h4 class="text-2xl leading-8 text-gray-100 font-semibold mb-4">{dashboard[0].total_num_late}</h4>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>