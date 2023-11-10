<script lang="ts">
	import { page } from '$app/stores';
	import Auth from "$lib/components/Auth/Auth.svelte";
	import {browser} from "$app/environment";
	import {onMount} from "svelte";
	import {invalidateAll} from "$app/navigation";

	export let data

	let { supabase } = data
	$: ({ supabase } = data)

	let email = '';
	let password = '';
	let user;

	const login = async () => {
		try {
			const { user, error } = await supabase.auth.signInWithPassword({ email, password });

			console.log('User:', user, error);
		} catch (error) {
			console.error('Login error:', error.message);
		}


			const { data, error } = await supabase.auth.refreshSession();
			console.log(data, error);

	};

	onMount(async () => {
		// Check if the user is already authenticated

	});

</script>


{#if !user }

	<div>
		<label for="email">Email:</label>
		<input type="email" bind:value={email} id="email" />

		<label for="password">Password:</label>
		<input type="password" bind:value={password} id="password" />

		<button on:click={login}>Login</button>
	</div>
	{:else}
		<script type="module">
			window.location.href = '/lti/deeplinking';
		</script>
{/if}

