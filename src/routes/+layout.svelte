<script lang="ts">
	import { supabaseClient } from '$lib/utilities/supabaseClient';
	import { goto, invalidateAll } from "$app/navigation";
	import { onMount } from "svelte";
	import '../app.css';


	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll();
			goto("/login");
		});
		return () => {
			subscription.unsubscribe();
		};

		const channel = supabaseClient
			.channel('schema-db-changes')
			.on(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'enrollment'
				},
				(payload) => console.log(payload)
			)
			.subscribe()

		channel;


	});

	//filter: `course_id=(SELECT id FROM courses WHERE created_by=eq.${$page.data.session?.user.id})`
</script>
<svelte:head>
	<meta charset="utf-8" />
	<meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport" />

	<title>CSBOX</title>
</svelte:head>

<slot />

