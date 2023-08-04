<script lang="ts">
	import {onMount} from "svelte";
	import {navStore} from "../../../../../../../lib/stores/stores.js";
	import {Input, Label, Modal} from "flowbite-svelte";
	import {page} from "$app/stores";

	export let data;

	let { supabase, claim } = data
	$: ({ supabase, claim } = data)

	let course_data = data.courseData;

	let deleteModel;

	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('courses');
	});

</script>

<div class="flex flex-row">
	<section class="p-1 mt-4">
		<div class="container mx-12 my-5">

			{#if claim !== 'student'}
			<div class="flex flex-wrap -mx-10 -mb-6 text-white font-semibold">
				<div class="grid grid-cols-2 gap-6 w-full">

				<div class="mb-6">
					<Label for="course-name" class="block mb-2">Course Name:</Label>
					<Input id="course-name" class="w-full"  />
				</div>
				<div class="mb-6">
					<Label for="course-code" class="block mb-2">Course Code:</Label>
					<Input id="course-code" class="w-full"/>
				</div>
				<div class="mb-6">
					<Label for="description" class="block mb-2">Description:</Label>
					<Input id="description" class="w-full"></Input>
				</div>

				<div class="mb-6">
					<Label for="instructor-name" class="block mb-2">Instructor Name:</Label>
					<Input id="instructor-name" class="w-full"  />
				</div>
				<div class="mb-6">
					<Label for="instructor-email" class="block mb-2">Instructor Email:</Label>
					<Input id="instructor-email" class="w-full" type="email" />
				</div>
				<div class="mb-6">
					<Label for="office-hours" class="block mb-2">Office Hours:</Label>
					<Input id="office-hours" class="w-full" ></Input>
				</div>

				<div class="mb-6">
					<Label for="start-date" class="block mb-2">Start Date:</Label>
					<Input id="start-date" class="w-full" type="date"  />
				</div>
				<div class="mb-6">
					<Label for="end-date" class="block mb-2">End Date:</Label>
					<Input id="end-date" class="w-full" type="date"  />
				</div>
				<div class="mb-6">
					<Label for="class-times" class="block mb-2">Class Times:</Label>
					<Input id="class-times" class="w-full"  />
				</div>

				<div class="mb-6">
					<Label for="grading-scale" class="block mb-2">Grading Scale:</Label>
					<Input id="grading-scale" class="w-full"  />
				</div>
				<div class="mb-6">
					<Label for="assignment-weights" class="block mb-2">Assignment Weights:</Label>
					<Input id="assignment-weights" class="w-full" />
				</div>
			</div>


				<div class="border border-red-500 p-3 w-full rounded-xl flex justify-between">
					<div class="inline-block flex items-center">
						<div>
							<p>Delete this course</p>
							<p>Once you delete a course, there is no going back.</p>
						</div>
					</div>
					<div class="inline-block flex items-center justify-center"> <!-- Added 'items-center justify-center' classes -->
						<button type="button" on:click={() => {deleteModel = true}} class="px-5 py-2.5 text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button>
					</div>
				</div>

			</div>
				{:else}
				<div class="text-white">Invalid permissions to view this page.</div>
				{/if}
		</div>
	</section>
</div>

<Modal title="DELETE course" class="max-w-xs" bind:open={deleteModel}>
	<form method="POST" action="?/deleteCourse" >
	<p class="mb-4 text-gray-500 dark:text-gray-300">Type in <b>{$page.data.slug}</b> to confirm.</p>
	<div class="mb-6">
		<Label for="course_number_delete" class="block mb-2">Course Number:</Label>
		<Input id="course_number_delete" name="course_number_delete" class="w-full" />
	</div>
	<div class="flex justify-center items-center space-x-4">
		<button on:click={() => deleteModel = false} data-modal-toggle="deleteModal" type="button" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
			No, cancel
		</button>
		<button type="submit" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
			Yes, I'm sure
		</button>
	</div>
	</form>
</Modal>
