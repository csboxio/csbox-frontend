<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import {page} from "$app/stores";
	let model;
	export let data;
	export let show_create_box;
	let loading;
	let assignments;
	$: assignments = data.assignments.assignmentData;

	const assignmentSlug = data.assignmentSlug;
	let assignment;
	$: {
		assignment = assignments.find(
				assignment => assignment.assignment_id == assignmentSlug
		)
	}

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

	</section>
</div>
