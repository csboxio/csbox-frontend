<script lang="ts">
	import { supabaseClient } from '$lib/utilities/supabaseClient';
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import Notification from '$lib/components/NotificationBuilder.svelte';
	import { fetchCourses } from "$lib/utilities/utils"
	import { invalidateAll } from "$app/navigation";
	import { notifications } from "../../../lib/utilities/notifications.ts";
	import { addNotification } from "../../../lib/utilities/notifications.ts";

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
									const newNotification =
										{
											title: courseTitle.toString(),
											message: "New student has enrolled."
										};
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


	{#each $notifications as notification}
	<Notification title="{notification.title}" content="{notification.message}"/>
	{/each}



