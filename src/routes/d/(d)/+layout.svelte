<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import Notification from '$lib/components/NotificationBuilder.svelte';
	import { invalidateAll } from "$app/navigation";
	import { notifications } from "../../../lib/utilities/notifications.ts";
	import { addNotification } from "../../../lib/utilities/notifications.ts";
	import { get } from "svelte/store";
	import { courseStore } from "../../../lib/stores/stores.js";
	import { browser } from "$app/environment";

	export let data

	let { supabase, session, user } = data
	$: ({ supabase, session, user } = data)

	onMount(async () => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidateAll();
			goto("/login");
		});


		// TODO Optimization

		// Get the courses that the user created from browser store.

		const _courses = get(courseStore)

		// noinspection TypeScriptValidateTypes
		if (_courses && _courses.length > 0) {
			return courseStore;
		}

		if (browser) {
			const {data: courseData} = await supabase.from('courses')
				.select('id, inserted_at, course_image_url, course_title,' +
					' course_prefix, course_number, course_term');
			courseStore.set(courseData);
		}

		const result = courseStore
		let courses;
		const subscribe = result.subscribe(value => {
			courses = value;
		})

				const courseIDsList = courses.map(course => course.id);
				const courseMap = new Map(courses.map(course => [course.id, course.course_title]));

				// If the course id has something in it.
				if (courseIDsList) {
					// Add the subscription to the supabase client
					const channel = supabase
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



