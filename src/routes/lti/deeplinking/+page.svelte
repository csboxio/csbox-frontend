<script lang="ts">
	import { page } from '$app/stores';
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
	export let data

	let { supabase, claim, deeplinking } = data
	$: ({ supabase, claim, deeplinking } = data)

    const roles = deeplinking.userInfo.roles.map(role => {
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
        deep linking
    </div>
    {:else}
    You are not an instructor.
{/if}
</body>
