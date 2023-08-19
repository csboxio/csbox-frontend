<script lang="ts">
	import {onMount} from "svelte";
	import {page} from "$app/stores";
	import Fa from 'svelte-fa/src/fa.svelte';
	import {faArrowLeft, faArrowRight, faLayerGroup} from "@fortawesome/free-solid-svg-icons";
	import {applyAction, deserialize} from "$app/forms";
	import {goto, invalidateAll} from "$app/navigation";
	import InputBox from "$lib/components/Basic/InputBox.svelte";
	import {Button} from "flowbite-svelte";

	export let data;

	let { supabase, params, quiz_data, courses } = data
	$: ({ supabase, params, quiz_data, courses } = data)

	let course_data = data.courseData;

	let url;
	let submission_type = 'url';
	let project_id = null;

	let formData = {
		'url': url,
		'submission_type': submission_type,
		'project_id': project_id
	}

	async function handleSubmit(event) {
		const data = new FormData(this);

		if (formData.project_id === null) {
			delete formData.project_id;
		}

		const response = await fetch(this.action, {
			method: 'POST',
			body: data
		});
		const result = deserialize(await response.text());
		if (result.type === 'success') {
			// re-run all `load` functions, following the successful update
			await invalidateAll();
		}
		await invalidateAll()
		await applyAction(result);
		history.back()
	}

</script>


<div class="w-full mr-4">
	<section class="p-1 mt-4">
		<div class="container mx-12 my-5">

		</div>
	</section>

	<div class="w-full flex ">
		<div class="flex-1  h-4/5 p-4 h-[60vh] ">
			<form method="POST" action="?/submitAssignment" on:submit|preventDefault={handleSubmit}>
				<InputBox bind:data={url} label="Submission URL" id='url' />
				<button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-2 rounded">Submit</button>
			</form>
		</div>

		<!-- Right Side Comments Box -->
		<div class="w-1/4 bg-gray-700 p-4  right-0 h-4/5 flex flex-col">
			<div class="text-white font-semibold">Comments</div>
			<div class="h-4/5 overflow-y-auto">
				<!-- Comments Go Here -->
			</div>
			<div class="mt-4">

			</div>
		</div>
	</div>
</div>





