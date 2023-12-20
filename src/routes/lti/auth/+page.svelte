<script lang="ts">
	import { page } from '$app/stores';
	import Auth from "$lib/components/Auth/Auth.svelte";
	import DeepLinking from "$lib/lti/DeepLinking.svelte";

	export let data

	let { supabase, claim, session } = data
	$: ({ supabase, claim, session } = data)
</script>

{session}
{$page.data.session}
{#key $page.data}
{#if !$page.data.session }
	<Auth bind:supabase={supabase} />
	{:else}
	<!-- TODO Assumes they are going to deeplinking which isn't always true. -->
	Session
{/if}
{/key}

