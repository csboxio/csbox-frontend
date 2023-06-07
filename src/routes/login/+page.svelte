<script lang="ts">
	import { page } from '$app/stores';
	import Auth from '$lib/components/Auth.svelte';
	import { goto } from "$app/navigation";

	let loading = false;
	if ($page.data.session) {
		goto("/")
	}

</script>

{#if !$page.data.session}
	<Auth />
{/if}
