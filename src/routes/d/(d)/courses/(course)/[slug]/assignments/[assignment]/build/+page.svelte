<script lang="ts">
	import {onMount} from "svelte";
	import {navStore} from "$lib/stores/stores.js";
	import {
		Button,
		Checkbox,
		Input,
		Label,
		Select,
		Table,
		TableBody, TableBodyCell, TableBodyRow,
		TableHead,
		TableHeadCell,
		Textarea
	} from "flowbite-svelte";
	import {writable} from "svelte/store";
	import {DateInput} from "date-picker-svelte";

	export let data;

	let { supabase, params, quiz_data, courses } = data
	$: ({ supabase, params, quiz_data, courses } = data)

	let course_data = data.courseData;

	let _assignment;

	interface Assignment {
		assignment_id: number;
		title: string;
		category: string;
		due: Date;
		points: number;
	}

	interface AssignmentDetails {
		assignment: number;
		description: string;
		submission_type: string;
		submission_attempts: number | null;
		display_as: string;
		available_start: Date;
		available_end: Date;
		inserted_at: Date;
	}

	class AssignmentBuilder {
		assignment: Assignment = {
			assignment_id: 0,
			title: "",
			category: "",
			due: new Date(),
			points: 0,
		};

		assignmentDetails: AssignmentDetails = {
			assignment: 0,
			description: "",
			submission_type: "",
			submission_attempts: null,
			display_as: "",
			available_start: new Date(),
			available_end: new Date(),
			inserted_at: new Date(),
		};

		save(): void {
			const updates = {
				assignment_id: this.assignment.assignment_id,
				title: this.assignment.title,
				category: this.assignment.category,
				due: this.assignment.due,
				points: this.assignment.points,
				assignment: this.assignmentDetails.assignment,
				description: this.assignmentDetails.description,
				submission_type: this.assignmentDetails.submission_type,
				submission_attempts: this.assignmentDetails.submission_attempts,
				display_as: this.assignmentDetails.display_as,
				available_start: this.assignmentDetails.available_start,
				available_end: this.assignmentDetails.available_end,
				inserted_at: this.assignmentDetails.inserted_at,
			};

			console.log(updates);


		}
	}

	const createAssignmentBuilder = () => {
		const { subscribe, update, set } = writable<AssignmentBuilder>(new AssignmentBuilder());

		return {
			subscribe,
			set,
			save: () => {
				update(builder => {
					builder.save();
					return builder;
				});
			},
		};
	};

	let assignmentBuilder;
	let assignmentChanged;
	$: assignmentChanged = false;

	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('assignments');

		assignmentBuilder = createAssignmentBuilder();
		setActiveTab('Basic Information');
	});

	assignmentBuilder = createAssignmentBuilder();

	if (_assignment) {
		const { assignment_id, title, category, due, points } = _assignment;
		assignmentBuilder.assignment = {
			assignment_id,
			title,
			category,
			due: new Date(due),
			points,
		};
	}

	if (_assignmentDetails) {
		const { assignment, description, submission_type, submission_attempts, display_as, available_start, available_end, inserted_at } = _assignmentDetails;
		assignmentBuilder.assignmentDetails = {
			assignment,
			description,
			submission_type,
			submission_attempts,
			display_as,
			available_start: new Date(available_start),
			available_end: new Date(available_end),
			inserted_at: new Date(inserted_at),
		};
	}

	let activeTab = 'Basic Information';

	function setActiveTab(tab: string) {
		activeTab = tab;
	}

</script>

<style>
	:global(body) {

		--date-picker-foreground: #ffffff;
		--date-picker-background: #1a202d;
		--date-picker-highlight-border: hsl(var(--deg), 98%, 49%);
		--date-picker-highlight-shadow: hsla(var(--deg), 98%, 49%, 50%);
		--date-picker-selected-color: hsl(var(--deg), 100%, 85%);
		--date-picker-selected-background: hsla(var(--deg), 98%, 49%, 20%);
		background: #151a24;
		color-scheme: dark;
		color: #ffffff;
		transition: all 80ms ease-in-out;
		font-size: 14px;
	}
	#DatePicker {
		margin-top: 10px;
		margin-left: 5px;
	}
	.active {
		border-color: gray;
	}

	.inactive {
		border-color: transparent;
	}
</style>


<div class="w-full">
	<section class="p-1 mt-4">
			<div class="container mx-12 my-5">
				<div class="flex flex-wrap gap-4 mb-6 -mx-10 -mb-6 text-white font-semibold">

				</div>
			</div>
	</section>
</div>





