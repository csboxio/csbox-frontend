<script lang="ts">
	import { goto } from "$app/navigation";
	import {afterUpdate, onMount} from "svelte";
	import { page } from "$app/stores";
	import Notification from '$lib/components/NotificationBuilder.svelte';
	import { invalidateAll } from "$app/navigation";
	import { notifications } from "../../../lib/utilities/notifications.ts";
	import { addNotification } from "../../../lib/utilities/notifications.ts";
	import { get } from "svelte/store";
	import {checkedUserInfo, courseStore} from "../../../lib/stores/stores.js";
	import { browser } from "$app/environment";
	import ErrorBoundary from "$lib/components/ErrorBoundary.svelte";
	import {Modal} from "flowbite-svelte";

	export let data

	let finishProfile;

	let { supabase, session, user, claim } = data
	$: ({ supabase, session, user, claim } = data)

	onMount(async () => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidateAll();
			//goto("/");
		});


		// TODO this is terrible
		if($checkedUserInfo === 'false') {

			const _user = user.data;

			if (_user.first_name == '') {
				finishProfile = true;
			}

			checkedUserInfo.set('true')
		}


		// TODO Optimization

		// Get the courses that the user created from browser store.

		// TODO move to component
		let _courses = get(courseStore)

		onMount(() => {
			const storedCourses = localStorage.getItem('storedCourses');
			if (storedCourses) {
				_courses = JSON.parse(storedCourses);
			}
		})

		afterUpdate(() => {
			localStorage.setItem('storedCourses', JSON.stringify(_courses))
		})

		// noinspection TypeScriptValidateTypes
		if (_courses && _courses.length > 0) {
			return courseStore;
		}

		if (browser && session) {
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
								const courseTitle = courseMap.get(payload.all_notifications.course_id);
								if (courseTitle) {
									// Update the notification store with the new information.
									const newNotification =
										{
											title: courseTitle.toString(),
											message: "New student has enrolled."
										};
									addNotification(newNotification, supabase, $page.data.session.user)
									invalidateAll()
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

<ErrorBoundary>
<slot />
</ErrorBoundary>


<div class="fixed bottom-5 right-5 w-200 overflow-y-auto">
	{#each $notifications as notification, i}
		<div class="pt-1">
		<Notification title="{notification.title}" content="{notification.message}"/>
		</div>
	{/each}
</div>

<Modal bind:open={finishProfile} class="max-w-xs p-4" >
	<h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">Let's finish setting up your profile!</h1>
	<a href="d/profile" on:click={() => finishProfile = false} class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
		Settings
		<svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
			<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
		</svg>
	</a>
</Modal>

