<script lang="ts">
	import { page } from '$app/stores';
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
	export let data

	let { supabase, claim, launch } = data
	$: ({ supabase, claim, launch } = data)


</script>

<body class="dark:bg-gray-600  bg-gray-100 antialiased bg-body text-body font-body">

</body>
