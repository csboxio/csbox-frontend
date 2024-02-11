<script lang="ts">
    import { Auth } from '$lib/auth-ui-svelte';
    import { ThemeSupa, type SocialLayout, type ViewType } from '$lib/auth-ui-shared';
    import { browser } from "$app/environment";
    import { Turnstile } from "svelte-turnstile";
    import {authTitle} from "$lib/stores/stores.js";
    import { onMount } from 'svelte';
    import { afterUpdate } from 'svelte';
    import {init} from "../home/scripts/init.js";
    import {fade, fly} from 'svelte/transition';


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


    export let supabase
    export let view = 'sign_in';
    export let lti = false;

    let classNames = {
            label: "text-xs text-white py-2 mb-0 block w-full",
            divider: "text-white text-center my-2",
            input: "py-2 px-3 border text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 rounded w-full mb-2",
            message: "font-regular text-center mb-4 block w-full p-4 text-base text-red-500 mt-5",
            anchor: "flex text-center justify-center text-white text-blue-300 hover:bg-gray-300 hover:bg-opacity-20 text-gray-800 py-2 px-4 rounded-md mt-1 text-sm",
        };

    if (lti) {
        classNames = {
            label: "text-xs text-white py-2 mb-0 block w-full",
            divider: "text-white text-center my-1",
            input: "py-2 px-3 border text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 rounded w-full mb-1",
            message: "font-regular text-center mb-4 block w-full p-4 text-base text-red-500 mt-2",
            anchor: "flex text-center justify-center text-white text-blue-300 hover:bg-gray-300 hover:bg-opacity-20 text-gray-800 py-1 px-4 rounded-md mt-1 text-sm",
        }
    }

    let token;
    $: token;

    onMount(() => {
        init();
    });
</script>

<style>

    .turnstile-placeholder {
        width: 300px; /* Set the width and height to match your Turnstile component */
        height: 300px;
        visibility: hidden;
    }

    .auth-box-shadow {
        min-width: 364px;
    }


</style>

<!-- Particles animation -->
<div class="absolute inset-0 z-10" aria-hidden="true">
    <canvas data-particle-animation></canvas>
</div>
<body class="antialiased bg-body text-body font-body bg-gray-700" data-sveltekit-preload-data="hover">
<div class="min-h-screen">

    <div class="dark:bg-gray-800 bg-gray-800 relative py-4 sm:py-8 lg:py-16 flex items-center justify-center h-screen ">

        <div class="w-full max-w-sm sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg z-10 ">

            <div class="lg:mx-auto bg-gray-600  sm:h-auto rounded-xl shadow-gray-400 drop-shadow-lg  ">
                    <div class={'auth-box-shadow'}>
                        <div class="border-scale-200 bg-scale-300 relative h-full px-8 {lti ? 'py-0': 'py-8 md:py-12'} drop-shadow-sm ">
                            <div class="mb-2 flex flex-col gap-2">
                                <div class="flex items-center gap-3">
                                    <img src="/favicon.png" width="50" height="100%" alt="CSBOX">

                                    {#if authTitle !== undefined}
                                        <div class="flex text-white font-semibold text-xl">{$authTitle?.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</div>
                                    {/if}

                                </div>
                                <!-- Title -->
                            </div>

                            <!-- Notice: Auth operation & Button styling has been changed from Library.
                                 Change: Custom styling on the component to allow difference between social and other buttons (Ex. Sign in).
                                 Change: Cloudflare Turnstile support
                                 See: \src\lib\auth-ui-svelte\dist\Auth\Auth.svelte
                                 See: \src\lib\auth-ui-svelte\dist\UI\Button.svelte
                                 This is some jank shit, but like if Supabase Auth changes, I would have to rebuild this, or my own version.
                                 They did an alright job, so, sort of a loose loose.-->
                            <Auth
                                    view={view}
                                    supabaseClient={supabase}
                                    showLinks={true}
                                    theme="dark"
                                    providers={['google', 'github']}
                                    captchaToken={token}
                                    queryParams={{
                                        access_type: 'offline',
                                        prompt: 'consent',
                                        hd: 'csbox.io/auth',
                                     }}
                                    appearance={{

								variables: {
									default: {
										colors: {
											brand: 'rgb(72,159,194)',
											brandAccent: `rgb(94,187,224)`
										},
										radii: {
											borderRadiusButton: '2px',
											buttonBorderRadius: '2px',
											inputBorderRadius: '10px'
										}
									}
								},
								// Notice: Button styling has been changed from Library.
								// Change: Custom styling on the component to allow difference between social and other buttons (Ex. Sign in).
                                    extend: false, // necessary in order to not render default styles
                                    className: classNames,
                                  }}
                            />
                            <div class="flex justify-center text-center pt-4 pb-14" >
                                <div class="absolute">
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


