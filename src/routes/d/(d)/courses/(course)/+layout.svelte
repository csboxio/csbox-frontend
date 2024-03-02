<script>
	import CourseNav from '$lib/components/CourseNav.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Settings from '$lib/components/Settings.svelte';
	import {page} from '$app/stores';
	import show_create_box from './[slug]/assignments/+page.svelte';
	import '$lib/quilljs.css';
	import {browser} from "$app/environment";
	import Fa from 'svelte-fa/src/fa.svelte';
	import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
	import {afterUpdate, onMount, tick} from "svelte";

	let courses = $page.data.courses.data;
	let course = courses.filter((course) => course.id === parseInt($page.data.slug))[0];

	export let data

	let { supabase, claim } = data
	$: ({ supabase, claim } = data)

	let pathname = '';
	let extractedName;

	let user;
	$: user = $page.data.user

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
	afterUpdate(() => {
		extractedName = extractNameFromPath();
	});
</script>

<body class="bg-gray-600 antialiased bg-body text-body font-body">
	<div class={show_create_box ? '' : 'filter blur-[1px]'}>
		<Navbar bind:claim={claim}/>
		<div class="mx-auto lg:ml-16">
			<section>
				<div class="sm:py-3 py-1 px-8 dark:bg-gray-700 bg-white">
					<div class="flex flex-wrap items-center justify-between -mx-2">
						<div class="lg:w-auto px-2 my-1 sm:my-2">
							{#if browser}
							<h4 class="text-lg font-bold dark:text-white text-black leading-7 mb-1 inline-block text-gray-100 inline-block">{course?.course_title}</h4>
							<div class="inline-block dark:text-white text-black">
								<Fa icon={faArrowRight} size="xs" />
							</div>
							{#key extractedName}
							<h4 class="text-lg font-bold dark:text-white   leading-7 mb-1 inline-block">  {extractedName}</h4>
							{/key}
							{/if}
						</div>
						<div class="lg:w-auto px-2">
							<Settings bind:supabase={supabase} bind:user={user.data} bind:claim={claim}/>
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
