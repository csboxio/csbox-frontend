<script lang="ts">
	import type { ActionData } from './$types';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { Register, Section } from "flowbite-svelte-blocks";
	import { Button, Checkbox, Input, Label } from "flowbite-svelte";
	import { Turnstile } from "svelte-turnstile";
	import { browser } from "$app/environment";

	export let form: ActionData;
	let loading = false;

	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let scale = tweened(1, { duration: 800, easing: cubicOut });
	let boxShadow = tweened('0 0 0 rgba(0, 0, 0, 0)', { duration: 800, easing: cubicOut });

	function startAnimation() {
		scale.set(0.95);
		boxShadow.set('0 0 10px rgba(0, 0, 0, 0.3)');
		scale.set(1);
		boxShadow.set('0 0 0 rgba(0, 0, 0, 0)');
	}
</script>

		<!--
		<section class="h-screen relative pt-16 pb-36 bg-gradient-black2 overflow-hidden">
			<img
				class="absolute top-0 transform left-1/2 -translate-x-1/2"
				src="/elements/radial.svg"
				alt=""
			/>
			<div class="relative z-10 container mx-auto px-4">
				<div class="flex flex-wrap -m-6">
					<div class="w-full p-6">
						<div class="md:max-w-xl text-center mx-auto">
							<h2 class="mb-4 font-heading font-bold text-gray-100 text-6xl sm:text-7xl">
								Register
							</h2>
							{#if form?.error}
								<div class="block notification is-danger">{form.error}</div>
							{/if}
							<p class="mb-11 text-lg text-gray-200">Please fill out the information below!</p>
							<form class="row flex-center flex" method="POST" action="?/signup">
								{#if form?.missing}<p class="error">The email field is required</p>{/if}
								{#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if}
								<div class="flex flex-wrap max-w-md mx-auto -m-2 mb-5">
									<div class="w-full p-2">

										<input
											class="w-full px-5 py-3.5 text-gray-500 placeholder-gray-500 bg-white outline-none focus:ring-4 focus:ring-indigo-500 border border-gray-200 rounded-lg"
											type="email"
											placeholder="Email address"
											name="email"
											autocomplete="username"
											value={form?.values?.email ?? ''}
										/>
									</div>

									<div class="w-full p-2">
										<input
											class="w-full px-5 py-3.5 text-gray-500 placeholder-gray-500 bg-white outline-none focus:ring-4 focus:ring-indigo-500 border border-gray-200 rounded-lg"
											id="password"
											type="password"
											placeholder="Password"
											name="password"
											autocomplete="current-password"
											required
										/>
									</div>
									<div class="w-full p-2">
										<div class="group relative">
											<div
												class="absolute top-0 left-0 w-full h-full bg-gradient-blue opacity-0 group-hover:opacity-50 rounded-lg transition ease-out duration-300"
											/>
											<button
												class="p-1 w-full font-heading font-medium text-base text-white overflow-hidden rounded-md"
											>
												<div class="relative py-4 px-9 bg-gradient-blue overflow-hidden rounded-md">
													<input
														on:submit|preventDefault
														type="submit"
														class="absolute top-0 left-0 transform -translate-y-full group-hover:-translate-y-0 h-full w-full bg-gray-900 transition ease-in-out duration-500"
														disabled={loading}
														value=""
													/>
													<p class="relative z-10">{loading ? 'Loading' : 'Submit'}</p>
												</div>
											</button>
										</div>
									</div>
								</div>
							</form>
							<p class="text-base text-gray-200">
								<span>Already have an account?</span>
								<a class="text-blue-500 hover:text-blue-300" href="/">Login</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	-->

<style>
	.jaw-dropping-button {
		display: inline-block;
		overflow: hidden;
		border: none;
		outline: none;
		background: linear-gradient(135deg, #1a202c, #3c366b, #1a202c);
		background-size: 400% 400%;
		background-position: center;
		color: white;
		padding: 1rem 2rem;
		font-size: 1.2rem;
		border-radius: 0.25rem;
		transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
		cursor: pointer;
	}

	.jaw-dropping-button:hover {
		transform: scale(1.05);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		background-position: bottom right;
	}
</style>

<body class="antialiased bg-body text-body font-body">
<div class="">
	<section class="h-screen relative pt-16 pb-36 bg-gray-900 overflow-hidden">
		<div class="relative z-10 container mx-auto px-4">
				<div class="flex flex-wrap -m-6">
					<div class="w-full p-6">
						<div class="md:max-w-xl  mx-auto">

			<Section name="register" >
				<Register href="/">
			<svelte:fragment slot="top">
				CSBOX
			</svelte:fragment>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<form class="flex flex-col space-y-6" action="/">
					<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Create an account</h3>
					<Label class="space-y-2">
						<span>Your email</span>
						<Input type="email" name="email" placeholder="name@example.com" required />
					</Label>
					<Label class="space-y-2">
						<span>Your password</span>
						<Input type="password" name="password" placeholder="••••••••••••" required />
					</Label>
					<Label class="space-y-2">
						<span>Confirm password</span>
						<Input type="password" name="confirm-password" placeholder="••••••••••••" required />
					</Label>
					<div class="items-start">

						<ul
							class="w-48 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
						>
							<li class="p-1"><Checkbox>
								<div></div> <a class="p-0.5 font-medium text-primary-600 hover:underline dark:text-primary-500 px-1"
																						href="/legal/terms"> Terms and Conditions</a>
							</Checkbox></li>
							<li class="p-1"><Checkbox>
								<div></div> <a class="p-0.5 font-medium text-primary-600 hover:underline dark:text-primary-500 px-1"
																						href="/legal/privacy"> Privacy Policy</a>
							</Checkbox></li>
							<li class="p-1"><Checkbox>
								<div></div> <a class="p-0.5 font-medium text-primary-600 hover:underline dark:text-primary-500"
																						href="/legal/aup"> Acceptable Use Policy</a>
							</Checkbox></li>
						</ul>
					</div>
					{#if browser}
						<div class="flex justify-center items-center">
							<div class="">
						<Turnstile siteKey="0x4AAAAAAAFpCF8-h1TYQKHV"/>
						</div>
						</div>
					{/if}
					<button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
					 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600
					 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Register</button>

					<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
						Already have an account? <a
						href="/login"
						class="font-medium text-primary-600 hover:underline dark:text-primary-500"
					>Login here</a
					>
					</div>
				</form>
			</div>
		</Register>
			</Section>

		</div>
					</div>
				</div>
		</div>
	</section>
</div>
</body>
