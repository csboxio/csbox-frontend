<script lang="ts">
	import { goto, invalidate, invalidateAll } from "$app/navigation";
	import { onMount, setContext } from "svelte";
	import '../app.css';
	import { browser } from "$app/environment";
	import {onLCP, onFID, onCLS} from 'web-vitals';
	import { page } from "$app/stores";


	if (browser) {

		//onCLS(console.log);
		//onFID(console.log);
		//onLCP(console.log);
	}

	export let data

	let { supabase, session, user } = data
	$: ({ supabase, session, user } = data)

	onMount(async () => {

		await supabase.auth.getSession()

		const { data: { subscription } } = await supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}

		})

		return () => subscription.unsubscribe()
	});

</script>
<svelte:head>
	<meta charset="utf-8" />
	<meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport" />

	<title>CSBOX</title>
</svelte:head>

<slot />