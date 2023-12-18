<script lang="ts">
	import { page } from '$app/stores';
	import Auth from "$lib/components/Auth/Auth.svelte";
	import DeepLinking from "$lib/lti/DeepLinking.svelte";

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
	<Auth bind:supabase={supabase} />
	{:else}
	<script type="module">
		history.back()
	</script>
{/if}

