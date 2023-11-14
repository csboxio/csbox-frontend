<script lang="ts">
	import { page } from '$app/stores';
	import Auth from "$lib/components/Auth/Auth.svelte";
	import {browser} from "$app/environment";

	export let data

	let { supabase, claim, onboard } = data
	$: ({ supabase, claim, onboard } = data)

	let completed_setup
	$: completed_setup
	try {
		completed_setup = onboard?.data.completed_setup
	}
	catch (e) {
		console.log(e)
	}

</script>


{#if !$page.data.session }

	<Auth bind:data={data} />
	{:else}
	{#if completed_setup === false}
		<script type="module">
			window.location.href = '/onboarding';
		</script>
		{:else}
		<script type="module">
			window.location.href = '/d';
		</script>
	{/if}
{/if}

