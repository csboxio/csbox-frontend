<script lang="ts">
	import { page } from '$app/stores';
	import Chart from '$lib/components/Charts.svelte';
	import Settings from '$lib/components/Settings.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { fetchCourses } from "$lib/utilities/utils.js";
	import {onMount} from "svelte";
	import {navStore} from "../../../lib/stores/stores.js";
	import { fade, fly } from 'svelte/transition';
	import {browser} from "$app/environment";
	import {goto} from "$app/navigation";
	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		faA, faAngleDown, faAngleUp, faArrowDown, faArrowDown19, faArrowUp,
		faBook, faCarrot,
		faClipboard, faFileCircleExclamation, faFileCircleXmark,
		faPenToSquare,
		faPeopleGroup,
		faSchoolCircleCheck, faUserGraduate
	} from "@fortawesome/free-solid-svg-icons";
	import Metrics from "../../../lib/dashboard/Metrics.svelte";
	import GradeChart from "../../../lib/dashboard/GradeChart.svelte";
	import Notifications from "../../../lib/dashboard/Notifications.svelte";

	let avatarUrl;
	let updated;

	export let data

	let { supabase, claim, session, user } = data
	$: ({ supabase, claim, session, user } = data)


	export let fetchedCourses;
	$: courses = $fetchedCourses;

	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('d');
	});

	let dashboard;
	$: dashboard = $page.data.dashboard;

	let showMore;
	$: showMore = false;
</script>

<body class="dark:bg-gray-600  bg-gray-100 antialiased bg-body text-body font-body">
	<div>
		<Navbar />
		<div class="mx-auto lg:ml-16 ">
			<section>
				<div class="sm:py-3 py-1 px-8 dark:bg-gray-700 bg-white">
					<div class="flex flex-wrap items-center justify-between -mx-2">
						<div class="lg:w-auto px-2 my-1 sm:my-2  ">
							<h4 class="text-2xl font-bold dark:text-white  tracking-wide leading-7 mb-1">Dashboard</h4>
						</div>
						<div class=" lg:w-auto px-2">
						 <Settings bind:supabase={supabase} bind:user={user.data} />
					</div>
				</div>
				</div>
			</section>

			<section class="py-3 h-screen ">
				<div class="container px-4 mx-auto">

					{#if claim === 'instructor'}

						<Metrics />

						<GradeChart />

						<Notifications />

					{/if}
					{#if claim === 'student'}
						TODO Student Dashboard
						- Number of classes
						- Missing Assignments
						- Upcoming Assignments
						- Grade graphs
						- Recent submissions
						- Recent comments
						- Workspace Data
					{/if}

				</div>
			</section>
		</div>
	</div>
</body>

