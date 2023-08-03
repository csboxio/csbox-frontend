<script lang="ts">
	import {onMount} from "svelte";
	import {page} from "$app/stores";

	export let data;

	let { supabase, params, quiz_data, courses } = data
	$: ({ supabase, params, quiz_data, courses } = data)

	let course_data = data.courseData;


	let submissions
	$: submissions = $page.data.submissions

	console.log($page.data)


	let selectedStudentIndex = 0;
	let selectedStudent = submissions[selectedStudentIndex];

	function loadStudent(index) {
		selectedStudentIndex = index;
		selectedStudent = submissions[selectedStudentIndex];
	}

	function loadPreviousStudent() {
		if (selectedStudentIndex > 0) {
			loadStudent(selectedStudentIndex - 1);
		}
	}

	function loadNextStudent() {
		if (selectedStudentIndex < submissions.length - 1) {
			loadStudent(selectedStudentIndex + 1);
		}
	}

	onMount(() => {
		loadStudent(selectedStudentIndex);
	});

</script>

<div class="w-full">
	<section class="p-1 mt-4">
			<div class="container mx-12 my-5">
				<div class="flex flex-wrap gap-4 mb-6 -mx-10 -mb-6 text-white font-semibold">
					<h1 class="text-3xl font-bold mb-4">Student Grades</h1>

					<div class="flex justify-between items-center mb-4">
						<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={loadPreviousStudent}>
							Previous
						</button>

						<select class="border rounded px-4 py-2" value={selectedStudentIndex} on:change={(event) => loadStudent(event.target.value)}>
							{#each submissions as student, index}
								<option value={index}>{student.name}</option>
							{/each}
						</select>

						<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={loadNextStudent}>
							Next
						</button>
					</div>

					{#if selectedStudent}
						<div>
							<h2 class="text-xl font-semibold mb-2">Selected Student: {selectedStudent.name}</h2>
							<p>Subject: {selectedStudent.subject}</p>
							<p>Grade: {selectedStudent.grade}</p>
							<p>Last Graded: {selectedStudent.last_graded}</p>
							<p>Graded By: {selectedStudent.graded_by}</p>
							<p>User ID: {selectedStudent.user_id}</p>
							<p>Grade Percent: {selectedStudent.grade_percent}</p>
							<p>Points Given: {selectedStudent.points_given}</p>
							<p>Course ID: {selectedStudent.course_id}</p>
							<p>Points: {selectedStudent.points}</p>

							{#if selectedStudent.type === "workspace"}
								<p>Workspace Submission ID: {selectedStudent.workspace_submission_id}</p>
							{/if}
						</div>
					{:else}
						<p>No student data available.</p>
					{/if}
				</div>
			</div>
	</section>
</div>





