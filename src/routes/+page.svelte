<script lang="ts">
	import { page } from '$app/stores';
	import Account from '$lib/components/Account.svelte';
	import { getContext, onMount } from "svelte";
	import { notificationStore } from "../lib/stores/stores.js";
	import Auth from "$lib/components/Auth/Auth.svelte";
	import { goto, invalidateAll } from "$app/navigation";


	export let data

	let { supabase } = data
	$: ({ supabase } = data)

	const handleSignOut = async () => {
		await supabase.auth.signOut()
	}

	//let notifications = getContext($page.data.session);

	let notifications;

	onMount(() => {
		const unsubscribe = notificationStore.subscribe(value => {
			notifications = value;
		});

		return unsubscribe;
	});

</script>

{#if !data.session}
	<Auth bind:data={data} />
{:else}
	<h1>Welcome {data.session.user.email}</h1>
	<p>Edit account</p>

	<Account session={data.session} supabase={supabase}/>

	<div>
		<button class="button block" on:click={handleSignOut}> Sign Out </button>
	</div>
{/if}

