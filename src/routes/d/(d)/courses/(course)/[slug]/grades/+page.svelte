<script lang="ts">
	import {onMount} from "svelte";
	import {navStore} from "../../../../../../../lib/stores/stores.js";
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from "flowbite-svelte";

	export let data;
	let course_data = data.courseData;
	let grades;
	//$: grades = data.gradesData;
	// For search box on assignments
	let searchTerm = '';
	//$: filteredItems = grades.filter(
	//		(grade) => grade.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	//);

	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('courses');
	});
</script>

<div class="w-full">
	<section class="p-1 mt-4">
		<div class="container">
				<div>
					<div class="relative overflow-x-auto sm:rounded-lg w-full">
						<!--
						<TableSearch placeholder="Search by title..." hoverable={true} bind:inputValue={searchTerm}>
							<Table hoverable>
								<TableHead>

									<TableHeadCell>Title</TableHeadCell>

									<TableHeadCell>
										<span class="sr-only ">Edit</span>
									</TableHeadCell>
								</TableHead>
								<TableBody class="divide-y">
									{#key grades}
										{#each filteredItems as { assignment_id, title, category, due, points }, i}
											<TableBodyRow class="cursor-pointer">
												<TableBodyCell >{title ? title : 'No title'}</TableBodyCell>
												<TableBodyCell >{category ? category : "No category" }</TableBodyCell>
												<TableBodyCell >{due ? due.substring(0, 10) : "No date" }</TableBodyCell>
												<TableBodyCell >{points ? points : "No Points" }</TableBodyCell>

												<TableBodyCell tdClass="py-4 whitespace-nowrap font-medium"  >


												</TableBodyCell>
											</TableBodyRow>
										{/each}
									{/key}
								</TableBody>
							</Table>
						</TableSearch>
						-->
					</div>
			</div>
		</div>
	</section>
</div>
