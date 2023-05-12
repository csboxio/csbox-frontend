<script lang="ts" xmlns="http://www.w3.org/1999/html">
	import { page } from '$app/stores';
	import CourseImage from '$lib/components/CourseImage.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';

	async function handleSubmit(event) {
		const data = new FormData(this);
		const response = await fetch(this.action, {
			method: 'POST',
			body: data
		});
		const result = deserialize(await response.text());
		console.log(result)
		if (result.status === 200 && result?.data == 'Enrollment successful') {
			// re-run all `load` functions, following the successful update
			alert("Joined")
			await invalidateAll();
		}
		else {
			alert("Failed")
		}
	}
</script>

<!--Svelte-kit preloading doesn't like me changing the body background color between pages-->
<body class="bg-gray-600 antialiased bg-body text-body font-body">
<div class="relative h-screen">
	<div class=" z-0 w-full"></div>
	<form method="POST" action="?/joinCourse" on:submit|preventDefault={handleSubmit}
				class="flex flex-col items-center justify-center h-full">
		<div class="max-w-md mx-auto bg-gray-500 rounded-lg overflow-hidden shadow-md">
			<div class="px-6 py-4">
				<h2 class="text-2xl font-bold mb-2 text-white p-2">Join Course</h2>
					<div class="mb-4 p-2">
						<input
							type="text"
							name="code"
							id="code"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
								 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-500
								  dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
							placeholder="Code"
							required
						/>
					</div>
					<div class="flex items-center justify-between p-2">
						<button class="bg-gray-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" on:click={() => history.back()}>
							Cancel
						</button>
						<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
							Join
						</button>
					</div>
			</div>
		</div>
	</form>
</div>
</body>



