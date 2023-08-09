<script lang="ts">
	import { page } from '$app/stores';
	import Auth from "$lib/components/Auth/Auth.svelte";
	import {goto} from "$app/navigation";

	let user;
	let avatarUrl;
	let updated;

	export let data

	let { supabase, claim } = data
	$: ({ supabase, claim } = data)

	if ($page.data.session) {
		goto('/d')
	}


</script>
{#if !$page.data.session}

	<Auth bind:data={data} />

	{:else}
	<script type="module">
		window.location.href = '/d';
	</script>
{/if}
