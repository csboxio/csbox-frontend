<script lang="ts">
	let model;
	export let data;
	let course_data = data.courseData;
	import {
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from "flowbite-svelte";
	let searchTerm = '';

</script>

<div class="w-full">

	<section class="p-1">

		<div class="container">

			<h4 class="text-xl font-bold text-white -mx-auto my-5">People</h4>
			<button
				class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
				font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
				group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
				focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800">
				<span
					class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
					dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
					Add
				</span>
			</button>

			<div class="py-4">
				<div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
					<TableSearch placeholder="Search by name..." hoverable={true} bind:inputValue={searchTerm}>
						<Table shadow hoverable>
							<TableHead>
								<TableHeadCell>Name</TableHeadCell>
								<TableHeadCell>Enrolled</TableHeadCell>
								<TableHeadCell>Date Enrolled</TableHeadCell>
								<TableHeadCell>
									<span class="sr-only ">Edit</span>
								</TableHeadCell>
							</TableHead>
							<TableBody class="divide-y">

									<TableBodyRow  class="cursor-pointer">
										<TableBodyCell>Name</TableBodyCell>
										<TableBodyCell>True</TableBodyCell>
										<TableBodyCell>Date</TableBodyCell>
										<TableBodyCell tdClass="py-4 whitespace-nowrap font-medium">
											<a class="font-medium
								text-blue-600 hover:underline dark:text-blue-500 px-1">
												Edit
											</a>
											<a class="font-medium text-blue-600
								hover:underline dark:text-red-500">
												Delete
											</a>
										</TableBodyCell>
									</TableBodyRow>

							</TableBody>
						</Table>
					</TableSearch>
				</div>
			</div>
		</div>
	</section>
</div>
