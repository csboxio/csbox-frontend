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
	<section class="container mx-auto p-6 ">
		<div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
			<div class="w-full overflow-x-auto">
				<table class="w-full">
							<thead>
							<tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
							<th class="px-4 py-3 border"></th>
								{#each grades.assignments as assignment (assignment.assignment_id)}
									<th class="px-4 py-3 border">{assignment.title}</th>
								{/each}
								{#each grades.quizzes as quiz (quiz.quiz_id)}
									<th class="px-4 py-3 border">{quiz.title}</th>
								{/each}
							</tr>
							</thead>
					       <tbody class="bg-white">
							{#if grades.users}
							{#each grades.users as user (user.user_id)}
								<tr class="text-gray-700">
									<td class="px-4 py-3 border">
										{user.first_name} {user.last_name}
									</td>
									{#each grades.assignments as assignment (assignment.assignment_id)}
										<td class="px-4 py-3 border">
											{#if user.grades && user.grades.assignments && assignment.assignment_id in user.grades.assignments}
												{user.grades.assignments[assignment.assignment_id]}
												{:else}
												-
											{/if}

										</td>
									{/each}
									{#each grades.quizzes as quiz (quiz.quiz_id)}
										<td class="px-4 py-3 border">
											{#if user.grades && user.grades.quizzes && quiz.quiz_id in user.grades.quizzes}
												{user.grades.quizzes[quiz.quiz_id]}%
											{:else}
												-
											{/if}
										</td>
									{/each}
								</tr>
							{/each}
								{:else}
								<tr class=" px-4 py-2 border">
									No grades yet.
								</tr>
							{/if}
							</tbody>
						</table>
			</div>
		</div>
	</section>
</div>
