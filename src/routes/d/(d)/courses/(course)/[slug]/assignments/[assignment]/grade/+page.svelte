<script lang="ts">
	import {onMount} from "svelte";
	import {page} from "$app/stores";
	import Fa from 'svelte-fa/src/fa.svelte';
	import {faArrowLeft, faArrowRight, faLayerGroup} from "@fortawesome/free-solid-svg-icons";
	import {Input} from "flowbite-svelte";
	import {applyAction, deserialize} from "$app/forms";
	import {goto, invalidate, invalidateAll} from "$app/navigation";
	import {browser} from "$app/environment";

	export let data;

	let { supabase, params, quiz_data, courses } = data
	$: ({ supabase, params, quiz_data, courses } = data)

	let course_data = data.courseData;


	let submissions
	$: submissions = $page.data.submissions

	let assignment
	$: assignment = $page.data.assignment

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

	let currentSubmission;
	$: currentSubmission = submissions[selectedStudentIndex];

	async function handleGradeSubmit(event) {
		const data = new FormData(this);

		data.append('submission_id', currentSubmission.submission_id);
		data.append('points', currentSubmission.points);

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

	let gradeForm;
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
{#if currentSubmission}
<div class="w-full">
	<section class=" mt-4">
		{#key selectedStudent}
			{#if selectedStudent}
				<h2 class="text-xl font-semibold mb-2 text-white">{assignment.title} - {selectedStudent?.first_name + ' ' + selectedStudent?.last_name}</h2>
			{/if}
		{/key}
		<div class="container mx-12 my-2">
			<div class="flex justify-between items-center mb-6">

				<!-- Rest of the student info -->

				<!-- Student selector -->
				<div class="absolute top-24 right-10 flex justify-between items-center mb-4 space-x-2">
					<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={loadPreviousStudent}>
						<Fa icon={faArrowLeft}/>
					</button>

					<select class="border rounded px-2 py-1 text-ellipsis" value={selectedStudentIndex} on:change={(event) => loadStudent(event.target.value)}>
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

	{#if currentSubmission}
	<div class="w-full flex">

		<div class="flex-1 border border-gray-400 rounded-l h-4/5 text-white p-0 h-[82vh]">
			{#key currentSubmission}
			{#if currentSubmission}
				{#if currentSubmission.submission_type === "url"}
					<div class="font-semibold ">URL:</div>
					{currentSubmission.url}

					<iframe class="w-full aspect-video" src={currentSubmission.url} frameborder="0" scrolling="no"></iframe>
				{/if}
				{#if currentSubmission.submission_type === "project"}
					<div class="font-semibold">Project ID:</div>
					{currentSubmission.project_id}
				{/if}
			{/if}
			{/key}
		</div>

		<!-- Right Side Grading Box -->
		<div class="w-1/6 bg-gray-500 p-4  right-0 h-4/5 flex flex-col">
			<div class="h-4/5 overflow-y-auto text-white">
				Grade
				<form bind:this={gradeForm} action="?/updateGrade" method="POST" on:submit|preventDefault={handleGradeSubmit}>

				<div class="inline-block">
					{#if currentSubmission}
				<input id="grade_percentage" name="grade_percentage" class="border rounded p-1 px-2 text-sm w-14 text-black" bind:value={currentSubmission.grade_percent} on:change={() => gradeForm.requestSubmit()}/>
					{/if}
				</div>

				</form>
				<!-- Comments Go Here -->
				{#each comments as comment}
					<div class="bg-white p-2 mb-2 rounded">
						<p>{comment}</p>
					</div>
				{/each}
			</div>
			<!-- Comment box -->
			<div class="mt-4 ">
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

	{/if}
</div>
	{:else}
	<div class="text-white pt-4">No submissions yet!</div>
	{/if}