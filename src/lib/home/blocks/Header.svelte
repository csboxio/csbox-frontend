<script>
    import {browser} from "$app/environment";
    import {page} from "$app/stores";
    import Fa from 'svelte-fa/src/fa.svelte';
    import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

</script>

<header class="absolute w-full z-30">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center justify-between h-16 md:h-20">

            <!-- Site branding -->
            <div class="shrink-0 mr-4">
                <!-- Logo -->
                <a aria-label="CSBOX" class="block" href="/">
                    <img alt="CSBOX" height="100%" src="./logo-fullColor-white-text.png" width="150">
                </a>
            </div>
            <!-- Desktop navigation -->
            <nav class="flex grow">
                <!-- Desktop sign in links -->
                <ul class="flex grow justify-end flex-wrap items-center">
                    {#if browser}
                        <li>
                            <a class="font-medium text-sm text-slate-300 hover:text-white transition duration-150 ease-in-out"
                               href="/auth">Sign in</a>
                        </li>
                    {/if}
                    {#if $page.data.session && browser}
                        <li class="ml-6">
                            <a class="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none"
                               href="/auth">
                                    <span class="relative inline-flex items-center">
                                        Dashboard <span
                                            class="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1"><Fa icon={faArrowRight}/></span>
                                    </span>
                            </a>
                        </li>
                    {/if}
                </ul>
            </nav>
        </div>
    </div>
</header>