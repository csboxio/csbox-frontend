<script lang="ts">
	import {onMount} from "svelte";
	import { invalidateAll } from "$app/navigation";
	import { browser } from "$app/environment";
	import ErrorBoundary from "$lib/components/ErrorBoundary.svelte";
	import {Modal} from "flowbite-svelte";

	export let data

	let finishProfile;

	let { supabase, session, user, claim } = data
	$: ({ supabase, session, user, claim } = data)

	if (user) {
		finishProfile = !user.data.completed_setup;
		if (user.data.completed_setup == false && browser && window.location.pathname !== "/d/profile/setup") {
			finishProfile = true
		}
	}

	onMount(async () => {
		const {
			data: {subscription}
		} = supabase.auth.onAuthStateChange(() => {
			invalidateAll();
			//goto("/");
		});
	});
</script>
<svelte:head>
	<meta charset="utf-8" />
	<meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport" />

	<title>CSBOX</title>
</svelte:head>

<ErrorBoundary>
<slot />
</ErrorBoundary>


