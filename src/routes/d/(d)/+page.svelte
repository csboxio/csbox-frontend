<script lang="ts">
	import { page } from '$app/stores';
	import Chart from '$lib/components/Charts.svelte';
	import Settings from '$lib/components/Settings.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { fetchCourses } from "$lib/utilities/utils.js";
	import Auth from "$lib/components/Auth/Auth.svelte";
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

	if ($page.data.user.data.completed_setup === false) {
		goto('/onboarding')
	}

	let showMore;
	$: showMore = false;
</script>

<!--{JSON.stringify($page.data)}-->
{#if !$page.data.session}
	<script type="module">
		window.location.href = '/auth';
	</script>
{:else}
<body class="dark:bg-gray-600  bg-gray-100 antialiased bg-body text-body font-body">
	<div>
		<Navbar />
		<div class="mx-auto lg:ml-16 ">
			<section>
				<div class="pt-3 pb-3 px-8 dark:bg-gray-700 bg-white">
					<div class="flex flex-wrap items-center justify-between -mx-2">
						<div class="w-full lg:w-auto px-2 mb-6 lg:mb-0">
							<h4 class="text-2xl font-bold dark:text-white  tracking-wide leading-7 mb-1">Dashboard</h4>
						</div>
						<div class="w-full lg:w-auto px-2">
						 <Settings bind:supabase={supabase} bind:user={user.data} />
					</div>
				</div>
				</div>
			</section>

			<section class="py-3 h-screen ">
				<div class="container px-4 mx-auto">

					{#if claim === 'instructor'}

						<!--<button in:fade out:fade on:click={() => toggleBlur()}
								class="{blurred ? 'absolute top-1/2 left-1/2 -transform-x-1/2 -translate-y-1/2' : 'absolute top-5 left-1/2'} flex items-center px-2 py-2 border bg-gray-700  border-red-600 rounded-md shadow z-50">
							<div class="text-red-500 px-2 font-semibold"> {blurred ? 'SHOW' : 'HIDE' } </div>

						</button>-->


						<div class="mb-5">
							<div class="flex flex-wrap -mx-3 -mb-6">

								<div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6 ">
									<div class="max-w-sm mx-auto py-8 px-6 bg-gray-500 rounded-xl drop-shadow-xl">
										<div class="max-w-xs mx-auto text-center">
											<div class="flex mx-auto w-12 h-12 mb-4 items-center justify-center bg-blue-500 bg-opacity-20 text-blue-500 rounded-xl">
												<Fa icon={faBook} size="lg"></Fa>
											</div>
											<span class="text-xs text-gray-300 font-semibold">Courses</span>
											{#if dashboard}
											<h4 class="text-2xl leading-8 text-gray-100 font-semibold mb-4">{dashboard[0].num_courses}</h4>
											{/if}
											<div class="flex flex-wrap items-center justify-center -m-1">
												<!--<div class="w-auto p-1">
													<span
														class="inline-block py-1 px-2 text-xs text-green-500 font-medium bg-teal-900 rounded-full"
														>1,0%</span
													>
												</div>
												<div class="w-auto p-1">
													<span class="text-xs text-gray-300 font-medium">Since last month</span>
												</div>-->
											</div>
										</div>
									</div>
								</div>

								<div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6 ">
									<div class="max-w-sm mx-auto py-8 px-6 bg-gray-500 rounded-xl drop-shadow-xl">
										<div class="max-w-xs mx-auto text-center">
											<div class="flex mx-auto w-12 h-12 mb-4 items-center justify-center bg-blue-500 bg-opacity-20 text-blue-500 rounded-xl">
												<Fa icon={faPeopleGroup} size="lg"></Fa>
											</div>
											<span class="text-xs text-gray-300 font-semibold">Students </span>
											{#if dashboard}
											<h4 class="text-2xl leading-8 text-gray-100 font-semibold mb-4">{dashboard[0].total_num_people}</h4>
											{/if}
											<div class="flex flex-wrap items-center justify-center -m-1">
												<!--<div class="w-auto p-1">
													<span
														class="inline-block py-1 px-2 text-xs text-green-500 font-medium bg-teal-900 rounded-full"
														>1,0%</span
													>
												</div>
												<div class="w-auto p-1">
													<span class="text-xs text-gray-300 font-medium">Since last month</span>
												</div>-->
											</div>
										</div>
									</div>
								</div>

								<div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6 ">
									<div class="max-w-sm mx-auto py-8 px-6 bg-gray-500 rounded-xl drop-shadow-xl">
										<div class="max-w-xs mx-auto text-center">
											<div class="flex mx-auto w-12 h-12 mb-4 items-center justify-center bg-blue-500 bg-opacity-20 text-blue-500 rounded-xl">
												<Fa icon={faFileCircleXmark} size="lg"></Fa>
											</div>
											<span class="text-xs text-gray-300 font-semibold">Missing Assignments</span>
											{#if dashboard}
											<h4 class="text-2xl leading-8 text-gray-100 font-semibold mb-4">{dashboard[0].total_num_missing}</h4>
											{/if}
											<div class="flex flex-wrap items-center justify-center -m-1">
												<!--<div class="w-auto p-1">
													<span
														class="inline-block py-1 px-2 text-xs text-green-500 font-medium bg-teal-900 rounded-full"
														>1,0%</span
													>
												</div>
												<div class="w-auto p-1">
													<span class="text-xs text-gray-300 font-medium">Since last month</span>
												</div>-->
											</div>
										</div>
									</div>
								</div>

								<div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6 ">
									<div class="max-w-sm mx-auto py-8 px-6 bg-gray-500 rounded-xl drop-shadow-xl">
										<div class="max-w-xs mx-auto text-center">
											<div class="flex mx-auto w-12 h-12 mb-4 items-center justify-center bg-blue-500 bg-opacity-20 text-blue-500 rounded-xl">
												<Fa icon={faUserGraduate} size="lg"></Fa>
											</div>
											<span class="text-xs text-gray-300 font-semibold">Average Grade</span>
											{#if dashboard}
											<h4 class="text-2xl leading-8 text-gray-100 font-semibold mb-4">{dashboard[0].avg_avg_grade}%</h4>
											{/if}
											<div class="flex flex-wrap items-center justify-center -m-1">
												<!--<div class="w-auto p-1">
													<span
														class="inline-block py-1 px-2 text-xs text-green-500 font-medium bg-teal-900 rounded-full"
														>1,0%</span
													>
												</div>
												<div class="w-auto p-1">
													<span class="text-xs text-gray-300 font-medium">Since last week</span>
												</div>-->
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="text-center justify-center flex mt-4 mx-auto">
								<div>
								<button type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
		focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600
		dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" on:click={() => {showMore = !showMore;}}>
									<div class="inline-block">{showMore === true ? 'Hide' : 'More'}</div>
									{#if showMore}
										<div class="inline-block ml-2"><Fa icon={faAngleUp} size="lg"></Fa></div>
									{:else}
										<div class="inline-block ml-2"><Fa icon={faAngleDown} size="lg"></Fa></div>
									{/if}
								</button>
								</div>
							</div>
							{#if showMore}
								<div class="flex flex-wrap -mx-3 -mb-6 mt-2">
									<div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6 ">
										<div class="max-w-sm mx-auto py-8 px-6 bg-gray-500 rounded-xl drop-shadow-xl">
											<div class="max-w-xs mx-auto text-center">
												<div class="flex mx-auto w-12 h-12 mb-4 items-center justify-center bg-blue-500 bg-opacity-20 text-blue-500 rounded-xl">
													<Fa icon={faFileCircleExclamation} size="lg"></Fa>
												</div>
												<span class="text-xs text-gray-300 font-semibold">Assignments Ungraded</span>
												<h4 class="text-2xl leading-8 text-gray-100 font-semibold mb-4">{dashboard[0].total_num_ungraded}</h4>
												<div class="flex flex-wrap items-center justify-center -m-1">
													<!--<div class="w-auto p-1">
														<span
															class="inline-block py-1 px-2 text-xs text-green-500 font-medium bg-teal-900 rounded-full"
															>1,0%</span
														>
													</div>
													<div class="w-auto p-1">
														<span class="text-xs text-gray-300 font-medium">Since last month</span>
													</div>-->
												</div>
											</div>
										</div>
									</div>

									<div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6 ">
										<div class="max-w-sm mx-auto py-8 px-6 bg-gray-500 rounded-xl drop-shadow-xl">
											<div class="max-w-xs mx-auto text-center">
												<div
														class="flex mx-auto w-12 h-12 mb-4 items-center justify-center bg-blue-500 bg-opacity-20 text-blue-500 rounded-xl"
												>
													<Fa icon={faFileCircleXmark} size="lg"></Fa>
												</div>
												<span class="text-xs text-gray-300 font-semibold">Assignments Late</span>
												<h4 class="text-2xl leading-8 text-gray-100 font-semibold mb-4">{dashboard[0].total_num_late}</h4>
												<div class="flex flex-wrap items-center justify-center -m-1">
													<!--<div class="w-auto p-1">
														<span
															class="inline-block py-1 px-2 text-xs text-green-500 font-medium bg-teal-900 rounded-full"
															>1,0%</span
														>
													</div>
													<div class="w-auto p-1">
														<span class="text-xs text-gray-300 font-medium">Since last month</span>
													</div>-->
												</div>
											</div>
										</div>
									</div>

								</div>
							{/if}
						</div>

						<!--Grade overview chart 1-->
						<div class="mb-6 ">
							<div class="flex flex-wrap -mx-3">
								<div class="w-full lg:w-2/3 px-3 mb-6 lg:mb-0">
									<div class="p-6 bg-gray-500 rounded-xl drop-shadow-xl">
										<div class="flex flex-wrap -mx-4 -mb-4 justify-between items-center">
											<div class="w-auto px-4 mb-4">
												<h4 class="text-gray-100 font-bold tracking-wide">Grade Overview</h4>
											</div>
											<div class="w-auto px-4 mb-4">
												<div class="flex items-center">
													<div class="mr-4">
														<span class="inline-block w-2 h-2 mr-1 bg-blue-500 rounded-full" />
														<span class="text-xs text-gray-300">Bottom 25%</span>
													</div>
													<div class="mr-6">
														<span class="inline-block w-2 h-2 mr-1 bg-purple-500 rounded-full" />
														<span class="text-xs text-gray-300">Top 25%</span>
													</div>
													<div class="relative inline-block bg-gray-600 rounded-xl">
														<select
															class="relative py-3 pl-2 pr-6 cursor-pointer bg-transparent text-xs text-gray-300 font-semibold appearance-none outline-none"
															id=""
															name=""
															style="z-index: 1;"
														>
															<option value="">Last 7 days</option>
															<option value="">Last Month</option>
														</select>
														<span
															class="absolute top-1/2 right-0 mr-2 transform -translate-y-1/2"
															style="z-index: 0;"
														/>
													</div>
												</div>
											</div>
										</div>
										<div
											class="chart mt-8 mb-3 overflow-x-hidden overflow-y-hidden block"
											data-type="columns-thin"
											data-variant="two"
											style="min-height: 200px;"
										>
											<Chart />
										</div>
									</div>
								</div>
								<div class="w-full lg:w-1/3 px-3">
									<div class="p-6 bg-gray-500 rounded-xl drop-shadow-xl">
										<h4 class="text-gray-100 font-bold tracking-wide mb-8">
											Average grade by category
										</h4>
										<div class="chart mb-10" data-type="donut" style="min-height: 180px;" />
										<div class="flex flex-wrap px-4 items-center justify-between">
											<div class="text-center">
												<span class="inline-block w-2 h-2 mb-2 bg-blue-500 rounded-full" />
												<h6 class="text-xs text-gray-300 font-semibold">Assignments</h6>
												<h5 class="text-2xl text-gray-100 font-semibold">65%</h5>
											</div>
											<div class="text-center">
												<span class="inline-block w-2 h-2 mb-2 bg-purple-500 rounded-full" />
												<h6 class="text-xs text-gray-300 font-semibold">Assessments</h6>
												<h5 class="text-2xl text-gray-100 font-semibold">20%</h5>
											</div>
											<div class="text-center">
												<span class="inline-block w-2 h-2 mb-2 bg-yellow-500 rounded-full" />
												<h6 class="text-xs text-gray-300 font-semibold">Quizzes</h6>
												<h5 class="text-2xl text-gray-100 font-semibold">15%</h5>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="flex flex-wrap -mx-3">
							<div class="w-full lg:w-1/3 px-3 mb-6 lg:mb-0">
								<div class="h-full py-6 px-4 sm:px-6 bg-gray-500 rounded-xl drop-shadow-xl">
									<h4 class="text-lg text-gray-100 font-semibold mb-6">Notifications</h4>
									<a
										class="flex p-4 items-center justify-between hover:bg-gray-600 rounded-xl transition duration-150"
										href={'#'}
									>
										<div class="flex items-center pr-2">
											<div
												class="flex w-10 h-10 mr-3 items-center justify-center bg-gray-400 bg-opacity-20 text-blue-500 rounded-xl"
											>
												<img alt="" src="" />
											</div>
											<div>
												<h5 class="text-sm text-gray-100 leading-5 font-medium mb-1">Student</h5>
												<p class="text-xs text-gray-300 font-semibold">Received about 7 hours</p>
											</div>
										</div>
										<svg
											fill="none"
											height="18"
											viewbox="0 0 4 18"
											width="4"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M2 4C2.39556 4 2.78224 3.8827 3.11114 3.66294C3.44004 3.44318 3.69639 3.13082 3.84776 2.76537C3.99914 2.39992 4.03874 1.99778 3.96157 1.60982C3.8844 1.22186 3.69392 0.865492 3.41421 0.585787C3.13451 0.306082 2.77814 0.115601 2.39018 0.0384303C2.00222 -0.0387401 1.60009 0.000866562 1.23463 0.152242C0.869182 0.303617 0.556825 0.559962 0.337062 0.88886C0.117299 1.21776 1.07779e-06 1.60444 1.07779e-06 2C1.07779e-06 2.53043 0.210715 3.03914 0.585788 3.41421C0.960861 3.78929 1.46957 4 2 4ZM2 14C1.60444 14 1.21776 14.1173 0.888861 14.3371C0.559963 14.5568 0.303617 14.8692 0.152242 15.2346C0.000866562 15.6001 -0.0387401 16.0022 0.0384303 16.3902C0.115601 16.7781 0.306083 17.1345 0.585788 17.4142C0.865493 17.6939 1.22186 17.8844 1.60982 17.9616C1.99778 18.0387 2.39992 17.9991 2.76537 17.8478C3.13082 17.6964 3.44318 17.44 3.66294 17.1111C3.8827 16.7822 4 16.3956 4 16C4 15.4696 3.78929 14.9609 3.41421 14.5858C3.03914 14.2107 2.53043 14 2 14ZM2 7C1.60444 7 1.21776 7.1173 0.888861 7.33706C0.559963 7.55682 0.303617 7.86918 0.152242 8.23463C0.000866562 8.60009 -0.0387401 9.00222 0.0384303 9.39018C0.115601 9.77814 0.306083 10.1345 0.585788 10.4142C0.865493 10.6939 1.22186 10.8844 1.60982 10.9616C1.99778 11.0387 2.39992 10.9991 2.76537 10.8478C3.13082 10.6964 3.44318 10.44 3.66294 10.1111C3.8827 9.78224 4 9.39556 4 9C4 8.46957 3.78929 7.96086 3.41421 7.58579C3.03914 7.21071 2.53043 7 2 7Z"
												fill="#3D485B"
											/>
										</svg>
									</a>
									<a
										class="flex p-4 items-center justify-between hover:bg-gray-600 rounded-xl transition duration-150"
										href={'#'}
									>
										<div class="flex items-center pr-2">
											<div
												class="flex w-10 h-10 mr-3 items-center justify-center bg-gray-400 bg-opacity-20 text-blue-500 rounded-xl"
											>
												<img alt="" src="" />
											</div>
											<div>
												<h5 class="text-sm text-gray-100 leading-5 font-medium mb-1">Student</h5>
												<p class="text-xs text-gray-300 font-semibold">Received about 7 hours</p>
											</div>
										</div>
										<svg
											fill="none"
											height="18"
											viewbox="0 0 4 18"
											width="4"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M2 4C2.39556 4 2.78224 3.8827 3.11114 3.66294C3.44004 3.44318 3.69639 3.13082 3.84776 2.76537C3.99914 2.39992 4.03874 1.99778 3.96157 1.60982C3.8844 1.22186 3.69392 0.865492 3.41421 0.585787C3.13451 0.306082 2.77814 0.115601 2.39018 0.0384303C2.00222 -0.0387401 1.60009 0.000866562 1.23463 0.152242C0.869182 0.303617 0.556825 0.559962 0.337062 0.88886C0.117299 1.21776 1.07779e-06 1.60444 1.07779e-06 2C1.07779e-06 2.53043 0.210715 3.03914 0.585788 3.41421C0.960861 3.78929 1.46957 4 2 4ZM2 14C1.60444 14 1.21776 14.1173 0.888861 14.3371C0.559963 14.5568 0.303617 14.8692 0.152242 15.2346C0.000866562 15.6001 -0.0387401 16.0022 0.0384303 16.3902C0.115601 16.7781 0.306083 17.1345 0.585788 17.4142C0.865493 17.6939 1.22186 17.8844 1.60982 17.9616C1.99778 18.0387 2.39992 17.9991 2.76537 17.8478C3.13082 17.6964 3.44318 17.44 3.66294 17.1111C3.8827 16.7822 4 16.3956 4 16C4 15.4696 3.78929 14.9609 3.41421 14.5858C3.03914 14.2107 2.53043 14 2 14ZM2 7C1.60444 7 1.21776 7.1173 0.888861 7.33706C0.559963 7.55682 0.303617 7.86918 0.152242 8.23463C0.000866562 8.60009 -0.0387401 9.00222 0.0384303 9.39018C0.115601 9.77814 0.306083 10.1345 0.585788 10.4142C0.865493 10.6939 1.22186 10.8844 1.60982 10.9616C1.99778 11.0387 2.39992 10.9991 2.76537 10.8478C3.13082 10.6964 3.44318 10.44 3.66294 10.1111C3.8827 9.78224 4 9.39556 4 9C4 8.46957 3.78929 7.96086 3.41421 7.58579C3.03914 7.21071 2.53043 7 2 7Z"
												fill="#3D485B"
											/>
										</svg>
									</a>
									<a
										class="flex p-4 items-center justify-between hover:bg-gray-600 rounded-xl transition duration-150"
										href={'#'}
									>
										<div class="flex items-center pr-2">
											<div
												class="flex w-10 h-10 mr-3 items-center justify-center bg-gray-400 bg-opacity-20 text-blue-500 rounded-xl"
											>
												<img alt="" src="" />
											</div>
											<div>
												<h5 class="text-sm text-gray-100 leading-5 font-medium mb-1">Student</h5>
												<p class="text-xs text-gray-300 font-semibold">Received about 7 hours</p>
											</div>
										</div>
										<svg
											fill="none"
											height="18"
											viewbox="0 0 4 18"
											width="4"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M2 4C2.39556 4 2.78224 3.8827 3.11114 3.66294C3.44004 3.44318 3.69639 3.13082 3.84776 2.76537C3.99914 2.39992 4.03874 1.99778 3.96157 1.60982C3.8844 1.22186 3.69392 0.865492 3.41421 0.585787C3.13451 0.306082 2.77814 0.115601 2.39018 0.0384303C2.00222 -0.0387401 1.60009 0.000866562 1.23463 0.152242C0.869182 0.303617 0.556825 0.559962 0.337062 0.88886C0.117299 1.21776 1.07779e-06 1.60444 1.07779e-06 2C1.07779e-06 2.53043 0.210715 3.03914 0.585788 3.41421C0.960861 3.78929 1.46957 4 2 4ZM2 14C1.60444 14 1.21776 14.1173 0.888861 14.3371C0.559963 14.5568 0.303617 14.8692 0.152242 15.2346C0.000866562 15.6001 -0.0387401 16.0022 0.0384303 16.3902C0.115601 16.7781 0.306083 17.1345 0.585788 17.4142C0.865493 17.6939 1.22186 17.8844 1.60982 17.9616C1.99778 18.0387 2.39992 17.9991 2.76537 17.8478C3.13082 17.6964 3.44318 17.44 3.66294 17.1111C3.8827 16.7822 4 16.3956 4 16C4 15.4696 3.78929 14.9609 3.41421 14.5858C3.03914 14.2107 2.53043 14 2 14ZM2 7C1.60444 7 1.21776 7.1173 0.888861 7.33706C0.559963 7.55682 0.303617 7.86918 0.152242 8.23463C0.000866562 8.60009 -0.0387401 9.00222 0.0384303 9.39018C0.115601 9.77814 0.306083 10.1345 0.585788 10.4142C0.865493 10.6939 1.22186 10.8844 1.60982 10.9616C1.99778 11.0387 2.39992 10.9991 2.76537 10.8478C3.13082 10.6964 3.44318 10.44 3.66294 10.1111C3.8827 9.78224 4 9.39556 4 9C4 8.46957 3.78929 7.96086 3.41421 7.58579C3.03914 7.21071 2.53043 7 2 7Z"
												fill="#3D485B"
											/>
										</svg>
									</a>
									<a
										class="flex p-4 items-center justify-between hover:bg-gray-600 rounded-xl transition duration-150"
										href={'#'}
									>
										<div class="flex items-center pr-2">
											<div
												class="flex w-10 h-10 mr-3 items-center justify-center bg-gray-400 bg-opacity-20 text-blue-500 rounded-xl"
											>
												<img alt="" src="" />
											</div>
											<div>
												<h5 class="text-sm text-gray-100 leading-5 font-medium mb-1">Student</h5>
												<p class="text-xs text-gray-300 font-semibold">Received about 7 hours</p>
											</div>
										</div>
										<svg
											fill="none"
											height="18"
											viewbox="0 0 4 18"
											width="4"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M2 4C2.39556 4 2.78224 3.8827 3.11114 3.66294C3.44004 3.44318 3.69639 3.13082 3.84776 2.76537C3.99914 2.39992 4.03874 1.99778 3.96157 1.60982C3.8844 1.22186 3.69392 0.865492 3.41421 0.585787C3.13451 0.306082 2.77814 0.115601 2.39018 0.0384303C2.00222 -0.0387401 1.60009 0.000866562 1.23463 0.152242C0.869182 0.303617 0.556825 0.559962 0.337062 0.88886C0.117299 1.21776 1.07779e-06 1.60444 1.07779e-06 2C1.07779e-06 2.53043 0.210715 3.03914 0.585788 3.41421C0.960861 3.78929 1.46957 4 2 4ZM2 14C1.60444 14 1.21776 14.1173 0.888861 14.3371C0.559963 14.5568 0.303617 14.8692 0.152242 15.2346C0.000866562 15.6001 -0.0387401 16.0022 0.0384303 16.3902C0.115601 16.7781 0.306083 17.1345 0.585788 17.4142C0.865493 17.6939 1.22186 17.8844 1.60982 17.9616C1.99778 18.0387 2.39992 17.9991 2.76537 17.8478C3.13082 17.6964 3.44318 17.44 3.66294 17.1111C3.8827 16.7822 4 16.3956 4 16C4 15.4696 3.78929 14.9609 3.41421 14.5858C3.03914 14.2107 2.53043 14 2 14ZM2 7C1.60444 7 1.21776 7.1173 0.888861 7.33706C0.559963 7.55682 0.303617 7.86918 0.152242 8.23463C0.000866562 8.60009 -0.0387401 9.00222 0.0384303 9.39018C0.115601 9.77814 0.306083 10.1345 0.585788 10.4142C0.865493 10.6939 1.22186 10.8844 1.60982 10.9616C1.99778 11.0387 2.39992 10.9991 2.76537 10.8478C3.13082 10.6964 3.44318 10.44 3.66294 10.1111C3.8827 9.78224 4 9.39556 4 9C4 8.46957 3.78929 7.96086 3.41421 7.58579C3.03914 7.21071 2.53043 7 2 7Z"
												fill="#3D485B"
											/>
										</svg>
									</a>
									<a
										class="flex p-4 items-center justify-between hover:bg-gray-600 rounded-xl transition duration-150"
										href={'#'}
									>
										<div class="flex items-center pr-2">
											<div
												class="flex w-10 h-10 mr-3 items-center justify-center bg-gray-400 bg-opacity-20 text-blue-500 rounded-xl"
											>
												<img alt="" src="" />
											</div>
											<div>
												<h5 class="text-sm text-gray-100 leading-5 font-medium mb-1">Student</h5>
												<p class="text-xs text-gray-300 font-semibold">Received about 7 hours</p>
											</div>
										</div>
										<svg
											fill="none"
											height="18"
											viewbox="0 0 4 18"
											width="4"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M2 4C2.39556 4 2.78224 3.8827 3.11114 3.66294C3.44004 3.44318 3.69639 3.13082 3.84776 2.76537C3.99914 2.39992 4.03874 1.99778 3.96157 1.60982C3.8844 1.22186 3.69392 0.865492 3.41421 0.585787C3.13451 0.306082 2.77814 0.115601 2.39018 0.0384303C2.00222 -0.0387401 1.60009 0.000866562 1.23463 0.152242C0.869182 0.303617 0.556825 0.559962 0.337062 0.88886C0.117299 1.21776 1.07779e-06 1.60444 1.07779e-06 2C1.07779e-06 2.53043 0.210715 3.03914 0.585788 3.41421C0.960861 3.78929 1.46957 4 2 4ZM2 14C1.60444 14 1.21776 14.1173 0.888861 14.3371C0.559963 14.5568 0.303617 14.8692 0.152242 15.2346C0.000866562 15.6001 -0.0387401 16.0022 0.0384303 16.3902C0.115601 16.7781 0.306083 17.1345 0.585788 17.4142C0.865493 17.6939 1.22186 17.8844 1.60982 17.9616C1.99778 18.0387 2.39992 17.9991 2.76537 17.8478C3.13082 17.6964 3.44318 17.44 3.66294 17.1111C3.8827 16.7822 4 16.3956 4 16C4 15.4696 3.78929 14.9609 3.41421 14.5858C3.03914 14.2107 2.53043 14 2 14ZM2 7C1.60444 7 1.21776 7.1173 0.888861 7.33706C0.559963 7.55682 0.303617 7.86918 0.152242 8.23463C0.000866562 8.60009 -0.0387401 9.00222 0.0384303 9.39018C0.115601 9.77814 0.306083 10.1345 0.585788 10.4142C0.865493 10.6939 1.22186 10.8844 1.60982 10.9616C1.99778 11.0387 2.39992 10.9991 2.76537 10.8478C3.13082 10.6964 3.44318 10.44 3.66294 10.1111C3.8827 9.78224 4 9.39556 4 9C4 8.46957 3.78929 7.96086 3.41421 7.58579C3.03914 7.21071 2.53043 7 2 7Z"
												fill="#3D485B"
											/>
										</svg>
									</a>
									<a
										class="flex p-4 items-center justify-between hover:bg-gray-600 rounded-xl transition duration-150"
										href={'#'}
									>
										<div class="flex items-center pr-2">
											<div
												class="flex w-10 h-10 mr-3 items-center justify-center bg-gray-400 bg-opacity-20 text-blue-500 rounded-xl"
											>
												<img alt="" src="" />
											</div>
											<div>
												<h5 class="text-sm text-gray-100 leading-5 font-medium mb-1">Student</h5>
												<p class="text-xs text-gray-300 font-semibold">Received about 7 hours</p>
											</div>
										</div>
										<svg
											fill="none"
											height="18"
											viewbox="0 0 4 18"
											width="4"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M2 4C2.39556 4 2.78224 3.8827 3.11114 3.66294C3.44004 3.44318 3.69639 3.13082 3.84776 2.76537C3.99914 2.39992 4.03874 1.99778 3.96157 1.60982C3.8844 1.22186 3.69392 0.865492 3.41421 0.585787C3.13451 0.306082 2.77814 0.115601 2.39018 0.0384303C2.00222 -0.0387401 1.60009 0.000866562 1.23463 0.152242C0.869182 0.303617 0.556825 0.559962 0.337062 0.88886C0.117299 1.21776 1.07779e-06 1.60444 1.07779e-06 2C1.07779e-06 2.53043 0.210715 3.03914 0.585788 3.41421C0.960861 3.78929 1.46957 4 2 4ZM2 14C1.60444 14 1.21776 14.1173 0.888861 14.3371C0.559963 14.5568 0.303617 14.8692 0.152242 15.2346C0.000866562 15.6001 -0.0387401 16.0022 0.0384303 16.3902C0.115601 16.7781 0.306083 17.1345 0.585788 17.4142C0.865493 17.6939 1.22186 17.8844 1.60982 17.9616C1.99778 18.0387 2.39992 17.9991 2.76537 17.8478C3.13082 17.6964 3.44318 17.44 3.66294 17.1111C3.8827 16.7822 4 16.3956 4 16C4 15.4696 3.78929 14.9609 3.41421 14.5858C3.03914 14.2107 2.53043 14 2 14ZM2 7C1.60444 7 1.21776 7.1173 0.888861 7.33706C0.559963 7.55682 0.303617 7.86918 0.152242 8.23463C0.000866562 8.60009 -0.0387401 9.00222 0.0384303 9.39018C0.115601 9.77814 0.306083 10.1345 0.585788 10.4142C0.865493 10.6939 1.22186 10.8844 1.60982 10.9616C1.99778 11.0387 2.39992 10.9991 2.76537 10.8478C3.13082 10.6964 3.44318 10.44 3.66294 10.1111C3.8827 9.78224 4 9.39556 4 9C4 8.46957 3.78929 7.96086 3.41421 7.58579C3.03914 7.21071 2.53043 7 2 7Z"
												fill="#3D485B"
											/>
										</svg>
									</a>
								</div>
							</div>
							<div class="w-full lg:w-2/3 px-3">
								<div class="h-full p-6 bg-gray-500 rounded-xl">
									<h4 class="text-lg text-gray-100 font-semibold mb-6">Latest Submissions</h4>
									<div class="w-full mt-6 pb-4 overflow-x-auto">
										<table class="w-full min-w-max">
											<thead>
												<tr class="text-left">
													<th class="p-0">
														<div class="py-3 px-6 rounded-l-xl bg-gray-600">
															<span class="text-xs text-gray-300 font-semibold">CLASS</span>
														</div>
													</th>
													<th class="p-0">
														<div class="py-3 px-6 bg-gray-600">
															<span class="text-xs text-gray-300 font-semibold">STUDENT</span>
														</div>
													</th>
													<th class="p-0">
														<div class="py-3 px-6 bg-gray-600">
															<button
																class="inline-flex items-center text-xs text-gray-300 font-semibold"
															>
																<span class="mr-2">DATE</span>
																<svg
																	fill="none"
																	height="14"
																	viewbox="0 0 10 14"
																	width="10"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		d="M7.8598 8.52669L4.9998 11.3934L2.1398 8.52669C2.01426 8.40115 1.844 8.33063 1.66646 8.33063C1.48893 8.33063 1.31867 8.40115 1.19313 8.52669C1.0676 8.65222 0.99707 8.82249 0.99707 9.00002C0.99707 9.17756 1.0676 9.34782 1.19313 9.47335L4.52646 12.8067C4.58844 12.8692 4.66217 12.9188 4.74341 12.9526C4.82465 12.9865 4.91179 13.0039 4.9998 13.0039C5.08781 13.0039 5.17494 12.9865 5.25618 12.9526C5.33742 12.9188 5.41116 12.8692 5.47313 12.8067L8.80646 9.47335C8.86862 9.41119 8.91793 9.3374 8.95157 9.25619C8.98521 9.17497 9.00252 9.08793 9.00252 9.00002C9.00252 8.91211 8.98521 8.82507 8.95157 8.74385C8.91793 8.66264 8.86862 8.58885 8.80646 8.52669C8.7443 8.46453 8.67051 8.41522 8.5893 8.38158C8.50808 8.34794 8.42104 8.33063 8.33313 8.33063C8.24522 8.33063 8.15818 8.34794 8.07696 8.38158C7.99575 8.41522 7.92196 8.46453 7.8598 8.52669ZM2.1398 5.47335L4.9998 2.60669L7.8598 5.47335C7.92177 5.53584 7.99551 5.58544 8.07675 5.61928C8.15799 5.65313 8.24512 5.67055 8.33313 5.67055C8.42114 5.67055 8.50828 5.65313 8.58952 5.61928C8.67075 5.58544 8.74449 5.53584 8.80646 5.47335C8.86895 5.41138 8.91855 5.33764 8.95239 5.2564C8.98624 5.17517 9.00366 5.08803 9.00366 5.00002C9.00366 4.91201 8.98624 4.82488 8.95239 4.74364C8.91855 4.6624 8.86895 4.58866 8.80646 4.52669L5.47313 1.19335C5.41116 1.13087 5.33742 1.08127 5.25618 1.04743C5.17494 1.01358 5.08781 0.996155 4.9998 0.996155C4.91179 0.996155 4.82465 1.01358 4.74341 1.04743C4.66217 1.08127 4.58844 1.13087 4.52646 1.19335L1.19313 4.52669C1.0676 4.65222 0.99707 4.82249 0.99707 5.00002C0.99707 5.17756 1.0676 5.34782 1.19313 5.47335C1.31867 5.59889 1.48893 5.66941 1.66646 5.66941C1.844 5.66941 2.01426 5.59889 2.1398 5.47335Z"
																		fill="currentColor"
																	/>
																</svg>
															</button>
														</div>
													</th>
													<th class="p-0">
														<div class="py-3 px-5 rounded-r-xl bg-gray-600">
															<span class="text-xs text-gray-300 font-semibold">STATUS</span>
														</div>
													</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td class="p-0">
														<div class="h-16 p-6">
															<h5 class="text-sm font-medium text-gray-100">CS101</h5>
														</div>
													</td>
													<td class="p-0">
														<div class="h-16 p-6">
															<div class="flex h-full items-center">
																<img alt="" class="w-8 h-8 mr-3 rounded-full object-cover" src="" />
																<span class="text-sm font-medium text-gray-100">John Doe</span>
															</div>
														</div>
													</td>
													<td class="p-0">
														<div class="h-16 p-6">
															<span class="text-sm text-gray-100 font-medium">July 06, 2022</span>
														</div>
													</td>
													<td class="p-0">
														<div class="h-16 p-6">
															<div class="flex h-full items-center">
																<span class="inline-block w-2 h-2 mr-1 bg-yellow-500 rounded-full" />
																<span class="text-sm font-medium text-gray-100">Awaiting Grade</span>
															</div>
														</div>
													</td>
												</tr>
												<tr>
													<td class="p-0">
														<div class="h-16 p-6 rounded-l-xl bg-gray-600">
															<h5 class="text-sm font-medium text-gray-100">CS101</h5>
														</div>
													</td>
													<td class="p-0">
														<div class="h-16 p-6 bg-gray-600">
															<div class="flex h-full items-center">
																<img alt="" class="w-8 h-8 mr-3 rounded-full object-cover" src="" />
																<span class="text-sm font-medium text-gray-100">John Doe</span>
															</div>
														</div>
													</td>
													<td class="p-0">
														<div class="h-16 p-6 bg-gray-600">
															<h5 class="text-sm font-medium text-gray-100">July 06, 2022</h5>
														</div>
													</td>
													<td class="p-0">
														<div class="flex h-16 p-6 items-center rounded-r-xl bg-gray-600">
															<span class="inline-block w-2 h-2 mr-1 bg-green-500 rounded-full" />
															<span class="text-sm font-medium text-gray-100">Graded</span>
														</div>
													</td>
												</tr>
												<tr>
													<td class="p-0">
														<div class="h-16 p-6">
															<h5 class="text-sm font-medium text-gray-100">CS101</h5>
														</div>
													</td>
													<td class="p-0">
														<div class="h-16 p-6">
															<div class="flex h-full items-center">
																<img alt="" class="w-8 h-8 mr-3 rounded-full object-cover" src="" />
																<span class="text-sm font-medium text-gray-100">John Doe</span>
															</div>
														</div>
													</td>
													<td class="p-0">
														<div class="h-16 p-6">
															<span class="text-sm text-gray-100 font-medium">July 06, 2022</span>
														</div>
													</td>
													<td class="p-0">
														<div class="h-16 p-6">
															<div class="flex h-full items-center">
																<span class="inline-block w-2 h-2 mr-1 bg-yellow-500 rounded-full" />
																<span class="text-sm font-medium text-gray-100">Awaiting Grade</span>
															</div>
														</div>
													</td>
												</tr>
												<tr>
													<td class="p-0">
														<div class="h-16 p-6 rounded-l-xl bg-gray-600">
															<h5 class="text-sm font-medium text-gray-100">CS101</h5>
														</div>
													</td>
													<td class="p-0">
														<div class="h-16 p-6 bg-gray-600">
															<div class="flex h-full items-center">
																<img alt="" class="w-8 h-8 mr-3 rounded-full object-cover" src="" />
																<span class="text-sm font-medium text-gray-100">John Doe</span>
															</div>
														</div>
													</td>
													<td class="p-0">
														<div class="h-16 p-6 bg-gray-600">
															<h5 class="text-sm font-medium text-gray-100">July 06, 2022</h5>
														</div>
													</td>
													<td class="p-0">
														<div class="flex h-16 p-6 items-center rounded-r-xl bg-gray-600">
															<span class="inline-block w-2 h-2 mr-1 bg-red-500 rounded-full" />
															<span class="text-sm font-medium text-gray-100">Late</span>
														</div>
													</td>
												</tr>
												<tr>
													<td class="p-0">
														<div class="h-16 p-6">
															<h5 class="text-sm font-medium text-gray-100">CS101</h5>
														</div>
													</td>
													<td class="p-0">
														<div class="h-16 p-6">
															<div class="flex h-full items-center">
																<img alt="" class="w-8 h-8 mr-3 rounded-full object-cover" src="" />
																<span class="text-sm font-medium text-gray-100">John Doe</span>
															</div>
														</div>
													</td>
													<td class="p-0">
														<div class="h-16 p-6">
															<span class="text-sm text-gray-100 font-medium">July 06, 2022</span>
														</div>
													</td>
													<td class="p-0">
														<div class="h-16 p-6">
															<div class="flex h-full items-center">
																<span class="inline-block w-2 h-2 mr-1 bg-yellow-500 rounded-full" />
																<span class="text-sm font-medium text-gray-100">Awaiting Grade</span>
															</div>
														</div>
													</td>
												</tr>
												<tr>
													<td class="p-0">
														<div class="h-16 p-6 rounded-l-xl bg-gray-600">
															<h5 class="text-sm font-medium text-gray-100">CS101</h5>
														</div>
													</td>
													<td class="p-0">
														<div class="h-16 p-6 bg-gray-600">
															<div class="flex h-full items-center">
																<img alt="" class="w-8 h-8 mr-3 rounded-full object-cover" src="" />
																<span class="text-sm font-medium text-gray-100">John Doe</span>
															</div>
														</div>
													</td>
													<td class="p-0">
														<div class="h-16 p-6 bg-gray-600">
															<h5 class="text-sm font-medium text-gray-100">July 06, 2022</h5>
														</div>
													</td>
													<td class="p-0">
														<div class="flex h-16 p-6 items-center rounded-r-xl bg-gray-600">
															<span class="inline-block w-2 h-2 mr-1 bg-red-500 rounded-full" />
															<span class="text-sm font-medium text-gray-100">Late</span>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>

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
{/if}
