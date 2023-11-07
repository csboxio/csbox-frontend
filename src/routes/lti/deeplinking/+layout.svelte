<script lang="ts">
	import ErrorBoundary from "$lib/components/ErrorBoundary.svelte";
	import {onMount} from "svelte";
	import {invalidate} from "$app/navigation";

	export let data
	let { supabase, session, user, claim } = data
	$: ({ supabase, session, user, claim } = data)

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
</script>
<svelte:head>
	<meta charset="utf-8" />
	<meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport" />

	<title>CSBOX - LTI launch</title>
</svelte:head>

<ErrorBoundary>
<slot />
</ErrorBoundary>

