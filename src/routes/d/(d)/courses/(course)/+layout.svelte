<script>
	import CourseNav from '$lib/components/CourseNav.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Settings from '$lib/components/Settings.svelte';
	import {page} from '$app/stores';
	import show_create_box from './[slug]/assignments/+page.svelte';
	import '$lib/quilljs.css';
	import {browser} from "$app/environment";
	import {courseNavStore} from "$lib/stores/stores.ts";
	import Fa from 'svelte-fa/src/fa.svelte';
	import {faArrowRight} from '@fortawesome/free-solid-svg-icons';

	let courses = $page.data.courses.data;
	let course = courses.filter((course) => course.id === parseInt($page.data.slug))[0];
	export let data

	let { supabase, claim } = data
	$: ({ supabase, claim } = data)

	let pathname = '';
	let extractedName = '';

	function extractNameFromPath() {
		pathname = $page.url.pathname;
		const pathnameParts = pathname.split("/");
		if (pathnameParts.length > 4 && browser) {
			return pathnameParts[4].charAt(0).toUpperCase() + pathnameParts[4].substring(1)
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
							<h4 class="text-lg font-bold dark:text-white leading-7 mb-1 inline-block text-gray-100 inline-block">{course.course_title}</h4>
							<div class="inline-block text-white">
								<Fa icon={faArrowRight} size="xs" />
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
					<CourseNav claim={claim}/>
				</aside>
					<slot />
			</div>
		</div>
	</div>
</body>
