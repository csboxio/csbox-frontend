<script lang="ts" xmlns="http://www.w3.org/1999/html">
	import { page } from '$app/stores';
	import CourseImage from '$lib/components/CourseImage.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';

	let session = $page.data.session;
	let loading;

	/** @type {import("./$types").PageData} */
	export let data;
	// TODO error handling
	let course_title;
	let course_prefix;
	let course_number;
	let course_term;
	let course_image_url;

	//Progress bar step
	let step = 1;

	function handleSteps(num, event) {
		step = num;
	}

	export let files;

	export let form;

	let currentCourseId;

	async function handleSubmit(event) {
		loading = true;
		const data = new FormData(this);

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
			step = 2;
			try {
				currentCourseId = JSON.stringify(result['data'].course_id);
			} catch {
				console.log('ERROR: No course ID found');
				alert('ERROR: Try logging out, and logging back in.');
			}
			await invalidateAll();
		}

		await applyAction(result);
	}
</script>

<!--Svelte-kit preloading doesn't like me changing the body background color between pages-->
<body class="bg-gray-600 antialiased bg-body text-body font-body">
	<div class="from-gray-500 to-gray-500 bg-gradient-to-br antialiased bg-body text-body font-body">
		<form action="?/createCourse" method="POST" on:submit|preventDefault={handleSubmit}>
			<section class="py-3">
				<div class="container px-6 mx-auto">
					<div class="min-h-screen gap-4 flex min-w-2/3">
						<div class="flex w-2/3 justify-around i items-center md:w-2/3">
							<div class="min-w-xs max-w-xs">
								<div class="relative group">
									<div
										class="absolute -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-400 rounded-lg blur opacity-10 group-hover:opacity-75 transition duration-1500 group-hover:duration-200 animate-tilt"
									/>
									<div>
										<div class="relative p-6 bg-gray-700 rounded-xl">
											<img
												class="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-lg drop-shadow-2xl"
												src={course_image_url === undefined || course_image_url === ''
													? 'https://dummyimage.com/150x150/000/fff'
													: course_image_url}
											/>
											<a
												class="inline-block absolute top-1 right-0 m-5 text-gray-300 hover:text-gray-200"
												href="#"
											>
												<svg
													fill="none"
													height="24"
													viewbox="0 0 24 24"
													width="24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
														stroke="currentColor"
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
													/>
													<path
														d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
														stroke="currentColor"
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
													/>
													<path
														d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
														stroke="currentColor"
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
													/>
												</svg>
											</a>
											<h4 class="text-xl text-white font-bold mb-3">
												{course_title === undefined || course_title === ''
													? 'Software Development'
													: course_title}
											</h4>
											<h4 class="text-xl text-white font-bold mb-1">
												{course_prefix === undefined || course_prefix === ''
													? 'CS100'
													: course_prefix}
												{course_number === undefined || course_number === ''
													? '12345'
													: course_number}
											</h4>
											<h4 class="text-gray-300 mb-1">
												{course_term === undefined || course_term === ''
													? 'Spring 2023'
													: course_term}
											</h4>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="flex w-2/3 justify-around i items-center md:w-2/3">
							<div class="p-9 bg-gray-600 rounded-xl">
								<!--Header-->
								<div
									class="flex flex-wrap items-center justify-between -mx-4 mb-8 pb-6 border-b border-gray-400 border-opacity-20"
								>
									<div class="w-full sm:w-auto px-4 mb-6 sm:mb-0">
										<h4 class="text-2xl font-bold tracking-wide text-white mb-1">Create Course</h4>
									</div>
								</div>

								<!--Progress stepper-->
								<div class="pb-12">
									<div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
										<div class="bg-blue-600 h-2.5 rounded-full" style="width: {step * 33}%" />
									</div>
								</div>

								<!--Create course form-->
								{#if step === 1}
									<div
										class="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20"
									>
										<div class="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
											<span class="text-sm font-medium text-gray-100">Course Title</span>
										</div>
										<div class="w-full sm:w-2/3 px-4">
											<div class="max-w-xl">
												<div class="flex items-center -mx-3">
													<div class="w-full sm:w-auto px-3 mb-3 sm:mb-0">
														<input
															name="course_title"
															id="course_title"
															type="text"
															class="block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg"
															placeholder="Software Development I"
															bind:value={course_title}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div
										class="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20"
									>
										<div class="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
											<span class="text-sm font-medium text-gray-100">Course Prefix</span>
										</div>
										<div class="w-full sm:w-2/3 px-4">
											<div class="max-w-xl">
												<div class="flex flex-wrap items-center -mx-3">
													<div class="w-full sm:w-auto px-3 mb-3 sm:mb-0">
														<input
															name="course_prefix"
															id="course_prefix"
															type="text"
															class="block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg"
															placeholder="CS100"
															bind:value={course_prefix}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div
										class="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20"
									>
										<div class="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
											<span class="text-sm font-medium text-gray-100">Course Number</span>
										</div>
										<div class="w-full sm:w-2/3 px-4">
											<div class="max-w-xl">
												<div class="flex flex-wrap items-center -mx-3">
													<div class="w-full sm:w-auto px-3 mb-3 sm:mb-0">
														<input
															name="course_number"
															id="course_number"
															type="text"
															class="block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg"
															placeholder="12345"
															bind:value={course_number}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div
										class="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20"
									>
										<div class="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
											<span class="text-sm font-medium text-gray-100">Course Term</span>
										</div>
										<div class="w-full sm:w-2/3 px-4">
											<div class="max-w-xl">
												<div class="flex flex-wrap items-center -mx-3">
													<div class="w-full sm:w-auto px-3 mb-3 sm:mb-0">
														<input
															name="course_term"
															id="course_term"
															type="text"
															class="block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg"
															placeholder="Spring 2023"
															bind:value={course_term}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>

									<!--<CourseImage bind:files={files} />-->

									<div class="flex justify-between w-full sm:w-auto">
										<div>
											<!--Save and cancel buttons-->
											<!--TODO cancel delete row-->
											<a
												class="inline-block py-2 px-4 mr-3 text-xs text-center font-semibold leading-normal text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200"
												href="/d/courses">Cancel</a
											>
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
									<!--Step 2-->
								{:else if step === 2}
									<form>
										<CourseImage bind:courseID={currentCourseId} />
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
									<!--Step 3-->
								{:else if step === 3}
									<button
										class="inline-block py-2 px-4 text-xs text-center font-semibold leading-normal text-gray-200 bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-200"
										on:click|preventDefault={goto('/d/courses')}
									>
										Confirm
									</button>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</section>
		</form>
	</div>
</body>
