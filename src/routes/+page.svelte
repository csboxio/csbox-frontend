<script lang="ts">
	import { page } from '$app/stores';
	import Account from '$lib/components/Account.svelte';
	import Auth from '$lib/components/Auth.svelte';
	import { getContext, onMount } from "svelte";
	import { notificationStore } from "../lib/stores/stores.js";


	//let notifications = getContext($page.data.session);

	let notifications;

	onMount(() => {
		const unsubscribe = notificationStore.subscribe(value => {
			notifications = value;
		});

		return unsubscribe;
	});
</script>

{#if !$page.data.session}
	<Auth />
{:else}
	<h1>Welcome {$page.data.session.user.email}</h1>
	<p>Edit account</p>

	<Account session={$page.data.session} />

{/if}

{notifications}
{#if notifications}
	{#each notifications as {id, content, title}}
		{id} {content} {title}
	{/each}
{:else}
	Loading
{/if}
