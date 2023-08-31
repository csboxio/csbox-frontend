<script lang="ts">
	import {onMount} from "svelte";
	import {navStore} from "../../../../../../../lib/stores/stores.js";
	import {page} from "$app/stores";
	import {updateCourseInsert} from "../../../../../../../lib/utilities/quill.js";
	export let data;
	import QuillBlock from "$lib/blocks/quillBlock.svelte";
	import InteractiveCodeBlock from "$lib/components/Course/lessons/InteractiveCodeBlock.svelte";
	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		faExclamation,
		faPause,
		faPeopleGroup,
		faPercent,
		faRefresh,
		faUserTimes
	} from "@fortawesome/free-solid-svg-icons";
	import {invalidateAll} from "$app/navigation";

	// QUILL
	let courses;
	$: courses = $page.data.courses.data;

	let course;
	$: course = courses.filter((course) => course.id === parseInt($page.data.slug))[0]

	let { supabase, claim, user } = data
	$: ({ supabase, claim, user } = data)

	let metrics;
	$: metrics = $page.data.metrics;

	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('courses');
	});

	let refreshing = false;

	async function refreshMetrics() {
		refreshing = true;
		const response = await fetch(`/api/metrics/refresh/?course=${$page.params.slug}`)
		console.log(response)
		if (response.ok) {
			refreshing = false;
			invalidateAll();
		}
	}
</script>

