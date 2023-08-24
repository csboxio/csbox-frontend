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
					<div class="relative overflow-x-auto sm: w-full">

						<table class="table-auto w-full border  text-white">
							<thead>
							<tr class="bg-gray-800">
								<th class="border border-gray-400 px-4 py-2"></th>
								{#each grades.assignments as assignment (assignment.assignment_id)}
									<th class="border border-gray-400 px-4 py-2">{assignment.title}</th>
								{/each}
								{#each grades.quizzes as quiz (quiz.quiz_id)}
									<th class="border border-gray-400 px-4 py-2">{quiz.title}</th>
								{/each}
							</tr>
							</thead>
							<tbody>
							{#each grades.users as user (user.user_id)}
								<tr>
									<td class="border border-gray-400 px-4 py-2 bg-gray-800">{user.first_name} {user.last_name}</td>
									{#each grades.assignments as assignment (assignment.assignment_id)}
										<td class="border border-gray-400 px-4 py-2">
											{#if user.grades && user.grades.assignments && assignment.assignment_id in user.grades.assignments}
												{user.grades.assignments[assignment.assignment_id]}
												{:else}
												-
											{/if}

										</td>
									{/each}
									{#each grades.quizzes as quiz (quiz.quiz_id)}
										<td class="border border-gray-400 px-4 py-2">
											{#if user.grades && user.grades.quizzes && quiz.quiz_id in user.grades.quizzes}
												{user.grades.quizzes[quiz.quiz_id]}%
											{:else}
												-
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
	</section>
</div>
