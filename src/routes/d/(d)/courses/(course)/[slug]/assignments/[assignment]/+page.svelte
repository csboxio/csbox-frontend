<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { getSupabase } from '@supabase/auth-helpers-sveltekit';
	import { supabaseClient } from '$lib/utilities/supabaseClient';
	import { blur } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { page } from "$app/stores";

	let model;
	export let data;
	export let show_create_box;
	let loading;
	let assignments;
	$: assignments = data.assignmentDataInfo;

	//console.log(assignments)

	function show_box() {
		show_create_box = true;
	}

	function close_box() {
		show_create_box = false;
	}

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
	//console.log("1" + $page.data.assignmentData)
	//console.log("2" + $page.data.assignmentDataInfo)
</script>

<div class="flex flex-row">
	<section class="p-1">
		<div class="container mx-1 my-8">
			<h4 class="text-xl font-bold text-white -mx-auto my-5">
				Title: {assignments.title}
			</h4>
			<h4 class="text-xl font-bold text-white -mx-auto my-5">
				Creator: {assignments.creator_id}
			</h4>
			<h4 class="text-xl font-bold text-white -mx-auto my-5">
				Description: {assignments.description}
			</h4>
			<h4 class="text-xl font-bold text-white -mx-auto my-5">
				Submission Type: {assignments.submission_type}
			</h4>
			<h4 class="text-xl font-bold text-white -mx-auto my-5">
				Submission Attempts: {assignments.submission_attempts}
			</h4>
			<h4 class="text-xl font-bold text-white -mx-auto my-5">
				Display as: {assignments.display_as}
			</h4>
			<h4 class="text-xl font-bold text-white -mx-auto my-5">
				Available Start: {assignments.available_start}
			</h4>
			<h4 class="text-xl font-bold text-white -mx-auto my-5">
				Available End: {assignments.available_end}
			</h4>
			<h4 class="text-xl font-bold text-white -mx-auto my-5">
				Inserted At: {assignments.inserted_at}
			</h4>
			<h4 class="text-xl font-bold text-white -mx-auto my-5">
				Assign To: {assignments.assign_to}
			</h4>
		</div>
	</section>
</div>
