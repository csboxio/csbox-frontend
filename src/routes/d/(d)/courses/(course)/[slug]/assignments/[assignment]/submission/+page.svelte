<script lang="ts">
	import {onMount} from "svelte";
	import {page} from "$app/stores";
	import Fa from 'svelte-fa/src/fa.svelte';
	import {faArrowLeft, faArrowRight, faLayerGroup} from "@fortawesome/free-solid-svg-icons";

	export let data;

	let { supabase, params, quiz_data, courses } = data
	$: ({ supabase, params, quiz_data, courses } = data)

	let course_data = data.courseData;



</script>


<div class="w-full">
	<section class="p-1 mt-4">
		<div class="container mx-12 my-5">
			<div class="flex justify-between items-center mb-6">

			</div>
		</div>
	</section>

	<div class="w-full flex">

		<div class="flex-1 border h-4/5">

			<form method="POST" action="?/submitAssignment">

			</form>
		</div>

		<!-- Right Side Comments Box -->
		<div class="w-1/4 bg-gray-100 p-4  right-0 h-4/5 flex flex-col">
			<div class="h-4/5 overflow-y-auto">
				<!-- Comments Go Here -->

			</div>
			<div class="mt-4">

			</div>
		</div>
	</div>
</div>





