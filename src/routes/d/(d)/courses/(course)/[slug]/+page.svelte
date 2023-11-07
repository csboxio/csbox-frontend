<svelte:options accessors={true} />

<script lang="ts">
	import { updateCourseInsert } from '$lib/utilities/quill';
	import { page } from '$app/stores';
	import 'quill/dist/quill.bubble.css'
	import QuillBlock from "$lib/blocks/quillBlock.svelte";
	import {format, formatDistanceToNow, formatISO, parseISO} from "date-fns";

	export let data;

	let { supabase, claim } = data
	$: ({ supabase, claim } = data)
	
	let courses;
	$: courses = $page.data.courses.data;
	let user = $page.data.session?.user

	let course;
	$: course = courses.filter((course) => course.id === parseInt($page.data.slug))[0]

	let todo;
	$: todo = $page.data.todo;


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
</script>

<div class="flex flex-row grow max-w-full-1/2">
	<section class=" grow max-w-full-1/2">

		<QuillBlock bind:supabase={supabase} bind:storePath={storePath}
					bind:filePath={filePath} bind:bucket={bucket} bind:claim={claim}
					saveFunction={saveFunction} mode={mode} editButton={true}/>

	</section>

	{#if todo}
		{#if todo.length > 0}
	<div class="flex flex-col space-y-4 pt-7 mr-4 h-screen overflow-y-auto">
		<h4 class="sticky text-lg font-bold dark:text-white  leading-7 mb-1 inline-block"> Coming up... </h4>

		{#each todo as todo (todo.assignment_id)}
			<a href="{window.location.href}/assignments/{todo.assignment_id}">
			<div class="bg-gray-700 hover:bg-gray-500 p-3 shadow rounded-md max-w-[14em]">
				<h2 class="text-lg font-semibold text-white truncate">{todo.title}</h2>
				<p class="text-gray-100">{formatDistanceToNow(parseISO(todo.due), {addSuffix: false})}</p>
			</div>
			</a>
		{/each}
	</div>
		{/if}
	{/if}

</div>
