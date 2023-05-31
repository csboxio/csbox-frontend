<script lang="ts">
	import { supabaseClient } from '$lib/utilities/supabaseClient';
	import { goto, invalidateAll } from "$app/navigation";
	import { onMount, setContext } from "svelte";
	import '../app.css';
	import { browser } from "$app/environment";
	import {onLCP, onFID, onCLS} from 'web-vitals';


	if (browser) {

		onCLS(console.log);
		onFID(console.log);
		onLCP(console.log);
	}


	onMount(async () => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll();
			goto("/login");
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
