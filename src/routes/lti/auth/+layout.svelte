<script lang="ts">
	import ErrorBoundary from "$lib/components/ErrorBoundary.svelte";
	import {onMount} from "svelte";
	import {invalidate, invalidateAll} from "$app/navigation";
	import {page} from "$app/stores";
	export let data

	let { supabase, session, user, claim } = data
	$: ({ supabase, session, user, claim } = data)


</script>
<svelte:head>
	<meta charset="utf-8" />
	<meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport" />

	<title>CSBOX</title>
</svelte:head>

<ErrorBoundary>
<slot />
</ErrorBoundary>


