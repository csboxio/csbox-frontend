<script lang="ts">
    import { Auth } from '$lib/auth-ui-svelte';
    import { ThemeSupa, type SocialLayout, type ViewType } from '$lib/auth-ui-shared';
    import MenuIcon from './MenuIcon.svelte';
    import ToggleButton from './ToggleButton.svelte';
    import { browser } from "$app/environment";
    import { Turnstile } from "svelte-turnstile";
    import { blur } from 'svelte/transition';



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
    //console.log(supabase)

    const customTheme = {
        default: {
            colors: {
                brand: 'hsl(153 60.0% 53.0%)',
                brandAccent: 'hsl(154 54.8% 45.1%)',
                brandButtonText: 'white',
                // ..
            },
        },
        dark: {
            colors: {
                brandButtonText: 'white',
                defaultButtonBackground: '#2e2e2e',
                defaultButtonBackgroundHover: '#3e3e3e',
                //..
            },
        },
        // You can also add more theme variations with different names.
        evenDarker: {
            colors: {
                brandButtonText: 'white',
                defaultButtonBackground: '#1e1e1e',
                defaultButtonBackgroundHover: '#2e2e2e',
                //..
            },
        },
    }


    let token;
    $: token;

</script>

<body class="antialiased bg-body text-body font-body bg-gray-600 h-screen">
<div class="">
    <div class="dark:bg-scale-200 bg-scale-100 relative py-2 pb-16">
        <div
          class="sm:py-18 gap container relative mx-auto grid  px-6 py-16 md:gap-16 md:py-24 lg:gap-16 lg:px-16 lg:py-24 xl:px-20"
        >
            <div class="relative col-span-12 mb-16 md:col-span-7 md:mb-0 lg:col-span-6">
                <div class="relative lg:mx-auto lg:max-w-md bg-gray-600">
                    <div class={'auth-box-shadow'}>
                        <div class="border-scale-400 bg-scale-300 relative rounded-xl px-8 py-12 drop-shadow-sm">
                            <div class="mb-6 flex flex-col gap-6">
                                <div class="flex items-center gap-3">
                                    <h1 class="text-scale-1200 text-2xl text-white">CSBOX</h1>
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
											brand: 'rgb(72,159,194)',
											brandAccent: `rgb(94,187,224)`
										},
										radii: {
											borderRadiusButton: '10px',
											buttonBorderRadius: '10px',
											inputBorderRadius: '10px'
										}
									}
								}
							}}
                              providers={['google', 'github']}
                              queryParams={{
                                access_type: 'offline',
                                prompt: 'consent',
                                hd: 'csbox.io',
                              }}
                              captchaToken={token}
                              {socialLayout}
                            />
                            <div class="flex justify-center text-center">
                                {#if browser}
                                    <Turnstile siteKey="0x4AAAAAAAFpCF8-h1TYQKHV" on:turnstile-callback={e => {token = e.detail.token}} />
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>

<style>
    .auth-box-shadow {
        min-width: 364px;
        box-shadow: -2px 1px 69px 5px rgb(57, 67, 93);
        border-radius: 1rem;
    }
</style>