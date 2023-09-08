<script lang="ts">

import {Modal} from "flowbite-svelte";
import {applyAction, deserialize} from "$app/forms";
import {invalidateAll} from "$app/navigation";

export let editModal;
export let title;
export let points;
export let displayas;
export let submissiontype;
export let published;
export let module_id;
export let modules;
export let group_id;
export let groups;
export let formattedDueDate;
export let formattedAvailableStart;
export let formattedAvailableEnd;
export let assignment_id;

function editModalClose() {
    editModal = false;
}

function editModalOpen() {
    editModal = true;
}

async function handleSubmit(event) {

    const data = new FormData(this);
    console.log(assignment_id)
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

    console.log(result)

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


</script>


<Modal title="Edit assignment" class="max-w-lg" bind:open={editModal}>
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <!-- Modal body -->
        <form method="POST" action="?/editAssignment" on:submit|preventDefault={handleSubmit}>
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Title
                    </label>
                    <input
                            type="text"
                            name="name"
                            id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
								 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
								  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Assignment title"
                            required
                            bind:value={title}
                    />
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
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
								 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
								  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder=""
                            required
                            bind:value={points}
                    />
                </div>

                <!--<div>
                    <label
                            for="attempts"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Submission Attempts</label
                    >
                    <input
                            type="text"
                            name="attempts"
                            id="attempts"
                            value="2"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
                         focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                          dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder=""
                            required=""
                    />
                </div>-->

                <div>
                    <label
                            for="displayas"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Display Grade As</label
                    >
                    <select name="displayas"
                            id="displayas"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500
								 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
								  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            bind:value={displayas}>

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
                            bind:value={submissiontype}
                    >
                        <option value="None">None</option>
                        <option value="Project">Project</option>
                        <option value="URL">URL</option>
                    </select>
                </div>

                <div>
                    <label
                            for="published"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Published</label
                    >
                    <select
                            name="published"
                            id="published"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500
								 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
								  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                        {#if published}
                            <option value="true" selected>True</option>
                            <option value="false" >False</option>
                        {:else}
                            <option value="true" >True</option>
                            <option value="false" selected>False</option>
                        {/if}
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
                            {#each modules as module, i}
                                {#if module.module_id === group_id}
                                    <option value="{module.module_id}" selected>{module.module_title}</option>
                                {:else}
                                    <option value="{module.module_id}">{module.module_title}</option>
                                {/if}
                            {/each}
                        {/if}
                    </select>
                </div>

                <div>
                    {#key group_id}
                        {group_id}
                        {JSON.stringify(groups)}
                    {/key}
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
                                {#if id === group_id}
                                    <option value="{id}" selected>{group_title}</option>
                                {:else}
                                    <option value="{id}">{group_title}</option>
                                {/if}
                            {/each}
                        {/if}
                    </select>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due:</label>
                    <input type="datetime-local" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
									 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
									  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="date" name="due" bind:value={formattedDueDate}/>
                </div>

                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start date:</label>
                    <input type="datetime-local" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
									 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
									  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="startDate" name="startDate" bind:value={formattedAvailableStart}/>
                </div>

                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End date:</label>
                    <input type="datetime-local" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
									 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
									  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="endDate" name="endDate" bind:value={formattedAvailableEnd}/>
                </div>
            </div>

            <button type="submit" class="text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full
             text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:border-gray-700">Submit</button>
        </form>
    </div>
</Modal>