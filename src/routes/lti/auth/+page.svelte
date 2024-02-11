<script lang="ts">
	import { page } from '$app/stores';
	import Auth from "$lib/auth/Auth.svelte";
	import DeepLinking from "$lib/lti/DeepLinking.svelte";
	import {browser} from "$app/environment";
	import {onMount} from "svelte";
	import {init} from "../../../lib/home/scripts/init.js";

	export let data

	let { supabase, session } = data
	$: ({ supabase, session } = data)
</script>


{#if !$page.data.session}
	<Auth bind:supabase={supabase} lti={true}/>
	{:else}
	<script type="module">
		history.back()
	</script>

{/if}




