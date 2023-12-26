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
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
				// delete cookies on sign out
				const expires = new Date(0).toUTCString()
				document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=None; secure`
				document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=None; secure`
			} else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
				const maxAge = 60 * 60 * 24
				if ("access_token" in session) {
					document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=None; secure`
				}
				if ("refresh_token" in session) {
					document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=None; secure`
				}
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