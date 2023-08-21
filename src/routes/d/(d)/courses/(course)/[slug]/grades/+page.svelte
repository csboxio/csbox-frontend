<script lang="ts">
	import {onMount} from "svelte";
	import {navStore} from "../../../../../../../lib/stores/stores.js";
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from "flowbite-svelte";

	export let data;
	let course_data = data.courseData;
	let grades;
	$: grades = data.gradesData;

	console.log(grades)
	// For search box on assignments
	let searchTerm = '';


	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('courses');
	});
</script>

<div class="w-full">
	<section class="p-1 mt-4">
		<div class="container">
				<div>
					<div class="relative overflow-x-auto sm:rounded-lg w-full">

						<div class="relative overflow-x-auto">
							<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
								<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
								<tr>
									<th scope="col" class="px-6 py-3">
										Student Name
									</th>
									{#each Object.values(grades) as user}
										<th scope="col" class="px-6 py-3">
											{user.grades.assignment_title}
										</th>
									{/each}
								</tr>
								</thead>
								<tbody>
								{#each Object.keys(grades) as userId}
									<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
											{grades[userId].first_name} {grades[userId].last_name}
										</td>
										{#each Object.values(grades) as user}
											<td class="px-6 py-4 text-white">
												{#if user.grades.user_id === userId}
													{user.grades.grade_percent}
												{/if}
											</td>
										{/each}
									</tr>
								{/each}
								</tbody>
							</table>
						</div>




					</div>
			</div>
		</div>
	</section>
</div>
