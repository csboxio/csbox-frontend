<script lang="ts">
	import { page } from '$app/stores';
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
	export let data

	let { supabase, claim, launch } = data
	$: ({ supabase, claim, launch } = data)

    const roles = launch.userInfo.roles.map(role => {
        const roleParts = role.split('#');
        return roleParts.length === 2 ? roleParts[1] : role;
    });
    const hasInstructorRole = roles.includes("Instructor");

    onMount(() => {

        console.log(roles)

    });
</script>

<body class="dark:bg-gray-600  bg-gray-100 antialiased bg-body text-body font-body">
{#if hasInstructorRole}
    <div class="container mx-auto p-6">
        <button on:click={() => {goto('/lti/members')}}>members</button>
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 class="text-2xl font-bold mb-2">User Info</h1>
            <p><span class="font-bold">Name:</span> {launch.userInfo.name}</p>
            <p><span class="font-bold">Email:</span> {launch.userInfo.email}</p>
            <p><span class="font-bold">Roles:</span>
                <span class="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-sm font-semibold mr-2">{roles}</span>
            </p>
        </div>

        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 class="text-2xl font-bold mb-2">LMS Info</h1>
            <p><span class="font-bold">Name:</span> {launch.lmsInfo.name}</p>
            <p><span class="font-bold">URL:</span> {launch.lmsInfo.url}</p>
            <p><span class="font-bold">Version:</span> {launch.lmsInfo.version}</p>
        </div>

        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 class="text-2xl font-bold mb-2">Launch Info</h1>
            <p><span class="font-bold">Type:</span> {launch.launchInfo.type}</p>
            <p><span class="font-bold">Target:</span> {launch.launchInfo.target}</p>
            <p><span class="font-bold">Return URL:</span> {launch.launchInfo.presentation.returnUrl}</p>
        </div>

        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 class="text-2xl font-bold mb-2">Services Info</h1>
            <p><span class="font-bold">Outcomes Available:</span> {launch.servicesInfo.outcomes.available ? 'Yes' : 'No'}</p>
            <p><span class="font-bold">Deep Linking Available:</span> {launch.servicesInfo.deepLinking.available ? 'Yes' : 'No'}</p>
            <p><span class="font-bold">Assignment and Grades Available:</span> {launch.servicesInfo.assignmentAndGrades.available ? 'Yes' : 'No'}</p>
            <p><span class="font-bold">Names and Roles Available:</span> {launch.servicesInfo.namesAndRoles.available ? 'Yes' : 'No'}</p>
        </div>
    </div>
    {:else}
    You are not an instructor.
{/if}
</body>
