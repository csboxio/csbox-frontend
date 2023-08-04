<script lang="ts">
	import {onMount} from "svelte";
	import {page} from "$app/stores";
	import Fa from 'svelte-fa/src/fa.svelte';
	import {faArrowLeft, faArrowRight, faLayerGroup} from "@fortawesome/free-solid-svg-icons";

	export let data;

	let { supabase, params, quiz_data, courses } = data
	$: ({ supabase, params, quiz_data, courses } = data)

	let course_data = data.courseData;


	let submissions
	$: submissions = $page.data.submissions

	console.log($page.data)


	let selectedStudentIndex = 0;
	let selectedStudent

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

	let comments = [];
	let newComment = '';

	function submitComment() {
		if (newComment.trim() !== '') {
			comments = [...comments, newComment];
			newComment = '';
		}
	}

	onMount(() => {
		loadStudent(selectedStudentIndex);
	});

</script>


<!--{#if selectedStudent}
					<div>
						<h2 class="text-xl font-semibold mb-2">Selected Student: {selectedStudent.first_name + ' ' + selectedStudent.last_name}</h2>
						<p>Grade: {selectedStudent.grade_percent}</p>
						<p>Last Graded: {selectedStudent.last_graded.substring(0,10)}</p>
						<p>Graded By: {selectedStudent.graded_by}</p>
						<p>User ID: {selectedStudent.user_id}</p>
						<p>Grade Percent: {selectedStudent.grade_percent}</p>
						<p>Points Given: {selectedStudent.points_given}</p>
						<p>Course ID: {selectedStudent.course_id}</p>
						<p>Points: {selectedStudent.points}</p>

						{#if selectedStudent.type === "workspace"}
							<p>Workspace Submission ID: {selectedStudent.id}</p>
						{/if}
					</div>
				{:else}
					<p>No student data available.</p>
				{/if}
-->

<div class="w-full">
	<section class="p-1 mt-4">
		<div class="container mx-12 my-5">
			<div class="flex justify-between items-center mb-6">

				<!-- Rest of the student info -->

				<!-- Student selector -->
				<div class="absolute top-24 right-4 flex justify-between items-center mb-4 space-x-2">
					<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={loadPreviousStudent}>
						<Fa icon={faArrowLeft}/>
					</button>

					<select class="border rounded px-2 py-1" value={selectedStudentIndex} on:change={(event) => loadStudent(event.target.value)}>
						{#each submissions as student, index}
							<option value={index}>{student.first_name + ' ' + student.last_name}</option>
						{/each}
					</select>

					<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={loadNextStudent}>
						<Fa icon={faArrowRight}/>
					</button>
				</div>

			</div>
		</div>
	</section>

	<div class="w-full flex">

		<div class="flex-1 border h-4/5">

		</div>

		<!-- Right Side Comments Box -->
		<div class="w-1/4 bg-gray-100 p-4  right-0 h-4/5 flex flex-col">
			<div class="h-4/5 overflow-y-auto">
				<!-- Comments Go Here -->
				{#each comments as comment}
					<div class="bg-white p-2 mb-2 rounded">
						<p>{comment}</p>
					</div>
				{/each}
			</div>
			<div class="mt-4">
				<input
						type="text"
						class="border rounded px-2 py-1"
						placeholder="Type your comment..."
						bind:value={newComment}
				/>
				<button
						class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						on:click={submitComment}
				>
					Send
				</button>
			</div>
		</div>
	</div>
</div>





