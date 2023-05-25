<script lang="ts">
	import { supabaseClient } from '$lib/utilities/supabaseClient';
	import { goto, invalidateAll } from "$app/navigation";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import Notification from '$lib/components/Notification.svelte';
	import { fetchCourses } from "$lib/utilities/utils"
	import { error } from "@sveltejs/kit";

	type Notification = {
		course_id: any,
		course_title: unknown,
		message: string
	}

	// Create a store and update it when necessary...
	let notifications: any[] = [];
	$: notifications;
	let show_notification = false;

	function addNotification(notification: Notification) {
		show_notification = true;
		invalidateAll()
	}

	onMount(async () => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll();
			goto("/login");
		});

		// TODO Optimization

		// Get the courses that the user created from browser store.
		const result = await fetchCourses(fetch)
		let courses;
		const subscribe = result.subscribe(value => {
			courses = value;
		})

				const courseIDsList = courses.map(course => course.id);
				const courseMap = new Map(courses.map(course => [course.id, course.course_title]));

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
									const newNotification: Notification =
										{
											course_id: payload.new.course_id,
											course_title: courseTitle,
											message: "New student has enrolled."
										};

									//console.log(newNotification)
									notifications.push(newNotification)
									notifications = notifications;
									addNotification(newNotification)
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
</script>
<svelte:head>
	<meta charset="utf-8" />
	<meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport" />

	<title>CSBOX</title>
</svelte:head>
<slot />

{#if show_notification}
	{#key notifications}
	{#each notifications as notification}
	<Notification title="{notification.course_title}" content="{notification.message}"/>
	{/each}
		{/key}
{/if}

