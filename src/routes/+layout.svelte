<script lang="ts">
	import { supabaseClient } from '$lib/utilities/supabaseClient';
	import { goto, invalidateAll } from "$app/navigation";
	import { onMount, setContext } from "svelte";
	import '../app.css';
	import { get, readable, writable } from "svelte/store";
	import { page } from "$app/stores";
	import { notificationStore } from "../lib/stores/stores.js";
	import Notification from '$lib/components/Notification.svelte';
	import { each } from "svelte/internal";

	/** @type {import('./$types').LayoutData} */
	export let data;
	export let notifications;
	// Create a store and update it when necessary...
	let store_notification;

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

		// Get the courses that the user created.
		// TODO Optimization this runs on each page.
		supabaseClient
			.from('courses')
			.select('id, course_title')
			.eq('created_by', $page.data.session?.user.id)
			.then(({ data: courses }) => {
				const courseIDsList = courses.map(course => course.id);
				const courseMap = new Map(courses.map(course => [course.id, course.course_title]));

				console.log(courses)
				// Get the notifications table
				notifications =
					supabaseClient
						.from('notifications')
						.select('*')
						.then(({error, data}) => notificationStore.set(data))

				// If the course id has something in it.
				if (courseIDsList) {
					// Add the subscription to the supabase client
					const channel = supabaseClient
						.channel('schema-db-changes')
						.on(
							'postgres_changes',
							{
								event: 'INSERT',
								schema: 'public',
								table: 'enrollment',
								// Filter only the courses that the user created.
								filter: `course_id=in.(${courseIDsList})`
							},
							(payload) => {
								const courseTitle = courseMap.get(payload.new.course_id);
								if (courseTitle) {
									// Update the notification store with the new information.
									const newNotification = { ...payload.new, course_title: courseTitle, message: "New student has enrolled." };

									notificationStore.update(notifications => [...notifications, newNotification])
									invalidateAll();
								}
							}
						)
						.subscribe()
					return () => {
						subscription.unsubscribe();
						channel.unsubscribe();
					};
				}

				return () => {
					subscription.unsubscribe();
				};

			});


	});

	//filter: `course_id=(SELECT id FROM courses WHERE created_by=eq.${$page.data.session?.user.id})`
</script>
<svelte:head>
	<meta charset="utf-8" />
	<meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport" />

	<title>CSBOX</title>
</svelte:head>
<slot />
{#if store_notification}
	{#each store_notification as notification}
	<Notification title="{notification.course_title}" content="{notification.message}"/>
	{/each}
{/if}
