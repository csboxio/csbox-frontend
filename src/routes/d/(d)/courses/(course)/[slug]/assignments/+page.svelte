<script lang="ts">
    import {applyAction, deserialize} from '$app/forms';
    import {goto, invalidate, invalidateAll} from "$app/navigation";
    import {browser} from '$app/environment';
    import {Datepicker} from 'svelte-calendar';
    import {dragMe} from '$lib/utilities/dragMe.ts'

    import {
        Accordion, AccordionItem,
        Button, Modal,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        TableSearch
    } from "flowbite-svelte";

    import dayjs from 'dayjs';
    import {page} from "$app/stores";
    import {theme} from "$lib/dates/theme.js";
    import {addNotification} from "../../../../../../../lib/utilities/notifications.js";
    import {onMount} from "svelte";
    import {navStore} from "../../../../../../../lib/stores/stores.js";
    import Fa from 'svelte-fa/src/fa.svelte';
    import {
        faAdd, faCheckCircle,
        faCircleCheck, faCircleXmark,
        faGear,
        faLayerGroup,
        faObjectGroup,
        faPencil,
        faTable
    } from "@fortawesome/free-solid-svg-icons";
    import GroupAccordionBody from "$lib/components/Course/assignments/GroupAccordionBody.svelte";
    import GroupAccordion from "$lib/components/Course/assignments/GroupAccordion.svelte";
    import {format, parseISO} from "date-fns";
    import GroupAccordionRow from "$lib/components/Course/assignments/GroupAccordionRow.svelte";


    export let data;
    export let show_create_box;
    export let dueDate;
    export let availablefromDate;
    export let availableuntilDate;

    // Page Data
    //let course_data = $page.data.courses.courseData;
    let loading;
    let modules;
    let groups;
    let assignments;

    $: modules = data.modules;
    $: groups = data.groups;
    $: assignments = data.assignments;

    let open = false;
    let delete_assignment;
    let delete_assignment_id;

    // TODO Dates
    let storeDueDate;
    let storeAvailableDate;
    let storeAvailableUntilDate;

    let showAllAssignments;

    // For search box on assignments
    let searchTerm = '';
    $: filteredItems = assignments.filter(
        (assignments) => assignments.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );


    // For assignment delete
    let deleteModel = false;

    let createGroupModal = false;

    // Get modules
    async function getModules(assignment_id) {
        //published = !published
        const url = new URL('/api/assignments/publish/', window.location.origin);
        url.searchParams.append('assignment_id', assignment_id);
        const response = await fetch(url);
        const { res, error, status } = await response.json();
        //console.log(published)
        await invalidateAll();
    }

    // Draggable box
    function show_box() {
        show_create_box = true;

    }

    // Draggable box
    function close_box() {
        show_create_box = false;
    }

    let {supabase, claim} = data
    $: ({supabase, claim} = data)

    async function handleSubmit(event) {

        if (browser) {
            dueDate = dayjs(storeDueDate?.selected);
            availablefromDate = dayjs(storeAvailableDate?.selected);
            availableuntilDate = dayjs(storeAvailableUntilDate?.selected);
        }
        loading = true;

        const data = new FormData(this);
        console.log(data)
        data.append('due', dueDate);
        data.append('availfrom', availablefromDate);
        data.append('availto', availableuntilDate);

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
            const newNotification =
                {
                    title: "Success! 🥳",
                    message: `Created Assignment: ${data.get('name')}`
                };

            addNotification(newNotification, supabase, $page.data.session.user)

        } else {
            const newNotification =
                {
                    title: "Failed! 😞",
                    message: `Error: Type: ${result.type} Status: ${result.status}}`
                };

            addNotification(newNotification, supabase, $page.data.session.user)
        }
        close_box();
        await invalidateAll();
        await applyAction(result);
    }

    let hoverID;
    $: hoverID;

    function delete_model_open(id) {
        delete_assignment_id = id;
        deleteModel = true;
    }

    function delete_model_close() {
        deleteModel = false;
    }


    async function handleDeleteAssignment(aid) {
        const {error, status} = await $page.data.supabase.from('assignments').delete().match({assignment_id: aid});
        console.log(status)
        if (status === 204) {
            const newNotification =
                {
                    title: "Success! 🥳",
                    message: `Deleted Assignment!`
                };
            addNotification(newNotification, supabase, $page.data.session.user)
            delete_model_close();
            await invalidateAll();
        }
    }

    function hover(h) {
        hoverID = h;
    }

    function handleAssignment(id) {
        goto('/d/courses/' + data.slug + '/assignments/' + id);
    }

    async function handle_group_submit(event) {
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
            createGroupModal = false;
            addAssignmentModel = false;
            await invalidateAll();
        }
        console.log(result)
        await applyAction(result);
    }

    // For drag me
    let left = 600;
    let top = 200;

    onMount(() => {
        // Set the selected item when the page is mounted
        navStore.set('courses');
    });


    let addAssignmentModel = false;
    let item_id;
    let selectedTypeAddItem;

    function add_item(id) {
        addAssignmentModel = true
        item_id = id;
    }

    export let active = null;

    async function publishAssignment(assignment_id) {
        //published = !published
        const url = new URL('/api/assignments/publish/', window.location.origin);
        url.searchParams.append('assignment_id', assignment_id);
        const response = await fetch(url);
        const { res, error, status } = await response.json();
        //console.log(published)
        await invalidateAll();
    }

    async function unpublishAssignment(assignment_id) {
       // published = !published
        const url = new URL('/api/assignments/unpublish/', window.location.origin);
        url.searchParams.append('assignment_id', assignment_id);
        const response = await fetch(url);
        const { res, error, status } = await response.json();

        await invalidateAll();
    }

