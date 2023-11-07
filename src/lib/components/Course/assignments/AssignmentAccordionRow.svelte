<script>
    import {goto, invalidateAll} from "$app/navigation";
    import Fa from 'svelte-fa/src/fa.svelte';
    import {
        faAdd, faCheckCircle,
        faCircleCheck, faCircleExclamation, faCircleXmark, faEllipsisVertical,
        faGear, faGripVertical,
        faLayerGroup,
        faObjectGroup,
        faPencil, faStop,
        faTable
    } from "@fortawesome/free-solid-svg-icons";
    import {addHours, addMinutes, format, parseISO} from "date-fns";
    import { draw } from 'svelte/transition';
    import {Dropdown, DropdownItem, Modal} from "flowbite-svelte";
    import {page} from "$app/stores";
    import {applyAction, deserialize} from "$app/forms";
    import EditAssignment from "$lib/components/Course/block/EditAssignment.svelte";

    export let assignment_id
    export let slug
    export let title
    export let due
    export let points
    export let claim
    export let published
    export let groups
    export let modules
    export let displayas
    export let assignmentDueDate;
    export let assignmentStartDate;
    export let assignmentEndDate;
    export let submissiontype;
    export let module_id;
    export let group_id;

    function handleAssignment(id) {
        if (deleteModel === false && editModal === false)
            goto('/d/courses/' + slug + '/assignments/' + id);
    }

    async function publishAssignment(assignment_id) {
        published = !published
        const url = new URL('/api/assignments/publish/', window.location.origin);
        url.searchParams.append('assignment_id', assignment_id);
        const response = await fetch(url);
        const { res, error, status } = await response.json();
        //console.log(published)
        await invalidateAll();
    }

    async function unpublishAssignment(assignment_id) {
        published = !published
        const url = new URL('/api/assignments/unpublish/', window.location.origin);
        url.searchParams.append('assignment_id', assignment_id);
        const response = await fetch(url);
        const { res, error, status } = await response.json();

        await invalidateAll();
    }

    let parsedDate = new Date(due);
    let offsetMinutes = parsedDate.getTimezoneOffset();

    const adjustedDate = addMinutes(parsedDate, offsetMinutes)
    const formattedDate = format(adjustedDate, "MMM dd hh:mm a")

    let in24Hours = new Date(due);
    in24Hours.setHours(in24Hours.getHours() + 24);

    let deleteModel = false;

    function openDeleteModal() {
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
            //addNotification(newNotification, $page.data.supabase, $page.data.session.user)
            delete_model_close();
            await invalidateAll();
        }
    }

    let editModal = false;

    function editModalClose() {
        editModal = false;
    }

    function editModalOpen() {
        editModal = true;
    }

    async function handleSubmit(event) {

        const data = new FormData(this);
        data.append('assignment_id', assignment_id)
        //console.log(data)

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

            //addNotification(newNotification, supabase, $page.data.session.user)

        } else {
            const newNotification =
                {
                    title: "Failed! 😞",
                    message: `Error: Type: ${result.type} Status: ${result.status}}`
                };

            //addNotification(newNotification, supabase, $page.data.session.user)
        }
        editModalClose();
        await invalidateAll();
        await applyAction(result);
    }

    function formatDateForInput(date) {
        return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
    }

    let formattedDueDate
    $: formattedDueDate = formatDateForInput(assignmentDueDate)

    let formattedAvailableStart
    $: formattedAvailableStart = formatDateForInput(assignmentStartDate)

    let formattedAvailableEnd
    $: formattedAvailableEnd = formatDateForInput(assignmentEndDate)
</script>


<div class="py-2 pl-4 pr-3 flex items-center text-md text-gray-200 hover:text-white hover:bg-gray-500 text-white border-t-2 border-gray-500"
         on:click|stopPropagation={() => { handleAssignment(assignment_id) }} >
        {#if claim === 'instructor'}
        <div class="pr-8 cursor-move">
            <Fa class="inline-block text-gray-100" icon={faGripVertical} />
        </div>
        {/if}
        <div class="pr-3">
            <Fa class="inline-block" icon={faPencil} />
        </div>
        <div>
            {title === '' ? 'Assignment Error..' : title}
            <div class="text-gray-200 text- font-normal space-x-1 text-xs/loose">
                <div class="inline-block">
                    <b>Due</b>
                    {formattedDate}
                </div>
                <div class="inline-block">
                    |
                </div>
                <div class="inline-block">{points ? points : "0"} points</div>
            </div>
        </div>
        <div class="ml-auto">
            {#if claim === 'instructor'}
                {#key published}
                    <!-- Published button-->
                    <div class="w-8 pl-1 transition text-gray-300 inline-block"
                         class:text-green-500={published}>
                        {#if !published}
                            <div class="hover:text-white" title="Not published" on:click|stopPropagation={async () => { await publishAssignment(assignment_id); }}>
                                <Fa icon={faCircleXmark}></Fa>
                            </div>
                        {:else}
                            <div class="hover:text-white" title="Published" on:click|stopPropagation={async () => { await unpublishAssignment(assignment_id); }}>
                                <Fa icon={faCheckCircle}></Fa>
                            </div>
                        {/if}
                    </div>
                    <!-- End of published button -->
                {/key}
                {#if claim === 'instructor'}
                    <div class="inline-block">
                    <button on:click|stopPropagation class=" text-gray-300 hover:text-white pr-5 text-center justify-center">
                        <div class="text-center justify-center"><Fa icon={faEllipsisVertical}></Fa></div>
                    </button>
                    <Dropdown containerClass="absolute z-50 top-8 right-0">
                        <DropdownItem on:click|once={() => {editModalOpen();}}>Edit</DropdownItem>
                        <!--<DropdownItem>Drop</DropdownItem>-->
                        <DropdownItem on:click|once={() => {openDeleteModal()}}>Delete</DropdownItem>
                    </Dropdown>
                    </div>
                {/if}
            {/if}


            {#if claim === 'student'}
                {#if (adjustedDate < new Date())}
                    <div class="text-red-500 pr-2" title="Past due date.">
                    <Fa icon={faCircleExclamation}></Fa>
                    </div>
                {/if}
            {/if}
        </div>
    </div>


<!-- Model for removing assignment -->
<Modal title="Remove assignment" class="max-w-xs" bind:open={deleteModel}>
    <p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
    <div class="flex justify-center items-center space-x-4">
        <button on:click={() => deleteModel = false} data-modal-toggle="deleteModal" type="button"
                class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            No, cancel
        </button>
        <button on:click={() => handleDeleteAssignment(assignment_id)} type="submit"
                class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
            Yes, I'm sure
        </button>
    </div>
</Modal>


<EditAssignment
        editModal={editModal}
        title={title}
        points={points}
        displayas={displayas}
        submissiontype={submissiontype}
        published={published}
        module_id={module_id}
        modules={modules}
        group_id={group_id}
        groups={groups}
        formattedDueDate={formattedDueDate}
        formattedAvailableStart={formattedAvailableStart}
        formattedAvailableEnd={formattedAvailableEnd}
/>