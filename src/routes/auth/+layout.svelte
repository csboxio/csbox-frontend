<script lang="ts">
	import {onMount} from "svelte";
	import {invalidate, invalidateAll} from "$app/navigation";
	import { browser } from "$app/environment";
	import ErrorBoundary from "$lib/components/ErrorBoundary.svelte";
	import {Modal} from "flowbite-svelte";

	export let data

	let finishProfile;

	let { supabase, session, user } = data
	$: ({ supabase, session, user } = data)
</script>
<svelte:head>
	<meta charset="utf-8" />
	<meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport" />

	<title>CSBOX</title>
</svelte:head>

<ErrorBoundary>
<slot />
</ErrorBoundary>


