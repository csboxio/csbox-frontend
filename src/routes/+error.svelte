<script type="module">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(async () => {
		goto('/');
	});
</script>

<h1>{$page.error.message}</h1>
<hr />
<h1>Looks like the spaghetti code broke...</h1>
<hr />
<h2>Sign out and sign back in.</h2>
<h2>Clear browser cache & cookies.</h2>
