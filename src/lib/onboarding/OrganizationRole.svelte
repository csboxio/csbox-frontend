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

    let accessCode;

    let accessCodeValid;

    async function checkAccessCode() {
        try {
            const response = await fetch(`/api/org/check_code?org_id=${selectedOrg}&code=${accessCode}`);

            if (response.ok) {
                const result = await response.json();
                console.log(result);

                // Check the condition from the API response, for example, if "Success"
                if (result === "Success") {
                    accessCodeValid = true;
                } else {
                    accessCodeValid = false;
                }

                return accessCodeValid;
            } else {
                // If the response is not ok, set accessCodeValid to false
                accessCodeValid = false;
                return accessCodeValid;
            }
        } catch (error) {
            console.error("Error while checking access code:", error);
            accessCodeValid = false;
            return accessCodeValid;
        }
    }

    async function handleRoleSubmit() {
        const data = new FormData(this);

        data.append('access_code_valid', accessCodeValid);
        data.append('access_code', accessCode);
        data.append('org_id', selectedOrg);
        data.append('role', selectedRole);

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
        <label for="org" class="block mb-2 text-white font-semibold">Organization: </label>
        <select id="org" bind:value={selectedOrg}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
                required>
            <option value="">Choose a organization</option>
            {#if org}
                {#each org as org}
                    <option value={org.id}>{org.org_name}</option>
                {/each}
            {/if}
        </select>
    </div>

    <div class="mb-10">
        <label for="roles" class="block mb-2 text-white font-semibold">Role: </label>
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
        <div class="mb-10 space-y-2">
            <label for="instructorInput" class="block mb-2 text-white font-semibold">Access Code:</label>
            <div class="text-gray-300 text-sm"> Ask your administrator for the access code. </div>
            <input bind:value={accessCode} type="text"
                    id="instructorInput"
                    name="instructorInput"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
                    placeholder="Enter Access Code"
                    required />

            <button class="inline-block py-2 px-4 mr-3 text-xs text-center font-semibold leading-normal text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200"
                    on:click|preventDefault={() => { checkAccessCode(); }}>Check</button>

            {#if accessCodeValid !== undefined}
                {#if accessCodeValid === true}
                    <div class="text-green-200 font-semibold px-2">Access Code Valid!</div>
                    {:else}
                        <div class="text-red-200 font-semibold px-2">Access Code Invalid!</div>
                {/if}
            {/if}

        </div>
    {/if}
    <div class="flex justify-between w-full sm:w-auto mt-2">
        <div>
            <button class="cursor-not-allowed inline-block py-2 px-4 mr-3 text-xs text-center font-semibold leading-normal text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200">
                Back
            </button>
        </div>

        {#if accessCodeValid}
            <button type="submit" class="inline-block py-2 px-4 text-sm text-center font-bold leading-normal text-gray-100 bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-200">
                {#if loading}
                    <svg class="animate-spin h-4 w-4 mr-3 inline">
                        <Fa icon={faSpinner} size="xs" />
                    </svg>
                {/if}
                Next
            </button>
            {:else}
            <button class="inline-block py-2 px-4 mr-3 text-xs text-center font-semibold leading-normal text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200">
                Next
            </button>
        {/if}
    </div>

</form>