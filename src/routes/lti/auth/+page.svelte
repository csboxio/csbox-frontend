<script lang="ts">
	import { page } from '$app/stores';
	import Auth from "$lib/components/Auth/Auth.svelte";
	import DeepLinking from "$lib/lti/DeepLinking.svelte";

	export let data

	let { supabase, session } = data
	$: ({ supabase, session } = data)


</script>


{#if !$page.data.session}
	<Auth bind:supabase={supabase} />
	{:else}
	{history.back()}

{/if}


