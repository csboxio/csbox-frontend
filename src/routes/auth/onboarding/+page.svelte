<!-- ProfileSetup.svelte -->
<script>
	import {applyAction, deserialize} from "$app/forms";
	import {goto, invalidate, invalidateAll} from "$app/navigation";
	import {Checkbox, Input, Label, StepIndicator, Textarea} from "flowbite-svelte";
	import Fa from 'svelte-fa/src/fa.svelte';
	import {faFlagUsa, faSpinner, faUpload} from "@fortawesome/free-solid-svg-icons";
	import {uploadAvatar} from "$lib/utilities/imageStorage";
	import {loading} from "$lib/utilities/imageStorage";
	import { fade } from 'svelte/transition';
	import {browser} from "$app/environment";
	import UploadProfileImage from "$lib/components/Image/UploadProfileImage.svelte";


	export let data
	let { supabase, session } = data
	$: ({ supabase, session } = data)
	let uploading;


	let step = 1;

	let user = {
		first_name: '',
		last_name: '',
		email: '',
		country: '',
		website: '',
		bio: ''
	};

	async function handleSubmit(event) {
		const data = new FormData(this);
		const response = await fetch(this.action, {
			method: 'POST',
			body: data,
			headers: {
				'x-sveltekit-action': 'true',
			}
		});
		const result = deserialize(await response.text());
		await applyAction(result);
		await invalidateAll();
		if (result.type === 'redirect') {
			// re-run all `load` functions, following the successful update
			await goto('/d')
		}
		await goto('/d')
	}

	async function handleRoleSubmit() {
		const data = new FormData(this);
		const response = await fetch(this.action, {
			method: 'POST',
			body: data,
			headers: {
				'x-sveltekit-action': 'true',
			}
		});
		const result = deserialize(await response.text());
		if (result.type === 'redirect') {
			// re-run all `load` functions, following the successful update
			await invalidateAll();

		}
		await invalidateAll();
		await applyAction(result);
		currentStep = currentStep + 1;
	}

	let steps = ['Step 1', 'Step 2', 'Step 3'];
	let currentStep = 1;
	$: currentStep;

	let uploadedAvatarUrl;
	$: uploadedAvatarUrl;

	let files = [];
	let container;
	let image;
	let placeholder;
	let showImage = false;

	let selectedRole;

	function onChangePreview() {

		if (files.length > 0) {
			const file = files[0];
			console.log(file)
			showImage = true;

			const reader = new FileReader();

			reader.addEventListener("load", function() {
				image.setAttribute("src", reader.result);
			});
			reader.readAsDataURL(file);

			return;
		}
		showImage = false;
	}

	if (browser) {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code')
		if (code) {
			supabase.auth.exchangeCodeForSession(code);
			invalidate('supabase:auth');
		}
	}
</script>

