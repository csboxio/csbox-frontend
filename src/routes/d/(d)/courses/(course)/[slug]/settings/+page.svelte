<script lang="ts">
	import {onMount} from "svelte";
	import {navStore} from "../../../../../../../lib/stores/stores.js";
	import {Input, Label} from "flowbite-svelte";

	export let data;
	let course_data = data.courseData;

	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('courses');
	});
</script>

<div class="flex flex-row">
	<section class="p-1 mt-4">
		<div class="container mx-12 my-5">

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
			</div>
		</div>
	</section>
</div>
