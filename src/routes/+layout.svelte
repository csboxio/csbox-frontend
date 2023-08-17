<script lang="ts">
	import { goto, invalidate, invalidateAll } from "$app/navigation";
	import { onMount, setContext } from "svelte";
	import '../app.css';
	import { browser } from "$app/environment";
	import {onLCP, onFID, onCLS} from 'web-vitals';
	import { page } from "$app/stores";
	import {checkedUserInfo} from "../lib/stores/stores.js";


	if (browser) {

		//onCLS(console.log);
		//onFID(console.log);
		//onLCP(console.log);
	}

	export let data

	let { supabase, session, user } = data
	$: ({ supabase, session, user } = data)



	onMount(() => {

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => subscription.unsubscribe()
	});

	if (browser) {
		const urlParams = new URLSearchParams(window.location.search);

		const code = urlParams.get('code')

		if (code) {
			goto('/auth')
		}
	}


</script>
<svelte:head>
	<meta charset="utf-8" />
	<meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport" />

	<title>CSBOX</title>
</svelte:head>

<slot />