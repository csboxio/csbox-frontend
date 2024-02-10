<script>
    import Fa from 'svelte-fa/src/fa.svelte';
    import {faSpinner} from "@fortawesome/free-solid-svg-icons";
    import {applyAction, deserialize} from "$app/forms";
    import {invalidateAll} from "$app/navigation";


    export let selectedRole;
    export let selectedOrg;
    export let loading;
    export let currentStep;
    export let org;

    async function handleRoleSubmit() {
        const data = new FormData(this);
        const response = await fetch(this.action, {
            method: 'POST',
            body: data,
            headers: {
                'x-sveltekit-action': 'true',
            }
        });
        const result = deserialize(await response.text());
        if (result.type === 'redirect') {
            // re-run all `load` functions, following the successful update
            await invalidateAll();

        }
        await invalidateAll();
        await applyAction(result);
        currentStep = currentStep + 1;
    }
</script>

<!-- Student or Instructor Dropdown -->
<!-- Submits form to /updateRole -->
<!-- On select Instructor make a if block to show an input box -->
<form method="POST" action="?/updateRole" on:submit|preventDefault={handleRoleSubmit}>

    <div class="mb-10 mt-2">
        <label for="org" class="block mb-2 text-white">Organization: </label>
        <select id="org" bind:value={selectedOrg}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
                required>
            <option value="">Choose a organization</option>
            {#if org}
                {#each org as org}
                    <option value={org.org_id}>{org.org_name}</option>
                {/each}
            {/if}
        </select>
    </div>

    <div class="mb-10">
        <label for="roles" class="block mb-2 text-white">Role: </label>
        <select
                id="roles"
                bind:value={selectedRole}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
                required>

            <option value="">Choose a role</option>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
        </select>
    </div>

    {#if selectedRole === 'Instructor'}
        <div class="mb-10">
            <label for="instructorInput" class="block mb-2 text-white">Access Code:</label>
            <input
                    type="text"
                    id="instructorInput"
                    name="instructorInput"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
                    placeholder="Enter Access Code"
                    required
            />
        </div>
    {/if}
    <div class="flex justify-between w-full sm:w-auto mt-2">
        <div>
            <button class="inline-block py-2 px-4 mr-3 text-xs text-center font-semibold leading-normal text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200"
                    on:click|preventDefault={() => {currentStep = 1;}}>
                Back
            </button>
        </div>

        <button type="submit" class="inline-block py-2 px-4 text-sm text-center font-bold leading-normal text-gray-100 bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-200">
            {#if loading}
                <svg class="animate-spin h-4 w-4 mr-3 inline">
                    <Fa icon={faSpinner} size="xs" />
                </svg>
            {/if}
            Next
        </button>
    </div>

</form>