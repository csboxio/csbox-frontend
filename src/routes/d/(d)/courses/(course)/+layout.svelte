<script>
	import CourseNav from '$lib/components/CourseNav.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Settings from '$lib/components/Settings.svelte';
	import { page } from '$app/stores';
	import show_create_box from './[slug]/assignments/+page.svelte';
	import '$lib/quilljs.css';
	let model;
	let error = false;
	let courses = $page.data.courses.data;
	let course = courses.filter((course) => course.id === parseInt($page.data.slug))[0];
</script>

<body class="bg-gray-600 antialiased bg-body text-body font-body">
	<div class={show_create_box ? '' : 'filter blur-[1px]'}>
		<Navbar />
		<div class="mx-auto lg:ml-20">
			<section>
				<div class="pt-5 pb-6 px-8 dark:bg-gray-700 bg-white">
					<div class="flex flex-wrap items-center justify-between -mx-2">
						<div class="w-full lg:w-auto px-2 mb-6 lg:mb-0">
							<h4 class="text-xl font-bold dark:text-white  tracking-wide leading-7 mb-1">{course.course_title}</h4>
						</div>
						<div class="w-full lg:w-auto px-2">
							<Settings />
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
