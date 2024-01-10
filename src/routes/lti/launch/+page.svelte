<script lang="ts">
	import { page } from '$app/stores';
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
	export let data

	let { supabase, claim, launch, session, ltik } = data
	$: ({ supabase, claim, launch, session, ltik } = data)

    const roles = launch?.userInfo.roles.map(role => {
        const roleParts = role.split('#');
        return roleParts.length === 2 ? roleParts[1] : role;
    });
    const hasInstructorRole = roles?.includes("Instructor");

    async function checkLMSUserId() {
        console.log(ltik)
        const response = await fetch(`/lti-expo/check_lms_user_id_exists?ltik=${ltik}`)

        const data = await response.json()
        console.log(data)

        return data
    }

    let lms_user_id_check
    $: lms_user_id_check = false
</script>

<body class="dark:bg-gray-600 bg-gray-100 antialiased bg-body text-body font-body">
{#if session}
    {#if hasInstructorRole}
        Instructor
    {:else}
        You are not an instructor.
    {/if}
    <!-- No session -->
    {:else}
        <!-- Check lms user id exists -->
        {#if checkLMSUserId()}
            LMS User Id exists
            {:else}
            LMS User Id does not exist
        {/if}
{/if}
</body>
