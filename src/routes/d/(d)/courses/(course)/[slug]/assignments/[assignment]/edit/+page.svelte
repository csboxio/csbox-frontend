<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { blur } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { Datepicker } from 'svelte-calendar';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from "flowbite-svelte";

	import dayjs from 'dayjs';
	import { onMount } from "svelte";

	const theme = {
		calendar: {
			width: '400px',
			maxWidth: '75vw',
			legend: {
				height: '45px'
			},
			shadow: '0px 10px 26px rgba(0, 0, 0, 0.1)',
			colors: {
				text: {
					primary: '#eee',
					highlight: '#fff'
				},
				background: {
					primary: 'rgb(28,35,45)',
					highlight: '#435bad',
					hover: '#242f49'
				},
				border: '#222'
			},
			font: {
				regular: '1em',
				large: '15em'
			},
			grid: {
				disabledOpacity: '.5',
				outsiderOpacity: '.7'
			}
		}
	};

	// Export due dates for pager.server.js



	export let dueDate;
	export let availablefromDate;
	export let availableuntilDate;

	export let data;
	export let show_create_box;
	let loading;
	let assignments;
	$: assignments = data.assignmentData;
	let modules = data.modules;


	let storeDueDate;
	let storeAvailableDate;
	let storeAvailableUntilDate;

	let open = false;

	async function handleSubmit(event) {
		if (browser) {
			dueDate = dayjs(storeDueDate?.selected);
			availablefromDate = dayjs(storeAvailableDate?.selected);
			availableuntilDate = dayjs(storeAvailableUntilDate?.selected);
		}
		loading = true;
		const data = new FormData(this);
		data.append('due', dueDate);
		data.append('availfrom', availablefromDate);
		data.append('availto', availableuntilDate);

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
			await invalidateAll();
		}

		await applyAction(result);
	}


	function handleAssignment(id) {
		goto('/d/courses/' + data.slug + '/assignments/' + id);
	}

	let left = 600;
	let top = 200;

	function dragMe(node) {
		let moving = false;

		if (browser) {
			// Window scrolling Y changing saves state when close and open.
			top = top + window.scrollY;
			node.style.position = 'absolute';
			node.style.top = `${top}px`;
			node.style.left = `${left}px`;
			node.style.cursor = 'move';
			node.style.userSelect = 'none';

			node.addEventListener('mousedown', () => {
				moving = true;
			});

			window.addEventListener('mousemove', (e) => {
				if (moving) {
					// devicePixelRatio fixes zoomed in browser movement.
					left += e.movementX;
					top += e.movementY;
					node.style.top = `${top}px`;
					node.style.left = `${left}px`;
				}
			});

			window.addEventListener('mouseup', () => {
				moving = false;
			});
		}
	}

	onMount(() => {
		storeDueDate = assignments.due;
	});
</script>


<div class="w-full">

	<section class="p-1">

		<div class="container">

			<h4 class="text-xl font-bold text-white -mx-auto my-5">Assignments</h4>

			<div class="py-4">
				<div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
					<!-- Modal content -->
						<!-- Modal header -->
						<div
							class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
						>
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Edit Assignment</h3>
						</div>
						<!-- Modal body -->
						<form method="POST" action="?/createAssignment" on:submit|preventDefault={handleSubmit}>
							<div class="grid gap-4 mb-4 sm:grid-cols-2">









								<div>
									<label
										for="submissiontype"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>Submission Type</label
									>
									<select
										name="submissiontype"
										id="submissiontype"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									>
										<option value="Points">Online</option>
										<option value="Percentage">Physical</option>
									</select>
								</div>

								<div>
									<label
										for="modules"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>Module</label
									>
									<select
										name="modules"
										id="modules"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									>
										<option value="">No module</option>
										{#each modules as { module_title, id }, i}
											<option value="{id}">{module_title}</option>
										{/each}
									</select>
								</div>

								<div>
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
									>Due</label
									>
									<Datepicker {theme} bind:storeDueDate class="w-full" />
								</div>

								<!--<div>
                  <label for="assignto" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assign To</label>
                  <select name="assignto" id="assignto"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    <option value="Everyone">Student</option>
                    <option value="Everyone">Everyone</option>
                    <option value="Empty">Empty</option>
                  </select>
                </div>-->

								<div>
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
									>Available from</label
									>
									<Datepicker {theme} bind:storeAvailableDate class="w-full" />
								</div>

								<div>
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
									>Available Until</label
									>
									<Datepicker {theme} bind:storeAvailableUntilDate class="w-full" />
								</div>
							</div>
							<button
								type="submit"
								class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								Save details
							</button>
						</form>
					</div>
				</div>

			</div>
	</section>
</div>
