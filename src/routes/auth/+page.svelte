<script lang="ts">
	import { page } from '$app/stores';
	import {goto, invalidate, invalidateAll} from "$app/navigation";
	import Auth from "$lib/auth/Auth.svelte";
	import {browser} from "$app/environment";
	import {onMount} from "svelte";
	import {fade} from "svelte/transition";

	export let data


	let { supabase, onboard, session } = data
	$: ({ supabase, onboard, session } = data)

	let isSetupCompleted = onboard?.data.completed_setup

	let isAuthenticated
	$: isAuthenticated = $page.data.session;


	let view;
	$: view;

	if (browser) {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code')
		view = urlParams.get('view')

		if (!view) {
			view = 'sign_in';
		}

		if (code) {
			supabase.auth.exchangeCodeForSession(code);
			invalidate('supabase:auth');
		}
	}

	$: {
		if (isAuthenticated && browser) {
			console.log($page.data.session)
			//goto('/d');
		}
	}

	onMount(() => {
		if (isAuthenticated && browser) {
			//goto('/d');
		}
	})
</script>

{#key isAuthenticated}
	<Auth bind:supabase={supabase} view={view}/>
{/key}