<script lang="ts">
	import { page } from '$app/stores';
	import Auth from "$lib/components/Auth/Auth.svelte";
	import {browser} from "$app/environment";

	export let data

	let { supabase, claim } = data
	$: ({ supabase, claim  } = data)


	const sendTokenToParent = (token) => {
		window.opener.postMessage({ type: 'authentication_token', token }, 'https://joint-dear-lamb.ngrok-free.app');
		window.close();
	};

	if ($page.data.session) {
		const userSession = {'access_token': $page.data.session.access_token,
			'refresh_token': $page.data.session.refresh_token};
		(sendTokenToParent(userSession))
	}
</script>


{#if !$page.data.session }

	<Auth bind:data={data} />
	{:else}
	Session Found
{/if}

