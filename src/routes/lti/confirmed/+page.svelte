<script lang="ts">
	import { page } from '$app/stores';
	export let data

	let { supabase, claim, launch } = data
	$: ({ supabase, claim, launch } = data)


</script>

<body class="dark:bg-gray-600  bg-gray-100 antialiased bg-body text-body font-body">
	<div class="text-white font-bold text-xl text-center p-20">
		Confirmed! You may go back to your LMS!
	</div>
</body>
