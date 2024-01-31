<script lang="ts">
	import { page } from '$app/stores';
	import Auth from "$lib/components/Auth/Auth.svelte";
	import {goto} from "$app/navigation";

	export let data

	let { supabase, onboard } = data
	$: ({ supabase, onboard } = data)

	let isSetupCompleted
	$: isSetupCompleted = onboard?.data.completed_setup

	let isAuthenticated = false
	$: isAuthenticated = !!$page.data.session

	$: {
		if (isAuthenticated) {
			if (isSetupCompleted) {
				goto('/d');
			} else {
				goto('/onboarding');
			}
		}
	}
</script>

{#if !isAuthenticated }
	<Auth bind:supabase={supabase} />
{/if}