</script>


<div class="w-full ">
    <section class="pl-1 mt-5 ">
        <div class="">
            <div class="flex flex-col sm:flex-row justify-between">

                <div class="flex flex-wrap">
                    <div>
                        <button
                                class="relative inline-flex items-center justify-center p-0.5 ml-0.5 mb-2 mr-2 overflow-hidden text-sm
				font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
				group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
				focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
                                on:click={() => showAllAssignments = !showAllAssignments}>
				<span
                        class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
					dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
					<div class="inline-block">{#if showAllAssignments}
						<Fa icon={faLayerGroup}/>
						{:else}
						<Fa icon={faTable}/>
						{/if}</div> <div
                        class="inline-block">{showAllAssignments === true ? 'Show Groups' : 'Show Table'}</div>
				</span>
                        </button>
                    </div>
                </div>

                <div class="flex flex-wrap mr-5">
                    {#if claim !== 'student'}
                        <div>
                            <button
                                    class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
				font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
				group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
				focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
                                    on:click={show_box}>
				<span
                        class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
					dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
					<div class="inline-block"><Fa icon={faAdd}/></div> <div class="inline-block">Assignment</div>
				</span>
                            </button>
                        </div>

                        <div>
                            <button
                                    class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
				font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
				group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
				focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
                                    on:click={ () => { createGroupModal = true }}>
				<span
                        class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
					dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
					<div class="inline-block"><Fa icon={faAdd}/></div> <div class="inline-block">Group</div>
				</span>
                            </button>
                        </div>
                    {/if}
                </div>
            </div>

            <!-- GROUP -->

            {#if !showAllAssignments}
                <div class="flex flex-col -mx-20 my-2 pl-14 -mb-6 text-white font-semibold mr-0.5">
                    {#key groups}
                        <GroupAccordionBody bind:active>
                            {#each groups as {group_title, id, assignments, published}, i}
                                <div class="mb-1 mx-6 cursor-pointer">
                                    <!--Group-->
                                    <div id="accordion-collapse" data-accordion="collapse">
                                        <GroupAccordion id={i} group_id={id}
                                                        title={group_title}
                                                        subtitle="test"
                                                        published={published}
                                                        addAssignmentModel={addAssignmentModel}
                                                        item_id={id}
                                                        claim={claim}
                                                        on:addItem={add_item}>

									<span slot="header" class="text-white text-lg">
										{group_title}
									</span>
                                            <!-- assignments -->
                                            {#each assignments as {title, in_group, due, points, published}, i}
                                                    <GroupAccordionRow
                                                    assignment_id={assignments[i].assignment_id}
                                                    slug={data.slug}
                                                    title={title}
                                                    due={due}
                                                    points={points}
                                                    claim={claim}
                                                    published={published}
                                                    ></GroupAccordionRow>
                                            {/each}


                                            {#if assignments}
                                                {#if assignments.length === 0}
                                                    <div class="py-2 px-6 pb-4">Nothing here...</div>
                                                {/if}
                                            {/if}
                                        </GroupAccordion>

                                    </div>
                                </div>
                                <!--End of group-->
                            {/each}
                        </GroupAccordionBody>
                    {/key}

                </div>
            {/if}

            <!-- GROUP END -->

            {#if showAllAssignments}
                <div>
                    <div class="relative overflow-x-auto  sm:rounded-lg w-full">
                        <TableSearch placeholder="Search by title..." hoverable={true} bind:inputValue={searchTerm}>
                            <Table hoverable>
                                <TableHead>
                                    <TableHeadCell>Assignment Title</TableHeadCell>
                                    <TableHeadCell>Category</TableHeadCell>
                                    <TableHeadCell>Due</TableHeadCell>
                                    <TableHeadCell>Points</TableHeadCell>
                                    {#if claim !== 'student'}
                                        <TableHeadCell>
                                            <span class="sr-only ">Edit</span>
                                        </TableHeadCell>
                                    {/if}
                                </TableHead>
                                <TableBody class="divide-y">
                                    {#key assignments}
                                        {#each filteredItems as {assignment_id, title, category, due, points}, i}
                                            <TableBodyRow on:click={() =>  handleAssignment(assignment_id)}
                                                          class="cursor-pointer">
                                                <TableBodyCell>{title ? title : 'No title'}</TableBodyCell>
                                                <TableBodyCell>{category ? category : "No category" }</TableBodyCell>
                                                <TableBodyCell>{format(parseISO(due), "MMM dd hh:mm a")}</TableBodyCell>
                                                <TableBodyCell>{points ? points : "0" }</TableBodyCell>
                                                {#if claim !== 'student'}
                                                    <TableBodyCell tdClass="py-4 whitespace-nowrap font-medium">
                                                        <a on:click|stopPropagation={() => goto($page.url.pathname + "/" + assignment_id)}
                                                           class="font-medium
								text-blue-600 hover:underline dark:text-blue-500">
                                                            Edit
                                                        </a>
                                                        <a on:click|stopPropagation={() => delete_model_open(assignment_id)}
                                                           class="font-medium text-blue-600
								hover:underline dark:text-red-500 ">
                                                            Delete
                                                        </a>
                                                    </TableBodyCell>
                                                {/if}
                                            </TableBodyRow>
                                        {/each}
                                    {/key}
                                </TableBody>
                            </Table>
                        </TableSearch>

                        <!--No courses found-->
                        {#if assignments?.length === 0}
                            <div
                                    class="flex p-4 mb-6 mt-4 ml-6 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50
						dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                                    role="alert"
                            >
                                <svg
                                        aria-hidden="true"
                                        class="flex-shrink-0 inline w-5 h-5 mr-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                            fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1
								 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clip-rule="evenodd"
                                    />
                                </svg>
                                <span class="sr-only">Info</span>
                                <div>
                                    <span class="font-medium">No assignments found...</span>
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
            {/if}
        </div>
    </section>
</div>

{#if show_create_box}
    <!-- Main modal -->
    <div use:dragMe class="z-1000 fixed top-1/2 left-1/2">
        <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <!-- Modal content -->
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-700 sm:p-5">
                <!-- Modal header -->
                <div
                        class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
                >
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Add Assignment</h3>
                    <button
                            type="button"
                            on:click={close_box}
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto
						 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="defaultModal"
                    >
                        <svg
                                aria-hidden="true"
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0
								 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                            />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <form method="POST" action="?/createAssignment" on:submit|preventDefault={handleSubmit}>
                    <div class="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Assignment Name
                            </label>
                            <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
								 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
								  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Assignment Name"
                                    required
                            />
                        </div>

                        <div class="sm:col-span-2">
                            <label
                                    for="description"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Description</label
                            >
                            <textarea
                                    name="description"
                                    id="description"
                                    rows="4"
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
								 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600
								  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Summarize assignment description"
                                    required></textarea>
                        </div>

                        <div>
                            <label
                                    for="points"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Points</label
                            >
                            <input
                                    type="text"
                                    name="points"
                                    id="points"
                                    value="0"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
								 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
								  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder=""
                                    required=""
                            />
                        </div>

                        <div>
                            <label
                                    for="category"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label
                            >
                            <select
                                    name="category"
                                    id="category"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500
								 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
								 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    required
                            >
                                <option selected="">Select category</option>
                                <option value="Assignment">Assignment</option>
                                <option value="Quiz">Quiz</option>
                                <option value="Project">Project</option>
                            </select>
                        </div>

                        <div>
                            <label
                                    for="displayas"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Display Grade As</label
                            >
                            <select
                                    name="displayas"
                                    id="displayas"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500
								 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
								  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option value="Points">Points</option>
                                <option value="Percentage">Percentage</option>
                            </select>
                        </div>

                        <div>
                            <label
                                    for="submissiontype"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Submission Type</label
                            >
                            <select
                                    name="submissiontype"
                                    id="submissiontype"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500
								 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
								  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option value="Points">Online</option>
                                <option value="Percentage">Physical</option>
                            </select>
                        </div>

                        <div>
                            <label
                                    for="modules"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Module</label
                            >
                            <select
                                    name="modules"
                                    id="modules"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500
								focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
								 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option value="">No module</option>
                                {#if modules !== undefined}
                                    {#each modules as {module_title, id}, i}
                                        <option value="{id}">{module_title}</option>
                                    {/each}
                                {/if}
                            </select>
                        </div>

                        <div>
                            <label
                                    for="groups"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Group</label
                            >
                            <select
                                    name="groups"
                                    id="groups"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500
								focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
								 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option value="">No group</option>
                                {#if groups !== undefined}
                                    {#each groups as {group_title, id}, i}
                                        <option value="{id}">{group_title}</option>
                                    {/each}
                                {/if}
                            </select>
                        </div>

                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
                            >Due</label
                            >
                            <Datepicker {theme} bind:storeDueDate class="w-full"/>
                        </div>

                        <!--<div>
              <label for="assignto" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assign To</label>
              <select name="assignto" id="assignto"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full rounded-lg
                       focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
                         dark:focus:border-primary-500">
                <option value="Everyone">Student</option>
                <option value="Everyone">Everyone</option>
                <option value="Empty">Empty</option>
              </select>
            </div>-->

                        <!--<div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
                                >Available from</label
                            >
                            <Datepicker {theme} bind:storeAvailableDate class="w-full" />
                        </div>

                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
                                >Available Until</label
                            >
                            <Datepicker {theme} bind:storeAvailableUntilDate class="w-full" />
                        </div>
                    -->
                    </div>
                    <button
                            type="submit"
                            class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
							font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
							group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
							focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800">
						<span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
							dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
							Create
						</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
{/if}

<!-- Model for removing assignment -->
<Modal title="Remove assignment" class="max-w-xs" bind:open={deleteModel}>
    <p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
    <div class="flex justify-center items-center space-x-4">
        <button on:click={() => deleteModel = false} data-modal-toggle="deleteModal" type="button"
                class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            No, cancel
        </button>
        <button on:click={() => handleDeleteAssignment(delete_assignment_id)} type="submit"
                class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
            Yes, I'm sure
        </button>
    </div>
</Modal>

<Modal title="Add group" class="max-w-xs" bind:open={createGroupModal}>
    <!-- Modal body -->
    <form method="POST" action="?/createGroup" on:submit|preventDefault={handle_group_submit}>
        <div class="grid gap-4 mb-4 sm:grid-cols-1">
            <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Group Name</label
                >
                <input
                        type="text"
                        name="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Group Name"
                        required
                />
            </div>
        </div>
        <button
                type="submit"
                class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
            <svg
                    class="mr-1 -ml-1 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
            >
                <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                />
            </svg>
            Add new group
        </button>
    </form>
</Modal>

<!-- Add assignment to group -->
<Modal title="Add item to group" class="max-w-xs" bind:open={addAssignmentModel}>
    <form method="POST" action="?/addItemToGroup" on:submit|preventDefault={handle_group_submit}>
        <div class="grid gap-4 mb-4 sm:grid-cols-2">

            <div>
                <label
                        for="groups"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Group</label
                >
                <select
                        name="groups"
                        id="groups"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                >
                    {#each groups as {group_title, id}, i}
                        <option value="{id}" selected={id === add_item}>{group_title}</option>
                    {/each}
                </select>
            </div>


        </div>
        <div>
            <label for="assignment_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an
                assignment</label>
            <select multiple name="assignment_id" id="assignment_id"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {#each assignments as {assignment_id, title, due}}
                    <option value="{assignment_id}">{title} | Due - {new Date(due).toDateString()}</option>
                {/each}
            </select>
        </div>
        <button
                type="submit"
                class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
            <svg
                    class="mr-1 -ml-1 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
            >
                <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                />
            </svg>
            Add item
        </button>
    </form>
</Modal>
