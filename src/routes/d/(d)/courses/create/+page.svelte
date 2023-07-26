<script lang="ts" xmlns="http://www.w3.org/1999/html">
	import { page } from '$app/stores';
	import CourseImage from '$lib/components/CourseImage.svelte';
	import {goto, invalidate, invalidateAll} from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import {Checkbox, FloatingLabelInput, Range, StepIndicator} from 'flowbite-svelte';
	import { createPlaceHolderCourseDocument } from "../../../../../lib/utilities/quill.js";
	import CourseColorPicker from "$lib/components/CourseColorPicker.svelte";
	let steps = ['Step 1', 'Step 2', 'Step 3'];

	let session = $page.data.session;
	let loading;

	export let data;
	// TODO error handling
	let course_title;
	let course_prefix;
	let course_number;
	let course_term;
	let course_color;
	let course_image_url;
	let days_per_week = 1;
	$: days_per_week;
	let class_length_weeks = 1;
	$: class_length_weeks;
	let hours_per_week = 1;
	$: hours_per_week;
	let number_of_students = 1;
	$: number_of_students;

	let resources_low = false;
	let resources_medium = false;
	let resources_high = false;

	//Progress bar step
	let currentStep = 1;
	$: currentStep;

	function handleSteps(num, event) {
		currentStep = num;
	}

	export let files;

	export let form;

	let currentCourseId;

	let { supabase, claim } = data
	$: ({ supabase, claim } = data)

	async function handleSubmit(event) {
		loading = true;
		const data = new FormData(this);

		// Add course color
		data.append("course_color", course_color);

		const response = await fetch(this.action, {
			method: 'POST',
			body: data,
			headers: {
				'x-sveltekit-action': 'true',
				'cache-control': 'max-age=3600'
			}
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			// re-run all `load` functions, following the successful update
			currentStep = 2;

			//let { data, error } = await supabase
			//		.rpc('get_most_recent_course_id')

			//console.log(data, error)

			currentCourseId = data

			// createPlaceHolderCourseDocument(currentCourseId, $page.data.session.user.id, supabase);
			await invalidateAll();
		}

		await applyAction(result);
	}

	$: cost = (((hours_per_week) * 4) * number_of_students) * 0.13382
</script>
<style>
	.color-box {
		display: inline-block;
		width: 16px;
		height: 16px;
		vertical-align: middle;
		margin-right: 5px;
		border: 1px solid #ccc;
		border-radius: 2px;
	}
</style>

{#if claim !== 'student'}
<body class="bg-gray-600 antialiased bg-body text-body font-body">
	<div class="from-gray-500 to-gray-500 bg-gradient-to-br antialiased bg-body text-body font-body">
			<section class="py-3">
				<div class="container px-6 mx-auto">
					<div class="min-h-screen gap-4 flex justify-center items-center">

						<div class="flex justify-around i items-center w-full">

							<div class="p-9 bg-gray-600 rounded-xl w-full">

								<!--Header-->
								<div
									class="flex flex-wrap items-center justify-between -mx-4 mb-8 pb-6 border-b border-gray-400 border-opacity-20">
									<div class="w-full sm:w-auto px-4 mb-6 sm:mb-0">
										<h4 class="text-2xl font-bold tracking-wide text-white mb-1">Create Course</h4>
									</div>
								</div>

								<div class="mb-8">
									<StepIndicator {currentStep} {steps} hideLabel color="blue"/>
								</div>

								<!--Create course form-->
								{#if currentStep === 1}
									<form action="?/createCourse" method="POST" on:submit|preventDefault={handleSubmit}>

									<div class="grid gap-6 mb-6 md:grid-cols-2">

										<div class="mb-4">
									<label for="course_title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Title</label>

														<input
															name="course_title"
															id="course_title"
															type="text"
															class="bg-gray-50 border border-gray-300
											text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
											block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
											dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
															placeholder="Software Development I"
															bind:value={course_title}
															required
														/>
													</div>


										<div class="mb-4">
										<label for="course_prefix" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Prefix</label>
														<input
															name="course_prefix"
															id="course_prefix"
															type="text"
															class="bg-gray-50 border border-gray-300
											text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
											block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
											dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
															placeholder="CS100"
															bind:value={course_prefix}
															required />
													</div>

										<div class="mb-4">
										<label for="course_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Number</label>
														<input
															name="course_number"
															id="course_number"
															type="text"
															class="bg-gray-50 border border-gray-300
											text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
											block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
											dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
															placeholder="12345"
															bind:value={course_number}
															required
														/>
													</div>

										<div class="mb-4">
										<label for="course_term" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Term</label>
														<input
															name="course_term"
															id="course_term"
															type="text"
															class="bg-gray-50 border border-gray-300
											text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
											block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
											dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
															placeholder="Spring 2023"
															bind:value={course_term}
															required
														/>
													</div>
										<div class="mb-4">
											<label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Color</label>
										   <CourseColorPicker bind:selectedColor={course_color}/>
									</div>
										<div class="mb-4">
										<label for="course_contact" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Contact</label>
										<div class="relative mb-6">
											<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
												<svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
											</div>
											<input type="text" name="course_contact" id="course_contact" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@csbox.io">
										</div>
										</div>
									</div>
									<div class="flex justify-between w-full sm:w-auto">
										<div>
											<a class="inline-block py-2 px-4 mr-3 text-xs text-center font-semibold leading-normal text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200"
												href="/d/courses">
												Cancel
											</a>
										</div>

										<button
											class="inline-block py-2 px-4 text-sm text-center font-bold leading-normal text-gray-200 bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-200"
											type="submit"
										>
											{#if loading}
												<svg class="animate-spin h-4 w-4 mr-3 inline">
													<Fa icon={faSpinner} size="xs" />
												</svg>
											{/if}
											Next
										</button>
									</div>
									</form>
								{/if}

								{#if currentStep === 2}
									<form>
										<CourseImage bind:courseID={currentCourseId} bind:data={data} />
									</form>
									<div>
										<!--Save and cancel buttons-->
										<!--TODO cancel delete row-->
										<a
												class="inline-block py-2 px-4 mr-3 text-xs text-center font-semibold leading-normal text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200"
												href="/d/courses">Cancel</a
										>
										<button
												class="float-right inline-block py-2 px-4 text-xs text-center font-bold leading-normal text-gray-200 bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-200"
												on:click={() => handleSteps(3)}
										>
											Next
										</button>
									</div>


									{/if}

								{#if currentStep === 3}
									<p class="mb-5 text-lg font-medium text-gray-900 dark:text-white">Choose Class Type:</p>
									<div class="grid gap-6 w-full md:grid-cols-3 mb-6">
										<Checkbox custom>
											<div class="font-normal p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-gray-400 hover:text-gray-600 dark:peer-checked:text-gray-100 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
												<div class="w-full text-lg font-semibold">
													Online</div>
												<div class="w-full text-sm">An exclusively online classroom, providing cloud-based virtual learning experiences and interactive education for fully remote students.</div>
											</div>
										</Checkbox>

										<Checkbox custom>
											<div class="font-normal p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-gray-400 hover:text-gray-600 dark:peer-checked:text-gray-100 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
												<div class="w-full text-lg font-semibold">Hybrid</div>
												<div class="w-full text-sm">A hybrid classroom combining online and in-person instruction, offering a blended learning environment for students to engage both virtually and physically.</div>
											</div>
										</Checkbox>

										<Checkbox custom>
											<div class="font-normal p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-gray-400 hover:text-gray-600 dark:peer-checked:text-gray-100 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
												<div class="w-full text-lg font-semibold">In-Person</div>
												<div class="w-full text-sm">A traditional in-person classroom setting where students physically attend classes, fostering face-to-face interactions and hands-on learning experiences.</div>
											</div>
										</Checkbox>

									</div>
									<hr>
									<!--
									<div class="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">

										<p class="my-2 text-lg font-medium text-gray-900 dark:text-white w-full">Contact:</p><br>
										<div>
											<label for="contact_email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
												Contact Email
											</label>
											<input type="text" name="contact_email" id="contact_email" class="bg-gray-50 border border-gray-300
											text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
											block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
											dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
												   placeholder="example@csbox.io"
												   required/>
										</div>
										<div>
											<label for="contact_email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
												Contact Phone (optional)
											</label>
											<input type="text" name="contact_phone" id="contact_phone" class="bg-gray-50 border border-gray-300
											text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
											block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
											dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
												   placeholder="000-000-0000"/>
										</div>
									</div>
									-->
									<!--
									<div class="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2">

										<p class="my-2 text-lg font-medium text-gray-900 dark:text-white w-full">Workspaces:</p><br>

										<div>
											<div>
												<label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
													Estimated Total Students
												</label>
												<Range id="range-steps" min="1" max="100" bind:value={number_of_students} step="0.5"/>
												<p class="text-white">Students: {number_of_students}</p>
											</div>
										</div>

										<div>
											<label for="contact_email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
												Estimate Weekly hours / student
											</label>
											<Range id="range-steps" min="1" max="60" bind:value={hours_per_week} step="0.5"/>
											<p class="text-white">Hours Per Week: {hours_per_week}</p>
										</div>

									</div>

									<p class="mt-4 text-md font-medium text-gray-900 dark:text-white w-full">For all users per month (excluding other costs)</p>
									<p class="my-2 text-lg font-medium text-gray-900 dark:text-white w-full">${cost}</p>
									<br>
									-->
									<div class="flex justify-between w-full sm:w-auto mt-2">
										<button class="inline-block py-2 px-4 mr-3 text-xs text-center font-semibold leading-normal text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200"
												on:click={() => currentStep = 2}>
											Back
										</button>

										<button class="inline-block py-2 px-4 text-sm text-center font-bold leading-normal text-gray-200 bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-200"
												on:click={() => {
													goto("/d/courses");
												}}>
											Done
										</button>
									</div>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</section>
	</div>
</body>
{/if}
