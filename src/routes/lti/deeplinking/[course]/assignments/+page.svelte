<script lang="ts">
    import {
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        TableSearch
    } from "flowbite-svelte";
    import {format, parseISO} from "date-fns";

    export let data
    let { supabase, assignments, session, deeplinking, claim, lms_user_id, ltik } = data
    $: ({ supabase, assignments, session, deeplinking, claim, lms_user_id, ltik } = data)

    let assignments_data;
    $: assignments_data = assignments;

    let searchTerm = '';
    $: filteredItems = assignments_data.filter(
        (assignment) => assignment.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );

    let selected_assignment_id;
    $: selected_assignment_id;

    function handleAssignmentClick(id) {
        if (selected_assignment_id === id) {
            selected_assignment_id = ''; // Already selected
        } else {
            selected_assignment_id = id;
        }
    }

    function isAssignmentSelected(id) {
        return selected_assignment_id == id;
    }

    function isLinkButtonBlue() {
        return selected_assignment_id !== null;
    }

    let linkAssignmentType;
    $: linkAssignmentType = 'new';

    let formHTML;
    $: formHTML;
    console.log(assignments)

    async function linkExistingAssignment() {
        const assignment_data = assignments.find(
            assignment => assignment.assignment_id === selected_assignment_id
        );

        // A- for assignments delimiter
        const requestBody = {
            contentItems: [{
                type: 'ltiResourceLink',
                url: `https://lti.csbox.io/lti/launch?resource=A-${selected_assignment_id}`,
                title: assignment_data.title,
            }]
        }
        const deeplinking = await fetch(`/api/lti/deeplinking?ltik=${ltik}`, {
            method: 'POST',
            body: JSON.stringify(requestBody)
        });

        const responseData = await deeplinking.json();
        const { deepLinkingForm } = responseData;

        console.log(deepLinkingForm)

        formHTML =
            `<form id="ltiaas_dl" style="display: none;" action="${deepLinkingForm.target}" method="POST">
            <input type="hidden" name="JWT" value="${deepLinkingForm.message}" />
            </form>
            <script>
            document.getElementById("ltiaas_dl").submit();
            <\/script>`;

        const formContainer = document.createElement('div');
        formContainer.innerHTML = formHTML;
        document.body.appendChild(formContainer);

        const form = document.getElementById('ltiaas_dl');
        form.submit();
    }

    async function createLinkAssignment(formData) {
        const {
            type,
            url,
        } = formData;

        const requestBody = {
            contentItems: [{
                type,
                url,
            }],
        };

        try {
            const deeplinking = await fetch(`/api/lti/deeplinking?ltik=${ltik}`, {
                method: 'POST',
                body: JSON.stringify(requestBody)
            });

            const responseData = await deeplinking.json();
            const { deepLinkingForm } = responseData;

            console.log(deepLinkingForm)

            formHTML =
                `<form id="ltiaas_dl" style="display: none;" action="${deepLinkingForm.target}" method="POST">
            <input type="hidden" name="JWT" value="${deepLinkingForm.message}" />
            </form>
            <script>
            document.getElementById("ltiaas_dl").submit();
            <\/script>`;

            const formContainer = document.createElement('div');
            formContainer.innerHTML = formHTML;
            document.body.appendChild(formContainer);

            const form = document.getElementById('ltiaas_dl');
            form.submit();

        } catch (error) {
            // Handle errors if any
            console.error('Error creating new assignment:', error);
        }
    }

    let formData = {
        type: 'ltiResourceLink',
        url: `https://lti.csbox.io/lti/launch?resource=A-${123}`,
    };

    async function linkAssignment() {
        await createLinkAssignment(formData);
    }
</script>


<section>
    <div class="pt-3 pb-3 px-8 dark:bg-gray-600 bg-white ">

        <form on:submit|preventDefault={linkAssignment} class="pb-12">
            <h4 class="text-2xl font-bold dark:text-white  tracking-wide leading-7 mb-1">Blank Assignment</h4>

            <div class="mt-6">
                <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Link Resource</button>
            </div>
        </form>

        <hr>

        <div class="flex flex-wrap items-center justify-between -mx-2 pt-12">
            <div class="w-full lg:w-auto px-2 mb-6 lg:mb-0">
                <h4 class="text-2xl font-bold dark:text-white  tracking-wide leading-7 mb-1">Existing Assignment</h4>
                <div class="mr-5">
                    <div class="relative overflow-x-auto sm:rounded-lg w-full">
                        <TableSearch placeholder="Search by title..." hoverable={true} bind:inputValue={searchTerm}>
                            <Table hoverable>
                                <TableHead>
                                    <TableHeadCell>Assignment Title</TableHeadCell>
                                    <TableHeadCell>Category</TableHeadCell>
                                    <TableHeadCell>Due</TableHeadCell>
                                    <TableHeadCell>Points</TableHeadCell>
                                </TableHead>
                                <TableBody class="divide-y">
                                    {#key assignments}
                                        {#each filteredItems as {assignment_id, title, category, due, points}, i}
                                            <TableBodyRow
                                                    on:click={() => handleAssignmentClick(assignment_id)}
                                                    color="{assignment_id === selected_assignment_id ? 'blue' : 'default'}"
                                                    class="cursor-pointer">
                                                <TableBodyCell>{title ? title : 'No title'}</TableBodyCell>
                                                <TableBodyCell>{category ? category : "No category" }</TableBodyCell>
                                                <TableBodyCell>{due ? format(parseISO(due), "MMM dd hh:mm a") : "No due date"}</TableBodyCell>
                                                <TableBodyCell>{points ? points : "0" }</TableBodyCell>
                                            </TableBodyRow>
                                        {/each}
                                    {/key}
                                </TableBody>
                            </Table>
                        </TableSearch>
                    </div>
                </div>
            </div>

        </div>

    </div>
    {#if selected_assignment_id}
    <div class="w-full lg:w-auto sticky bottom-0 bg-gray-500 px-4 pb-4">
        <button class="mt-4 py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-700 transition-colors duration-300"
        on:click={() => { linkExistingAssignment() }}>
            Link Selected
        </button>
    </div>
    {/if}
</section>