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
    let { supabase, assignments, session, deeplinking, claim, lms_user_id} = data
    $: ({ supabase, assignments, session, deeplinking, claim, lms_user_id } = data)

    let assignments_data;
    $: assignments_data = assignments;

    let searchTerm = '';
    $: filteredItems = assignments_data.filter(
        (assignment) => assignment.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );

    let selectedAssignment;
    $: selectedAssignment;

    function handleAssignmentClick(id) {
        selectedAssignment = id;
        console.log("clicked assignment " + selectedAssignment);
    }

    function isAssignmentSelected(id) {
        return selectedAssignment == id;
    }

    function isLinkButtonBlue() {
        return selectedAssignment !== null;
    }
</script>

<section>
    <div class="pt-3 pb-3 px-8 dark:bg-gray-700 bg-white h-screen">
        <div class="flex flex-wrap items-center justify-between -mx-2">
            <div class="w-full lg:w-auto px-2 mb-6 lg:mb-0">
                <h4 class="text-2xl font-bold dark:text-white  tracking-wide leading-7 mb-1">Select assignment to link</h4>
                <div class="mr-5">
                    <div class="relative overflow-x-auto sm:rounded-lg w-full">
                        <TableSearch placeholder="Search by title..." hoverable={true} bind:inputValue={searchTerm}>
                            <Table hoverable>
                                <TableHead>
                                    <TableHeadCell>Assignment Title</TableHeadCell>
                                    <TableHeadCell>Category</TableHeadCell>
                                    <TableHeadCell>Due</TableHeadCell>
                                    <TableHeadCell>Points</TableHeadCell>
                                    <TableHeadCell>Linked to LMS</TableHeadCell>
                                </TableHead>
                                <TableBody class="divide-y">
                                    {#key assignments}
                                        {#each filteredItems as {assignment_id, title, category, due, points}, i}
                                            <TableBodyRow
                                                    on:click={() => handleAssignmentClick(assignment_id)}
                                                    color="{assignment_id === selectedAssignment ? 'blue' : 'default'}"
                                                    class="cursor-pointer">
                                                <TableBodyCell>{title ? title : 'No title'}</TableBodyCell>
                                                <TableBodyCell>{category ? category : "No category" }</TableBodyCell>
                                                <TableBodyCell>{due ? format(parseISO(due), "MMM dd hh:mm a") : "No due date"}</TableBodyCell>
                                                <TableBodyCell>{points ? points : "0" }</TableBodyCell>
                                                <TableBodyCell>Not Linked</TableBodyCell>
                                            </TableBodyRow>
                                        {/each}
                                    {/key}
                                </TableBody>
                            </Table>
                        </TableSearch>
                    </div>
                </div>
                <button class="mt-4 py-2 px-4 rounded-md text-white {selectedAssignment != null ? 'bg-blue-500' : 'bg-gray-400'} {selectedAssignment != null ? 'hover:bg-blue-500' : 'hover:bg-gray-600'}transition-colors duration-300">
                    Link
                </button>
            </div>
        </div>
    </div>
</section>