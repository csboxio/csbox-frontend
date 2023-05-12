<script lang="ts">
	import { supabaseClient } from '$lib/utilities/supabaseClient';
	import { invalidateAll } from '$app/navigation';
	import { getContext, onMount, setContext } from "svelte";
	import '../app.css';
	import { courseStore } from "../lib/stores/stores.js";
	import { page } from "$app/stores";


	setContext($page.data.user, courseStore)

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll();
		});
		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport" />

	<title>CSBOX</title>
</svelte:head>

<slot />
