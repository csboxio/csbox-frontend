<script lang="ts">
	import { supabaseClient } from '$lib/utilities/supabaseClient';
	import { goto, invalidateAll } from "$app/navigation";
	import { onMount, setContext } from "svelte";
	import '../app.css';
	import { get, readable, writable } from "svelte/store";
	import { page } from "$app/stores";
	import { notificationStore } from "../lib/stores/stores.js";

	/** @type {import('./$types').LayoutData} */
	export let data;
	export let notifications;
	// Create a store and update it when necessary...

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll();
			goto("/login");
		});


		notifications =
			supabaseClient
				.from('notifications')
				.select('*')
				.then(({error, data}) => notificationStore.set(data))

			// Add the subscription to the supabase client
			const channel = supabaseClient
				.channel('schema-db-changes')
				.on(
					'postgres_changes',
					{
						event: '*',
						schema: 'public',
						table: 'enrollment'
					},
					(payload) => {
						notificationStore.update(notifications => [...notifications, payload.new])
						console.log(notifications, payload.new)
					}
				)
				.subscribe()


		return () => {
			subscription.unsubscribe();
			channel.unsubscribe();
		};


	});

	//filter: `course_id=(SELECT id FROM courses WHERE created_by=eq.${$page.data.session?.user.id})`
</script>
<svelte:head>
	<meta charset="utf-8" />
	<meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport" />

	<title>CSBOX</title>
</svelte:head>
<slot />

