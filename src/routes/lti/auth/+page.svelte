<script lang="ts">
	import { page } from '$app/stores';
	import Auth from "$lib/components/Auth/Auth.svelte";
	import DeepLinking from "$lib/lti/DeepLinking.svelte";

	export let data

	let { supabase, claim, session, lms_user_id } = data
	$: ({ supabase, claim, session, lms_user_id } = data)
</script>

{#key $page.data}
{#if !$page.data.session}
	<Auth bind:supabase={supabase} />
	{:else}
	Valid Sesssion
	{#if lms_user_id}
		lms_user_id
		{:else}
		No valid LMS user ID.
	{/if}
{/if}
{/key}

