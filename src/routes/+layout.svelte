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

		const { data, error } = await supabase.auth.getSession()

		const { data: { subscription } } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
			// Testing this.
			if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
				// delete cookies on sign out
				const expires = new Date(0).toUTCString()
				document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
				document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`
			} else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
				const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
				document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
				document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
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