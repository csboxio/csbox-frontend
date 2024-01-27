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
	import {applyAction, deserialize} from "$app/forms";
	import {invalidateAll} from "$app/navigation";

	export let data;
	let course_data = data.courseData;
	let grades;
	$: grades = data.gradesData;


	// For search box on assignments
	let searchTerm = '';

	let { claim } = data
	$: ({ claim } = data)


	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('courses');
	});

	let gradeForm;

	async function handleGradeSubmit(event, submission) {
		const data = new FormData(this);

		data.append('submission_id', data.get('id'));
		//data.append('points', submission.points);

		const response = await fetch(this.action, {
			method: 'POST',
			body: data,
			headers: {
				'x-sveltekit-action': 'true',
			}
		});
		const result = deserialize(await response.text());
		if (result.type === 'redirect') {
			// re-run all `load` functions, following the successful update
			await invalidateAll();
		}
		await applyAction(result);
		await invalidateAll();
	}
</script>

<div class="w-full">
	<section class="container mx-auto p-6 ">
		<div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
			<div class="w-full overflow-x-auto">
				<table class="w-full table-fixed rounded-2xl">
							<thead>
							<tr class="text-md font-semibold tracking-wide text-left text-gray-200 bg-gray-700 uppercase border-b border-gray-600">
							<th class="px-4 py-3 border border-gray-600 min-w-40"></th>
								{#each grades.assignments as assignment (assignment.assignment_id)}
									<th class="px-4 py-3 border border-gray-600 min-w-40 truncate">{assignment.title}</th>
								{/each}
								{#each grades.quizzes as quiz (quiz.quiz_id)}
									<th class="px-4 py-3 border border-gray-600">{quiz.title}</th>
								{/each}
							</tr>
							</thead>
					       <tbody class="bg-gray-800 ">
							{#if grades.users}
							{#each grades.users as user (user.user_id)}
								<tr class="text-gray-100">
									<td class="px-4 py-3 border border-gray-600 font-semibold">
										{user.first_name} {user.last_name}
									</td>
									{#each grades.assignments as assignment (assignment.assignment_id)}
										<td class="px-4 py-3 border border-gray-600 ">
											{#if user.grades && user.grades.assignments && assignment.assignment_id in user.grades.assignments}
												<!-- This updates the grades -->
												<form bind:this={gradeForm} action="?/updateGrade" method="POST" on:submit|preventDefault={handleGradeSubmit}>
													<div class="inline-block">
														{#if claim === 'instructor'}
															{#if user.grades.assignments[assignment.assignment_id][1]}
																<!-- The submission_id is here -->
																<input type="hidden" name="id" value={user.grades.assignments[assignment.assignment_id][1]}/>
																<!-- What the user sees the grade percentage -->
																<input id="grade_percentage" name="grade_percentage" class=" p-1 px-2 text-sm w-14 appearance-none bg-gray-800 font-semibold " bind:value={user.grades.assignments[assignment.assignment_id][0]} on:change={() => gradeForm.requestSubmit()}/>
															{/if}
															{:else}
															<div class=" p-1 px-2 text-sm w-14 font-semibold">{user.grades.assignments[assignment.assignment_id][0]}</div>
														{/if}
													</div>

												</form>
												{:else}
												-
											{/if}

										</td>
									{/each}
									{#each grades.quizzes as quiz (quiz.quiz_id)}
										<td class="px-4 py-3 border border-gray-600 ">
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
