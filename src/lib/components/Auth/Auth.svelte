<script lang="ts">
    import { Auth } from '$lib/auth-ui-svelte';
    import { ThemeSupa, type SocialLayout, type ViewType } from '$lib/auth-ui-shared';
    import { browser } from "$app/environment";
    import { Turnstile } from "svelte-turnstile";
    import {authTitle} from "$lib/stores/stores.js";


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

    export let supabase

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

<body class="antialiased bg-body text-body font-body bg-gray-700">
<div class="min-h-screen">
    <div class="dark:bg-gray-700 bg-gray-700 relative py-4 sm:py-8 lg:py-16 flex items-center justify-center h-screen ">
        <div class="w-full max-w-sm sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg">
            <div class="lg:mx-auto bg-gray-600 h-full sm:h-auto">
                    <div class={'auth-box-shadow'}>
                        <div class="border-scale-200 bg-scale-300 relative rounded-xl px-8 py-8 md:py-12 drop-shadow-sm">
                            <div class="mb-6 flex flex-col gap-6">
                                <div class="flex items-center gap-3">
                                    <img src="/favicon.png" width="50" height="100%" alt="CSBOX">

                                    {#if authTitle !== undefined}
                                    <div class="flex text-white font-semibold text-xl">{$authTitle?.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</div>
                                        {/if}
                                </div>
                                <!-- Title -->
                            </div>
                            <Auth
                              supabaseClient={supabase}
                              theme="dark"
                              view={view.id}
                              appearance={{
								theme: ThemeSupa,
								style: {
									button: `border-radius: ${'20px'}; border-color: rgba(0,0,0,0);`
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
</body>

<style>
    .auth-box-shadow {
        min-width: 364px;
        box-shadow: -2px 1px 69px 5px rgba(74, 95, 115, 0.52);
        border-radius: 0.5rem;
    }
</style>