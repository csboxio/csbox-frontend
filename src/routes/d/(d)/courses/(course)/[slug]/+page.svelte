<svelte:options accessors={true} />

<script lang="ts">
	import { updateCourseInsert } from '$lib/utilities/quill';
	import { page } from '$app/stores';
	import 'quill/dist/quill.bubble.css'
	import QuillBlock from "$lib/blocks/quillBlock.svelte";
	import {onMount} from "svelte";
	import {navStore} from "../../../../../../lib/stores/stores.js";
	import ModuleAccordion from "$lib/components/UI/ModuleAccordion.svelte";

	export let data;

	let { supabase, claim } = data
	$: ({ supabase, claim } = data)
	
	let courses;
	$: courses = $page.data.courses.data;
	let user = $page.data.session?.user

	let course;
	$: course = courses.filter((course) => course.id === parseInt($page.data.slug))[0]

	async function saveFunction() {
		await updateCourseInsert($page.params.slug, user.id, supabase)
	}

	let storePath = `home-${$page.params.slug}-document`
	let bucket = "courses"
	let filePath
	$: filePath = `${$page.params.slug + '/' + 'document/' + 'home'}.HTML?t=${course.updated_at}`

	let items = ["test"]
</script>

<div class="flex flex-row grow max-w-full-1/2">
	<section class="p-1 grow max-w-full-1/2">

		<QuillBlock bind:supabase={supabase} bind:storePath={storePath}
					bind:filePath={filePath} bind:bucket={bucket} bind:claim={claim}
					saveFunction={saveFunction} />
	</section>


</div>