<div class="w-full">
	<section class="p-1 mt-4">
		<div class="container">

			<div>
				<button
						class="relative inline-flex items-center justify-center p-0.5 ml-0.5 mb-2 mr-2 overflow-hidden text-sm
				font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
				group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
				focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
						on:click={() => refreshMetrics()}>
				<span
						class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
					dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
					{#if refreshing}
						<div class="inline-block">
								<Fa icon={faRefresh} spin/>
						</div>
					{/if}
					<div class="inline-block">Refresh</div>
				</span>
				</button>
			</div>

			<div class="py-6 px-2 text-white font-semibold">
				{#key metrics}
					<div class="flex flex-wrap -mx-3 -mb-6">
					<div class=" md:w-1/2 lg:w-1/5 px-3 mb-6">
						<div class="max-w-sm mx-auto py-4 px-6 bg-gray-500 rounded-xl drop-shadow-xl">
							<div class="max-w-[15em] mx-auto text-center">
								<div class="flex mx-auto w-12 h-12 mb-4 items-center justify-center bg-blue-500 bg-opacity-20 text-blue-500 rounded-xl">
									<Fa icon={faPeopleGroup}></Fa>
								</div>
								<span class="text-xs text-gray-300 font-semibold">Students</span>
								<h4 class="text-2xl leading-8 text-gray-100 font-semibold">{metrics[0].num_people}</h4>
							</div>
						</div>
					</div>

					<div class=" md:w-1/2 lg:w-1/5 px-3 mb-6">
						<div class="max-w-sm mx-auto py-4 px-6 bg-gray-500 rounded-xl drop-shadow-xl">
							<div class="max-w-[15em] mx-auto text-center">
								<div class="flex mx-auto w-12 h-12 mb-4 items-center justify-center bg-blue-500 bg-opacity-20 text-blue-500 rounded-xl">
									<Fa icon={faPercent}></Fa>
								</div>
								<span class="text-xs text-gray-300 font-semibold">Average grade</span>
								<h4 class="text-2xl leading-8 text-gray-100 font-semibold">{metrics[0].avg_grade}%</h4>
							</div>
						</div>
					</div>

					<div class=" md:w-1/2 lg:w-1/5 px-3 mb-6">
						<div class="max-w-sm mx-auto py-4 px-6 bg-gray-500 rounded-xl drop-shadow-xl">
							<div class="max-w-[15em] mx-auto text-center">
								<div class="flex mx-auto w-12 h-12 mb-4 items-center justify-center bg-blue-500 bg-opacity-20 text-blue-500 rounded-xl">
									<Fa icon={faUserTimes}></Fa>
								</div>
								<span class="text-xs text-gray-300 font-semibold">Ungraded assignments</span>
								<h4 class="text-2xl leading-8 text-gray-100 font-semibold">{metrics[0].num_ungraded}</h4>
							</div>
						</div>
					</div>

					<div class=" md:w-1/2 lg:w-1/5 px-3 mb-6">
						<div class="max-w-sm mx-auto py-4 px-6 bg-gray-500 rounded-xl drop-shadow-xl">
							<div class="max-w-[15em] mx-auto text-center">
								<div class="flex mx-auto w-12 h-12 mb-4 items-center justify-center bg-blue-500 bg-opacity-20 text-blue-500 rounded-xl">
									<Fa icon={faExclamation}></Fa>
								</div>
								<span class="text-xs text-gray-300 font-semibold">Late assignments</span>
								<h4 class="text-2xl leading-8 text-gray-100 font-semibold">{metrics[0].num_late}</h4>
							</div>
						</div>
					</div>

					</div>

					<div class="mt-6">
						<div class="flex flex-wrap -mx-3 ">
							<div class="w-full lg:w-1/3 px-3 mb-6 lg:mb-0">
								<div class="h-full py-6 px-4 sm:px-6 bg-gray-500 rounded-xl drop-shadow-xl">
									<h4 class="text-lg text-gray-100 font-semibold mb-6">Top 5 Students</h4>

									{#each metrics[0].top_students as student}
									<a class="flex p-4 items-center justify-between hover:bg-gray-600 rounded-xl transition duration-150"
									   href={'#'}>
										<div class="flex items-center pr-2">
											<div class="flex w-10 h-10 mr-3 items-center justify-center bg-gray-400 bg-opacity-20 text-blue-500 rounded-xl">
												<img alt="" src="" />
											</div>
											<div>
												<h5 class="text-sm text-gray-100 leading-5 font-medium mb-1">{student}</h5>
												<p class="text-xs text-gray-300 font-semibold">Placeholder</p>
											</div>
										</div>
										<svg
												fill="none"
												height="18"
												viewbox="0 0 4 18"
												width="4"
												xmlns="http://www.w3.org/2000/svg">
											<path d="M2 4C2.39556 4 2.78224 3.8827 3.11114 3.66294C3.44004 3.44318 3.69639 3.13082 3.84776 2.76537C3.99914 2.39992 4.03874 1.99778 3.96157 1.60982C3.8844 1.22186 3.69392 0.865492 3.41421 0.585787C3.13451 0.306082 2.77814 0.115601 2.39018 0.0384303C2.00222 -0.0387401 1.60009 0.000866562 1.23463 0.152242C0.869182 0.303617 0.556825 0.559962 0.337062 0.88886C0.117299 1.21776 1.07779e-06 1.60444 1.07779e-06 2C1.07779e-06 2.53043 0.210715 3.03914 0.585788 3.41421C0.960861 3.78929 1.46957 4 2 4ZM2 14C1.60444 14 1.21776 14.1173 0.888861 14.3371C0.559963 14.5568 0.303617 14.8692 0.152242 15.2346C0.000866562 15.6001 -0.0387401 16.0022 0.0384303 16.3902C0.115601 16.7781 0.306083 17.1345 0.585788 17.4142C0.865493 17.6939 1.22186 17.8844 1.60982 17.9616C1.99778 18.0387 2.39992 17.9991 2.76537 17.8478C3.13082 17.6964 3.44318 17.44 3.66294 17.1111C3.8827 16.7822 4 16.3956 4 16C4 15.4696 3.78929 14.9609 3.41421 14.5858C3.03914 14.2107 2.53043 14 2 14ZM2 7C1.60444 7 1.21776 7.1173 0.888861 7.33706C0.559963 7.55682 0.303617 7.86918 0.152242 8.23463C0.000866562 8.60009 -0.0387401 9.00222 0.0384303 9.39018C0.115601 9.77814 0.306083 10.1345 0.585788 10.4142C0.865493 10.6939 1.22186 10.8844 1.60982 10.9616C1.99778 11.0387 2.39992 10.9991 2.76537 10.8478C3.13082 10.6964 3.44318 10.44 3.66294 10.1111C3.8827 9.78224 4 9.39556 4 9C4 8.46957 3.78929 7.96086 3.41421 7.58579C3.03914 7.21071 2.53043 7 2 7Z" fill="#3D485B"/>
										</svg>
									</a>
									{/each}
								</div>
							</div>
						</div>
					</div>

					<div class="mt-6">
						<div class="flex flex-wrap -mx-3 ">
							<div class="w-full lg:w-1/3 px-3 mb-6 lg:mb-0">
								<div class="h-full py-6 px-4 sm:px-6 bg-gray-500 rounded-xl drop-shadow-xl">
									<h4 class="text-lg text-gray-100 font-semibold mb-6">Bottom 5 Students</h4>

									{#each metrics[0].bottom_students as student}
										<a class="flex p-4 items-center justify-between hover:bg-gray-600 rounded-xl transition duration-150"
										   href={'#'}>
											<div class="flex items-center pr-2">
												<div class="flex w-10 h-10 mr-3 items-center justify-center bg-gray-400 bg-opacity-20 text-blue-500 rounded-xl">
													<img alt="" src="" />
												</div>
												<div>
													<h5 class="text-sm text-gray-100 leading-5 font-medium mb-1">{student}</h5>
													<p class="text-xs text-gray-300 font-semibold">Placeholder</p>
												</div>
											</div>
											<svg
													fill="none"
													height="18"
													viewbox="0 0 4 18"
													width="4"
													xmlns="http://www.w3.org/2000/svg">
												<path d="M2 4C2.39556 4 2.78224 3.8827 3.11114 3.66294C3.44004 3.44318 3.69639 3.13082 3.84776 2.76537C3.99914 2.39992 4.03874 1.99778 3.96157 1.60982C3.8844 1.22186 3.69392 0.865492 3.41421 0.585787C3.13451 0.306082 2.77814 0.115601 2.39018 0.0384303C2.00222 -0.0387401 1.60009 0.000866562 1.23463 0.152242C0.869182 0.303617 0.556825 0.559962 0.337062 0.88886C0.117299 1.21776 1.07779e-06 1.60444 1.07779e-06 2C1.07779e-06 2.53043 0.210715 3.03914 0.585788 3.41421C0.960861 3.78929 1.46957 4 2 4ZM2 14C1.60444 14 1.21776 14.1173 0.888861 14.3371C0.559963 14.5568 0.303617 14.8692 0.152242 15.2346C0.000866562 15.6001 -0.0387401 16.0022 0.0384303 16.3902C0.115601 16.7781 0.306083 17.1345 0.585788 17.4142C0.865493 17.6939 1.22186 17.8844 1.60982 17.9616C1.99778 18.0387 2.39992 17.9991 2.76537 17.8478C3.13082 17.6964 3.44318 17.44 3.66294 17.1111C3.8827 16.7822 4 16.3956 4 16C4 15.4696 3.78929 14.9609 3.41421 14.5858C3.03914 14.2107 2.53043 14 2 14ZM2 7C1.60444 7 1.21776 7.1173 0.888861 7.33706C0.559963 7.55682 0.303617 7.86918 0.152242 8.23463C0.000866562 8.60009 -0.0387401 9.00222 0.0384303 9.39018C0.115601 9.77814 0.306083 10.1345 0.585788 10.4142C0.865493 10.6939 1.22186 10.8844 1.60982 10.9616C1.99778 11.0387 2.39992 10.9991 2.76537 10.8478C3.13082 10.6964 3.44318 10.44 3.66294 10.1111C3.8827 9.78224 4 9.39556 4 9C4 8.46957 3.78929 7.96086 3.41421 7.58579C3.03914 7.21071 2.53043 7 2 7Z" fill="#3D485B"/>
											</svg>
										</a>
									{/each}
								</div>
							</div>
						</div>
					</div>
				{/key}
			</div>
		</div>

	</section>
</div>


