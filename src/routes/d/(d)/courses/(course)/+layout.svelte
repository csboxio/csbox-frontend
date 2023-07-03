<script>
	import CourseNav from '$lib/components/CourseNav.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Settings from '$lib/components/Settings.svelte';
	import {page} from '$app/stores';
	import show_create_box from './[slug]/assignments/+page.svelte';
	import '$lib/quilljs.css';
	import {beforeUpdate, onMount} from "svelte";
	import {browser} from "$app/environment";
	import {courseNavStore} from "$lib/stores/stores.ts";
	import {Breadcrumb, BreadcrumbItem} from "flowbite-svelte";

	let model;
	let error = false;
	let courses = $page.data.courses.data;
	let course = courses.filter((course) => course.id === parseInt($page.data.slug))[0];
	export let data

	let { supabase } = data
	$: ({ supabase } = data)

	let pathname = '';
	let extractedName = '';

	function extractNameFromPath() {
		pathname = $page.url.pathname;
		var pathnameParts = pathname.split("/");
		console.log(pathnameParts.length )
		if (pathnameParts.length > 4 && browser) {
			let thing = pathnameParts[4].charAt(0).toUpperCase() + pathnameParts[4].substring(1);
			console.log(thing)
			return thing
		}
		else {
			return "Home"
		}
	}

	$: {
		extractedName = extractNameFromPath()
	}
</script>

<body class="bg-gray-600 antialiased bg-body text-body font-body">
	<div class={show_create_box ? '' : 'filter blur-[1px]'}>
		<Navbar />
		<div class="mx-auto lg:ml-16">
			<section>
				<div class="pt-3 pb-3 px-8 dark:bg-gray-700 bg-white">
					<div class="flex flex-wrap items-center justify-between -mx-2">
						<div class="w-full lg:w-auto px-2 mb-6 lg:mb-0">
							<h4 class="text-lg font-bold dark:text-white leading-7 mb-1 inline-block text-gray-100">{course.course_title}</h4>
							<div class="inline-block px-1">
								<svg xmlns="http://www.w3.org/2000/svg" height="0.75em" viewBox="0 0 448 512" class="fill-gray-600"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
							</div>
								<h4 class="text-lg font-bold dark:text-white   leading-7 mb-1 inline-block">  {$courseNavStore ? $courseNavStore : extractedName}</h4>
						</div>
						<div class="w-full lg:w-auto px-2">
							<Settings bind:data={data} />
						</div>
					</div>
				</div>
			</section>
			<div class="flex flex-row ">
				<aside class="h-screen sticky top-0">
					<CourseNav />
				</aside>


					<slot />

			</div>
		</div>
	</div>
</body>