<body class="bg-gray-600 antialiased bg-body text-body font-body">
<div class="from-gray-500 to-gray-500 bg-gradient-to-br antialiased bg-body text-body font-body">
	<section class="">
		<div class="container px-6 mx-auto 2xl:w-[27%] xl:w-2/5 lg:w-2/3 md:w-2/3 sm:w-full">
			<div class="min-h-screen gap-4 flex justify-center items-center">

				<div class="flex justify-around i items-center w-full">

					<div class="p-6 bg-gray-600 rounded-xl w-full">

						<!--Header-->
						<div
								class="flex flex-wrap items-center justify-between -mx-4 mb-8 pb-6 border-b border-gray-400 border-opacity-20">
							<div class="w-full sm:w-auto px-4 mb-6 sm:mb-0">
								<h4 class="text-2xl font-bold tracking-wide text-white mb-1">Onboarding</h4>
							</div>
						</div>

						<div class="mb-8">
							<StepIndicator {currentStep} {steps} hideLabel color="blue"/>
						</div>
	<form action="?/updateProfile" method="POST" on:submit|preventDefault={handleSubmit}>
	{#if currentStep === 1}
		<div class="w-full  px-3 mb-2 lg:mb-0 items-center justify-center">
			<div class="mb-2 text-center">
				<div class="text-xl font-bold tracking-wide text-white mb-1">Profile Picture</div>
			</div>
			<UploadProfileImage bind:data={data}/>
			<div class="flex justify-between w-full sm:w-auto mt-2">
				<div>
					<a class="inline-block py-2 px-4 mr-3 text-xs text-center font-semibold leading-normal text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200 cursor-not-allowed" disabled >
						Back
					</a>
				</div>

				<button
						class="inline-block py-2 px-4 text-sm text-center font-bold leading-normal text-gray-100 bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-200"
						on:click|preventDefault={() => {currentStep = 2;}}>
					{#if loading}
						<svg class="animate-spin h-4 w-4 mr-3 inline">
							<Fa icon={faSpinner} size="xs" />
						</svg>
					{/if}
					Next
				</button>
			</div>
		</div>
	{/if}

	{#if currentStep === 2}
		<!-- Student or Instructor Dropdown -->
		<!-- Submits form to /updateRole -->
		<!-- On select Instructor make a if block to show an input box -->
		<form method="POST" action="?/updateRole" on:submit|preventDefault={handleRoleSubmit}>
			<div class="mb-10">
				<label for="roles" class="block mb-2 text-white">Role: </label>
				<select
						id="roles"
						bind:value={selectedRole}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
						required>

					<option value="">Choose a role</option>
					<option value="Student">Student</option>
					<option value="Instructor">Instructor</option>
				</select>
			</div>

			{#if selectedRole === 'Instructor'}
				<div class="mb-4">
					<label for="instructorInput" class="block mb-2 text-white">Access Code:</label>
					<input
							type="text"
							id="instructorInput"
							name="instructorInput"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
							placeholder="Enter Access Code"
							required
					/>
				</div>
			{/if}
			<div class="flex justify-between w-full sm:w-auto mt-2">
				<div>
					<button class="inline-block py-2 px-4 mr-3 text-xs text-center font-semibold leading-normal text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200"
							on:click|preventDefault={() => {currentStep = 1;}}>
						Back
					</button>
				</div>

				<button type="submit" class="inline-block py-2 px-4 text-sm text-center font-bold leading-normal text-gray-100 bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-200">
					{#if loading}
						<svg class="animate-spin h-4 w-4 mr-3 inline">
							<Fa icon={faSpinner} size="xs" />
						</svg>
					{/if}
					Next
				</button>
			</div>

		</form>


	{/if}

	{#if currentStep === 3}
		<div class="w-full px-3">
				<div class="relative  mx-4">
					<div class="">
						<div class="relative group">
							<div class="justify-center py-8 rounded-lg px-8 items-center">
								<div class="flex flex-wrap -mx-10 -mb-6 text-white font-semibold">
									<div class="grid grid-cols-1 gap-2 w-full text-white mb-6">
										<div class="mb-6">
											<Label for="first" class="block mb-2 text-white">First Name:</Label>
											<Input id="first" name="first" class="w-full" required bind:value={user.first_name} />
										</div>
										<div class="mb-6">
											<Label for="last_name" class="block mb-2 text-white">Last Name:</Label>
											<Input id="last_name" name="last_name" class="w-full" required bind:value={user.last_name} />
										</div>
										<div class="mb-10">
											<Label for="country" class="block mb-2 text-white">Country:</Label>
											<select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white" required>
												<option selected>Choose a country</option>
												<option value="US"> United States </option>
											</select>
										</div>
										<div class="flex items-center mb-1 -pb-2">
											<input id="age" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required>
											<label for="age" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I confirm that I am over the age of 13</label>
										</div>

										<div class="flex items-center mb-1">
											<input id="aup" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required>
											<label for="aup" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I read and agree with the </label>
											<a href="/legal/aup" class="text-sm hover:underline px-2"> Acceptable Use Policy</a>
										</div>

										<div class="flex items-center mb-1">
											<input id="privacy" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required>
											<label for="privacy" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I read and agree with the </label>
											<a href="/legal/privacy" class="text-sm hover:underline px-2"> Privacy Policy</a>
										</div>

										<div class="flex items-center mb-4">
											<input id="terms" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required>
											<label for="terms" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I read and agree with the </label>
											<a href="/legal/terms" class="text-sm hover:underline px-2"> Terms and Conditions</a>
										</div>
									</div>
									<div class="w-full mb-2 items-center text-center">
										<button class="py-2 px-4 text-md font-semibold leading-normal text-white bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-200">
											Complete
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
		</div>
	{/if}
	</form>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
</body>

