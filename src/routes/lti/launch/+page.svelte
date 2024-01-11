<script lang="ts">
	import { page } from '$app/stores';
    import {onMount} from "svelte";
    import {goto, invalidateAll} from "$app/navigation";
    import {applyAction, deserialize} from "$app/forms";
	export let data

	let { supabase, claim, launch, session, ltik, lms_user_id_exists, course_id, assignment_id } = data
	$: ({ supabase, claim, launch, session, ltik, lms_user_id_exists, course_id, assignment_id } = data)

    const roles = launch?.userInfo.roles.map(role => {
        const roleParts = role.split('#');
        return roleParts.length === 2 ? roleParts[1] : role;
    });
    const hasInstructorRole = roles?.includes("Instructor");

    async function handleSubmit(event) {
        const data = new FormData(this);
        data.append('lms_user_id', launch.userInfo.id)

        const response = await fetch(this.action, {
            method: 'POST',
            body: data
        });

        const result = deserialize(await response.text());

        if (result.type === 'success') {
            await invalidateAll();
            await supabase.auth.signOut()
        }

        applyAction(result);

    }

    // TODO BUILT ONLY FOR ASSIGNMENTS
    function redirectToResource() {
        window.location.href = `/d/courses/${course_id}/assignments/${assignment_id}`;
    }

</script>

<body class="dark:bg-gray-600 bg-gray-100 antialiased bg-body text-body font-body">
{#if session}
    <!-- Check lms user id exists -->
    {#if lms_user_id_exists === true}
        {#if hasInstructorRole}
            {redirectToResource()}
        {:else}
            {redirectToResource()}
        {/if}
    {:else}
        <div class="flex justify-center items-center h-screen bg-gray-700">
            <div class="max-w-md w-full bg-gray-800 shadow-lg shadow-gray-600 rounded p-8">
                <div class="flex justify-center mb-6">
                    <img src="/logo-text-white.png" alt="Logo" class="h-12 w-auto">
                </div>
                <section class="flex flex-col items-center space-y-4 py-8">
                    <h2 class="text-xl block truncate text-sm font-bold text-blue-500 animate-text bg-gradient-to-r from-blue-400 via-teal-500 to-purple-200 bg-clip-text text-transparent text-5xl font-black">Link LMS to CSBOX account?</h2>
                    <form method="POST" action="?/link_lms_id" on:submit|preventDefault={handleSubmit}>
                        <button class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    type="submit">
                                Yes
                        </button>
                    </form>
                </section>
            </div>
        </div>
    {/if}
    <!-- No session -->
    {:else}
    <script type="module">
        window.location.href = '/lti/auth';
    </script>
{/if}
</body>
