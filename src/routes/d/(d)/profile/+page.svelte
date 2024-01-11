<script lang="ts" xmlns="http://www.w3.org/1999/html">
	import {goto, invalidateAll} from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import Navbar from "$lib/components/Navbar.svelte";
	import Fa from 'svelte-fa/src/fa.svelte';
	import {navStore} from "../../../../lib/stores/stores.js";
	import {onMount} from "svelte";
	import Settings from "$lib/components/Settings.svelte";
	import {uploadAvatar} from "$lib/utilities/imageStorage.js";
	import {faUpload} from "@fortawesome/free-solid-svg-icons";
	import {Input, Label, Textarea} from "flowbite-svelte";
	import {page} from "$app/stores";

	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('profile');
	});

	let loading;
	export let data
	let { supabase, session } = data
	$: ({ supabase, session } = data)
	let files;
	let uploading = false;
	let user
	$: user = $page.data.user?.data

	function initializeUser(user) {
		const defaults = {
			first_name: "",
			last_name: "",
			email: "",
			country: "",
			website: "",
			bio: ""
		};

		return { ...defaults, ...user };
	}

	// Initialize the user object with default values
	user = initializeUser(user);

	const user_session = $page.data.session?.user;


	async function handleSubmit(event) {
		loading = true;
		const data = new FormData(this);
		const response = await fetch(this.action, {
			method: 'POST',
			body: data,
			headers: {
				'x-sveltekit-action': 'true',
				'cache-control': 'max-age=1800'
			}
		});
		const result = deserialize(await response.text());
		if (result.type === 'redirect') {
			// re-run all `load` functions, following the successful update
			await invalidateAll();
		}
		await applyAction(result);
	}

	async function signOut() {
		try {
			let { error } = await  $page.data.supabase.auth.signOut()
			if (error) throw error
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message)
			}
		}
		await goto('/')
	}

</script>

<style>
	@keyframes pulse-red {
		0%, 100% {
			opacity: 1;
			color: red; /* Set the color to red at the start and end of the animation */
		}
		50% {
			opacity: 0.5;
			color: #ff7f7f; /* Set a lighter shade of red or any color you prefer in the middle of the animation */
		}
	}
</style>

<body class="bg-gray-600 antialiased bg-body text-body font-body">
<Navbar/>

<div class="mx-auto lg:ml-16">
	<section>
		<div class="pt-3 pb-3 px-8 dark:bg-gray-700 bg-white">
			<div class="flex flex-wrap items-center justify-between -mx-2">
				<div class="w-full lg:w-auto px-2 mb-6 lg:mb-0">
					<h4 class="text-2xl font-bold dark:text-white  tracking-wide leading-7 mb-1">Settings</h4>
				</div>
				<div class="w-full lg:w-auto px-2">
					<Settings bind:user={user} bind:supabase={supabase} />

				</div>
			</div>
		</div>
	</section>
	<section class="flex flex-col p-8 h-screen">
		<section class="py-3">
			<div class="container px-12 mx-auto">
				<div class="flex flex-wrap -mx-3 ">
					<div class="w-full lg:w-1/3 px-3 mb-6 lg:mb-0">
						<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center">
							<img class="rounded-full w-24 h-24 inline-block" src={user?.avatar_url} alt="image description">
							<div class="inline-block ml-4">
								<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white">{$page.data.user?.data.first_name} {user?.last_name}</h5>



								<main>
									<label class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white
									bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
									dark:hover:bg-blue-700 dark:focus:ring-blue-800">
										<input class="hidden" type="file" id="single" accept="image/*" bind:files on:change={uploadAvatar(files, uploading, user.avatar_url, session, supabase)} disabled={uploading}>
										<div class="m-1">
											<Fa icon={faUpload} size="xs" />
										</div>
										Upload Profile Icon
									</label>
									<button class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white
									bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
									 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2"
											on:click={signOut}>
										Sign out
									</button>
								</main>
							</div>
						</div>
					</div>
					<div class="w-full lg:w-2/3 px-3">
						<form action="?/updateProfile" method="POST" on:submit|preventDefault={handleSubmit}>
							<div class="relative mb-8 mx-4 ">
								<div class="  ">
									<div class="relative group">
										<div class="px-24 py-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center">
											<div class="flex flex-wrap -mx-10 -mb-6 text-white font-semibold">
												<h4 class="text-2xl font-bold tracking-wide text-white mb-4">General Information</h4>
												<div class="grid grid-cols-2 gap-6 w-full">
													<div class="mb-6">
														<Label for="first" class="block mb-2 text-red-500 {user?.first_name == '' ? 'animate-pulse pulse-red text-red-500' : ''}">First Name:</Label>
														<Input id="first" name="first" class="w-full" bind:value={user.first_name} />
													</div>
													<div class="mb-6">
														<Label for="last_name" class="block mb-2">Last Name:</Label>
														<Input id="last_name" name="last_name" class="w-full" bind:value={user.last_name} />
													</div>
													<div class="mb-6">
														<Label for="email" class="block mb-2">Email Address:</Label>
														<Input id="email" name="email" class="w-full" bind:value={session.user.email}/>
													</div>
													<div class="mb-6">
														<Label for="country" class="block mb-2">Country:</Label>
														<Input id="country" name="country" class="w-full" bind:value={user.country}></Input>
													</div>

													<div class="mb-6">
														<Label for="website" class="block mb-2">Github:</Label>
														<Input id="website" name="website" class="w-full" bind:value={user.website} />
													</div>
													<div class="mb-6">
														<Label for="bio" class="block mb-2">Bio:</Label>
														<Textarea id="bio" name="bio" class="w-full" bind:value={user.bio} />
													</div>

												</div>
												<div class="w-full sm:w-auto mb-4">
													<div>
														<input class="inline-block py-2 px-4 text-xs text-center font-semibold leading-normal text-white bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-200"
															   href="/dashboard"
															   rel="external"
															   type="submit"
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	</section>
</div>
</body>




