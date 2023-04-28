<script lang="ts">
	import Settings from '$lib/components/Settings.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { blur } from 'svelte/transition';
	import { goto, invalidateAll } from "$app/navigation";
	import { dragMe } from '$lib/utilities/dragMe.ts'
	import { deserialize } from "$app/forms";


	// this is needed for the outside click div, that needs to be redone
	let model;

	/** @type {import('./$types').PageData} */
	export let data;
	let course_data;
	$: course_data = $page.data.courses.courseData;

	let hoverID;
	$: hoverID;
	let open = false;
	export let show_create_box;

	// Draggable box
	function show_box() {
		show_create_box = true;
	}

	// Draggable box
	function close_box() {
		show_create_box = false;
	}

	async function handleSubmit(event) {
		const data = new FormData(this);
		const response = await fetch(this.action, {
			method: 'POST',
			body: data
		});
		const result = deserialize(await response.text());
		if (result.type === 'success') {
			// re-run all `load` functions, following the successful update
			close_box();
			await invalidateAll();
		}
	}
</script>

<body
	class="bg-gray-600 antialiased bg-body text-body font-body"
	on:click|stopPropagation={() => model.handleToggleMenuTopRight('outside')}
>
	<div class="">
		<Navbar /><s></s>
		<div class="mx-auto lg:ml-20">
			<section>
				<div class="pt-5 pb-6 px-8 bg-gray-700">
					<div class="flex flex-wrap items-center justify-between -mx-2">
						<div class="w-full lg:w-auto px-2 mb-6 lg:mb-0">
							<h4 class="text-2xl font-bold text-white tracking-wide leading-7 mb-1">Courses</h4>

						</div>
						<div class="w-full lg:w-auto px-2">
							<div class="sm:flex items-center">
								<div class="w-full sm:w-auto mb-6 sm:mb-0 sm:mr-4">
									<div class="flex flex-wrap items-center -mb-2">
										<a
											class="inline-flex items-center justify-center w-12 h-12 mb-2 mr-4 p-1 text-gray-300 bg-gray-500 hover:bg-gray-400 hover:bg-opacity-40 transition|local duration-150 rounded-full"
											href="#"
										>
											<svg
												fill="none"
												height="16"
												viewbox="0 0 20 16"
												width="20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M17 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V13C0 13.7956 0.316071 14.5587 0.87868 15.1213C1.44129 15.6839 2.20435 16 3 16H17C17.7956 16 18.5587 15.6839 19.1213 15.1213C19.6839 14.5587 20 13.7956 20 13V3C20 2.20435 19.6839 1.44129 19.1213 0.87868C18.5587 0.316071 17.7956 0 17 0ZM3 2H17C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3L10 7.88L2 3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2ZM18 13C18 13.2652 17.8946 13.5196 17.7071 13.7071C17.5196 13.8946 17.2652 14 17 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13V5.28L9.48 9.85C9.63202 9.93777 9.80446 9.98397 9.98 9.98397C10.1555 9.98397 10.328 9.93777 10.48 9.85L18 5.28V13Z"
													fill="currentColor"
												/>
											</svg>
										</a>
										<a
											class="inline-flex items-center justify-center w-12 h-12 mb-2 mr-4 p-1 text-gray-300 bg-gray-500 hover:bg-gray-400 hover:bg-opacity-40 transition|local duration-150 rounded-full"
											href="#"
										>
											<svg
												fill="none"
												height="20"
												viewbox="0 0 16 20"
												width="16"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M14 11.18V8C13.9986 6.58312 13.4958 5.21247 12.5806 4.13077C11.6655 3.04908 10.3971 2.32615 9 2.09V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V2.09C5.60294 2.32615 4.33452 3.04908 3.41939 4.13077C2.50425 5.21247 2.00144 6.58312 2 8V11.18C1.41645 11.3863 0.910998 11.7681 0.552938 12.2729C0.194879 12.7778 0.00173951 13.3811 0 14V16C0 16.2652 0.105357 16.5196 0.292893 16.7071C0.48043 16.8946 0.734784 17 1 17H4.14C4.37028 17.8474 4.873 18.5954 5.5706 19.1287C6.26819 19.6621 7.1219 19.951 8 19.951C8.8781 19.951 9.73181 19.6621 10.4294 19.1287C11.127 18.5954 11.6297 17.8474 11.86 17H15C15.2652 17 15.5196 16.8946 15.7071 16.7071C15.8946 16.5196 16 16.2652 16 16V14C15.9983 13.3811 15.8051 12.7778 15.4471 12.2729C15.089 11.7681 14.5835 11.3863 14 11.18ZM4 8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4C9.06087 4 10.0783 4.42143 10.8284 5.17157C11.5786 5.92172 12 6.93913 12 8V11H4V8ZM8 18C7.65097 17.9979 7.30857 17.9045 7.00683 17.7291C6.70509 17.5536 6.45451 17.3023 6.28 17H9.72C9.54549 17.3023 9.29491 17.5536 8.99317 17.7291C8.69143 17.9045 8.34903 17.9979 8 18ZM14 15H2V14C2 13.7348 2.10536 13.4804 2.29289 13.2929C2.48043 13.1054 2.73478 13 3 13H13C13.2652 13 13.5196 13.1054 13.7071 13.2929C13.8946 13.4804 14 13.7348 14 14V15Z"
													fill="currentColor"
												/>
											</svg>
										</a>
										<a
											class="inline-flex items-center justify-center w-12 h-12 mb-2 p-1 text-gray-300 bg-gray-500 hover:bg-gray-400 hover:bg-opacity-40 transition|local duration-150 rounded-full"
											href="#"
										>
											<svg
												fill="none"
												height="21"
												viewbox="0 0 21 21"
												width="21"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M20.71 19.29L17 15.61C18.4401 13.8144 19.1375 11.5353 18.9488 9.24133C18.7601 6.94733 17.6997 4.81281 15.9855 3.27667C14.2714 1.74053 12.0338 0.919537 9.73295 0.982497C7.43207 1.04546 5.24275 1.98759 3.61517 3.61517C1.98759 5.24275 1.04546 7.43207 0.982497 9.73295C0.919537 12.0338 1.74053 14.2714 3.27667 15.9855C4.81281 17.6997 6.94733 18.7601 9.24133 18.9488C11.5353 19.1375 13.8144 18.4401 15.61 17L19.29 20.68C19.383 20.7738 19.4936 20.8482 19.6154 20.8989C19.7373 20.9497 19.868 20.9758 20 20.9758C20.132 20.9758 20.2627 20.9497 20.3846 20.8989C20.5065 20.8482 20.6171 20.7738 20.71 20.68C20.8903 20.4936 20.991 20.2444 20.991 19.985C20.991 19.7257 20.8903 19.4765 20.71 19.29ZM10 17C8.61556 17 7.26218 16.5895 6.11103 15.8203C4.95989 15.0511 4.06268 13.9579 3.53287 12.6788C3.00306 11.3997 2.86443 9.99226 3.13453 8.63439C3.40463 7.27653 4.07131 6.02925 5.05028 5.05028C6.02925 4.07131 7.27653 3.40463 8.63439 3.13453C9.99226 2.86443 11.3997 3.00306 12.6788 3.53287C13.9579 4.06268 15.0511 4.95989 15.8203 6.11103C16.5895 7.26218 17 8.61556 17 10C17 11.8565 16.2625 13.637 14.9498 14.9498C13.637 16.2625 11.8565 17 10 17Z"
													fill="currentColor"
												/>
											</svg>
										</a>
									</div>
								</div>
								<Settings bind:this={model} />
							</div>
						</div>
					</div>
				</div>
			</section>
			<section class="flex flex-col p-8">
				<div>
					<button
						class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
				font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
				group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
				focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800">
				<span
					class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
					dark:bg-gray-600 rounded-md group-hover:bg-opacity-0" on:click={show_box}>
					Join Course
				</span>
					</button>
				</div>
				<div class="container m-6">

					<div class="flex flex-wrap -mx-12 -mb-2">
						<!--Each course-->
						{#each course_data as { id, inserted_at, course_image_url, course_title, course_prefix, course_number, course_term }, i}
							<div class="relative mb-8 mx-4 cursor-pointer">
								<div class=" min-w-xs max-w-xs">
									<div class="relative group">
										<a on:click={goto(`/d/courses/${id}`)}>
											<div
												class="absolute group-hover:scale-105 -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-400 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-1500 group-hover:duration-200"
											/>
											<div>
												<div
													class="relative p-6 bg-gray-700 rounded-xl group-hover:scale-105 transition|local duration-1500"
												>
													<img
														src={course_image_url + '?t=' + inserted_at}
														class="relative inline-flex items-center justify-center w-20 h-20 mb-6 rounded-lg drop-shadow-2xl bg-gray-600"
													/>
													<a
														on:click|stopPropagation={() => {
															hoverID = i;
															open = true;
														}}
													>
														<div
															class=" inline-block absolute top-1 right-0 m-5 text-gray-300 hover:text-gray-200"
														>
															<svg
																width="24"
																height="24"
																viewbox="0 0 24 24"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
																	stroke="currentColor"
																	stroke-width="2"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																/>
																<path
																	d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
																	stroke="currentColor"
																	stroke-width="2"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																/>
																<path
																	d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
																	stroke="currentColor"
																	stroke-width="2"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																/>
															</svg>
														</div>
													</a>
													<h4 class="text-xl text-white font-bold mb-3">
														{course_title === '' ? 'Course Name' : course_title}
													</h4>
													<h4 class="text-xl text-white font-bold mb-1">
														{course_prefix === '' ? 'Empty' : course_prefix}
														{course_number}
													</h4>
													<h4 class="text-gray-300 mb-1">{course_term}</h4>
												</div>
											</div>
										</a>
									</div>
								</div>
							</div>

							{#if hoverID === i && open && browser}
								<div transition:blur|local={{ duration: 200 }} id="edit" class="relative z-10">
									<div
										class="absolute block rounded-md bg-gray-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
									>
										<div class="text-sm text-gray-900 dark:text-white">
											<div
												class="p-2 truncate font-bold hover:underline hover:bg-gray-700 w-24 cursor-pointer"
											>
												Edit
											</div>
											<div
												class="p-2 truncate font-bold hover:underline hover:bg-gray-700 hover:text-red-400 cursor-pointer"
												on:click={handleDeleteAssignment(id)}
											>
												Delete
											</div>
										</div>
										<div
											class="inline-block absolute top-0 right-0 m-2 text-gray-300 hover:text-gray-100 hover:scale-110 cursor-pointer"
											href="#"
											on:click|stopPropagation={() => {
												open = false;
											}}
										>
											<svg
												aria-hidden="true"
												class="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fill-rule="evenodd"
													d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
													clip-rule="evenodd"
												/>
											</svg>
										</div>
									</div>
								</div>
							{/if}
						{/each}

						<!--No courses found-->
						{#if course_data.length === 0}
							<div
								class="flex p-4 mb-12 mt-12 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
								role="alert"
							>
								<svg
									aria-hidden="true"
									class="flex-shrink-0 inline w-5 h-5 mr-3"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
										clip-rule="evenodd"
									/>
								</svg>
								<span class="sr-only">Info</span>
								<div>
									<span class="font-medium">No courses found...</span>
								</div>
							</div>
						{/if}
					</div>

				</div>

				<!--Create Course button at the bottom of the screen.-->
				<a href="/d/courses/create">
					<button
						class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-300 to-blue-500 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
					>
						<span
							class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0"
						>
							Create Course
						</span>
					</button>
				</a>



			</section>
		</div>
		{#if show_create_box}
			<!-- Main modal -->
			<div use:dragMe class="z-1000 fixed top-1/2 left-1/2">
				<div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
					<!-- Modal content -->
					<div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-700 sm:p-5">
						<!-- Modal header -->
						<div
							class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
						>
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Join Course</h3>
							<button
								type="button"
								on:click={close_box}
								class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-toggle="defaultModal"
							>
								<svg
									aria-hidden="true"
									class="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
								<span class="sr-only">Close modal</span>
							</button>
						</div>
						<!-- Modal body -->
						<form method="POST" action="?/joinCourse" on:submit|preventDefault={handleSubmit}>
							<div class="grid gap-4 mb-4 sm:grid-cols-2">

								<div class="sm:col-span-2">
								<div>
									<label for="code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>Enroll Code</label
									>
									<input
										type="text"
										name="code"
										id="code"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
								 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
								  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Code"
										required
									/>
								</div>
								</div>
								<div class="sm:col-span-2">
									<button type="submit" class="px-3 py-2 text-sm font-medium text-center text-white
									 bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
									  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		{/if}
	</div>
</body>
