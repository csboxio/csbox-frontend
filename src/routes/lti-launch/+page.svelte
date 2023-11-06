<script lang="ts">
	import { page } from '$app/stores';
	export let data

	let { supabase, claim, launch } = data
	$: ({ supabase, claim, launch } = data)



</script>

<body class="dark:bg-gray-600  bg-gray-100 antialiased bg-body text-body font-body">
{#key launch}
{#if launch.userInfo}
	<div class="text-white font-bold text-xl text-center p-20">
		Check your email {launch.userInfo.name} for a link!<br>
	</div>

	<div class="animate-bounce text-center text-white font-bold">
		Waiting...
	</div>
	{JSON.stringify(launch.userInfo)}
	{#if launch.userInfo.user}
		user
	{/if}
{/if}
	{/key}
</body>
