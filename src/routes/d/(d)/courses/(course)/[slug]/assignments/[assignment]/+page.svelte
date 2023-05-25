<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { getSupabase } from '@supabase/auth-helpers-sveltekit';
	import { supabaseClient } from '$lib/utilities/supabaseClient';
	import { blur } from 'svelte/transition';
	import { browser } from '$app/environment';

	let model;
	export let data;
	export let show_create_box;
	let loading;
	let assignments;
	$: assignments = data.assignmentData;

	function show_box() {
		show_create_box = true;
	}

	function close_box() {
		show_create_box = false;
	}

	let course_data = data.courseData;

	let open = false;

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
			close_box();
			await invalidateAll();
		}

		await applyAction(result);
	}

	let hoverID;
	$: hoverID;

	async function handleDeleteAssignment(cid) {
		open = false;
		const { error, status } = await supabaseClient.from('assignments').delete().match({ id: cid });
		if (status === 204) {
			open = false;
			await invalidateAll();
		}
	}
</script>

<div class="flex flex-row">
	<section class="p-1">
		<div class="container mx-1 my-8">
			<h4 class="text-xl font-bold text-white -mx-auto my-5">
				Title: {assignments.assignment_title}
			</h4>
			<h4 class="text-xl font-bold text-white -mx-auto my-5">
				Inserted At: {assignments.inserted_at}
			</h4>
			<h4 class="text-xl font-bold text-white -mx-auto my-5">
				Category: {assignments.category}
			</h4>
			<h4 class="text-xl font-bold text-white -mx-auto my-5">
				Description: {assignments.description}
			</h4>
			<h4 class="text-xl font-bold text-white -mx-auto my-5">
				Points: {assignments.points}
			</h4>
			<h4 class="text-xl font-bold text-white -mx-auto my-5">
				Submission Type: {assignments.submission_type}
			</h4>

			<h4 class="text-xl font-bold text-white -mx-auto my-5">
				Submission Attempts: {assignments.submission_attempts}
			</h4>

			<h4 class="text-xl font-bold text-white -mx-auto my-5">
				Assigned to: {assignments.assign_to}
			</h4>

			<h4 class="text-xl font-bold text-white -mx-auto my-5">
				Due: {assignments.due}
			</h4>


			<div class="flex flex-col -mx-20 my-2 pl-14 -mb-6 text-white font-semibold delay-50" />
		</div>
	</section>
</div>
