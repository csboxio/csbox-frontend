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

</script>


{#if !user }
	<form method="POST" action="?/login">
		<label for="email">Email:</label>
		<input type="email" bind:value={email} id="email" />

		<label for="password">Password:</label>
		<input type="password" bind:value={password} id="password" />

		<button type="submit">Login</button>
	</form>
	{:else}
		<script type="module">
			window.location.href = '/lti/deeplinking';
		</script>
{/if}

