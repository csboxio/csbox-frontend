<script lang="ts">
	import { supabaseClient } from '$lib/utilities/supabaseClient';
	import { goto, invalidateAll } from "$app/navigation";
	import { onMount, setContext } from "svelte";
	import '../app.css';
	import { get, readable, writable } from "svelte/store";
	import { page } from "$app/stores";
	import { notificationStore } from "$lib/stores/stores.js";
	import Notification from '$lib/components/Notification.svelte';
	import { each } from "svelte/internal";

	type Notification = {
		course_id: any,
		course_title: unknown,
		message: string
	}

	/** @type {import('./$types').LayoutData} */
	export let data;
	export let notifications;
	// Create a store and update it when necessary...
	let store_notification;

	function addNotification(notification: Notification) {
		console.log(notification)
	}

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll();
			goto("/login");
		});

		const notificationsStored = notificationStore.subscribe(value => {
			store_notification = value;
		});

				return () => {
					subscription.unsubscribe();
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
