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


</script>

<div class="w-full">
	<section class="p-1 mt-4">
			<div class="container mx-12 my-5">
				<div class="flex flex-wrap gap-4 mb-6 -mx-10 -mb-6 text-white font-semibold">
					test
				</div>
			</div>
	</section>
</div>





