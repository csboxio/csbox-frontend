<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa, type SocialLayout, type ViewType } from '@supabase/auth-ui-shared';
	import MenuIcon from './MenuIcon.svelte';
	import ToggleButton from './ToggleButton.svelte';
	import { browser } from "$app/environment";
	import { Turnstile } from "svelte-turnstile";


	const colors = [
		'rgb(202, 37, 37)',
		'rgb(65, 163, 35)',
		'rgb(8, 107, 177)',
		'rgb(235, 115, 29)'
	] as const;

	const socialAlignments = ['horizontal', 'vertical'] as const;

	const radii = ['5px', '10px', '20px'] as const;

	const views: { id: ViewType; title: string }[] = [
		{ id: 'sign_in', title: 'Sign In' },
		{ id: 'sign_up', title: 'Sign Up' },
		{ id: 'magic_link', title: 'Magic Link' },
		{ id: 'forgotten_password', title: 'Forgotten Password' },
		{ id: 'update_password', title: 'Update Password' },
		{ id: 'verify_otp', title: 'Verify Otp' }
	];

	let brandColor = colors[0];
	let socialLayout = socialAlignments[0] satisfies SocialLayout;
	let borderRadius = radii[0];
	let view = views[0];

	export let data

	let { supabase, session, user } = data
	$: ({ supabase, session, user } = data)
	console.log(supabase)
</script>

<svelte:head>
	<title>Auth UI Svelte</title>
</svelte:head>

<div class="dark:bg-scale-200 bg-scale-100 relative py-2 pb-16">
	<div
		class="sm:py-18 gap container relative mx-auto grid  px-6 py-16 md:gap-16 md:py-24 lg:gap-16 lg:px-16 lg:py-24 xl:px-20"
	>
		<div class="relative col-span-12 mb-16 md:col-span-7 md:mb-0 lg:col-span-6">
			<div class="relative lg:mx-auto lg:max-w-md bg-zinc-900">
				<div class={'container-redshadow'}>
					<div class="border-scale-400 bg-scale-300 relative rounded-xl px-8 py-12 drop-shadow-sm">
						<div class="mb-6 flex flex-col gap-6">
							<div class="flex items-center gap-3">
								<h1 class="text-scale-1200 text-2xl">CSBOX</h1>
							</div>
						</div>
						<Auth
							supabaseClient={supabase}
							theme="dark"
							view={view.id}
							appearance={{
								theme: ThemeSupa,
								style: {
									button: `border-radius: ${'10px'}; border-color: rgba(0,0,0,0);`
								},
								variables: {
									default: {
										colors: {
											brand: 'rgb(67,98,190)',
											brandAccent: `gray`
										},
										radii: {
											borderRadiusButton: '10px',
											buttonBorderRadius: '10px',
											inputBorderRadius: '10px'
										}
									}
								}
							}}
							providers={['apple', 'google', 'github']}
							{socialLayout}
						/>
						<div class="flex justify-center text-center">
							{#if browser}
								<Turnstile siteKey="0x4AAAAAAAFpCF8-h1TYQKHV" />
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.container-redshadow {
		min-width: 364px;
		box-shadow: -2px 1px 69px 5px rgb(114, 130, 210);
		border-radius: 1rem;
	}
</style>