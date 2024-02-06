<script lang="ts">
	import { page } from '$app/stores';
	import {goto, invalidate} from "$app/navigation";
	import Auth from "$lib/auth/Auth.svelte";
	import {browser} from "$app/environment";
	import {onMount} from "svelte";
	import {fade} from "svelte/transition";

	export let data


	let { supabase, onboard, session } = data
	$: ({ supabase, onboard, session} = data)

	let isSetupCompleted = onboard?.data.completed_setup

	let isAuthenticated
	$: isAuthenticated = $page.data.session

	$: {
		if (isAuthenticated) {
			goto('/d');
		}
	}

	onMount(() => {
		if (isAuthenticated) {
			goto('/d');
		}
	})
</script>

{#key isAuthenticated}

	<Auth bind:supabase={supabase} />

{/key}