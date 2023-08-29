<script lang="ts">
	import {onMount} from "svelte";
	import {navStore} from "../../../../../../../lib/stores/stores.js";
	import {page} from "$app/stores";
	import {updateCourseInsert} from "../../../../../../../lib/utilities/quill.js";
	export let data;
	import QuillBlock from "$lib/blocks/quillBlock.svelte";
	import InteractiveCodeBlock from "$lib/components/Course/lessons/InteractiveCodeBlock.svelte";

	// QUILL
	let courses;
	$: courses = $page.data.courses.data;

	let course;
	$: course = courses.filter((course) => course.id === parseInt($page.data.slug))[0]

	async function saveFunction() {
		await updateCourseInsert($page.params.slug, user.id, supabase)
	}

	let storePath = `home-${$page.params.slug}-document`
	let bucket = "courses"
	let filePath
	$: filePath = `${$page.params.slug + '/' + 'document/' + 'home'}.HTML?t=${course.updated_at}`

	const mode = {
		edit: false,
		view: true
	};
	// ------

	let { supabase, claim, user } = data
	$: ({ supabase, claim, user } = data)

	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('courses');
	});

	class App {
		items: { type: string }[] = [];

		constructor() {
			this.addItem('markdown'); // Initial item
		}

		addItem(type: string): void {
			if (type === 'markdown') {
				this.items = [{ type: 'markdown' }, ...this.items];
			} else if (type === 'interactive') {
				this.items = [{ type: 'interactive' }, ...this.items];
			}
		}
	}

	let app = new App();

	onMount(() => {
		app.addItem('markdown'); // Initial item
	});
</script>

<div class="w-full">
	<section class="pl-1 pt-1 mt-4">
		<div class="">
			<div class="flex flex-col -mx-20 my-2 pl-14 -mb-6 text-white font-semibold mr-0.5 ">
				<div class="flex items-center">
					<div class="cursor-pointer mr-2" on:click={() => app.addItem('markdown')}>
						<span>+</span>
					</div>
					<div class="cursor-pointer" on:click={() => app.addItem('interactive')}>
						<span>+</span>
					</div>
				</div>

				<div class="border-t mt-5"></div>

				{#each app.items as item, index (item.type + index)}
					{#if item.type === 'markdown'}
						<QuillBlock bind:supabase={supabase} bind:storePath={storePath}
									bind:filePath={filePath} bind:bucket={bucket} bind:claim={claim}
									saveFunction={saveFunction} mode={mode} editButton={false}/>

					{:else if item.type === 'interactive'}
						<InteractiveCodeBlock />
					{/if}
				{/each}
			</div>
		</div>
	</section>
</div>


