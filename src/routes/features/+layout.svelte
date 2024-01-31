<!-- BlogPost.svelte -->

<script>
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import Fa from 'svelte-fa/src/fa.svelte';
    import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
</script>

<div class="flex flex-col min-h-screen overflow-hidden">
    <header class="w-full absolute z-30">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <div class="flex items-center justify-between h-16 md:h-20">
                <div class="shrink-0 mr-4">
                    <a class="block" href="/" aria-label="CSBOX">
                        <img src="/logo-fullColor-white-text.png" width="150" height="100%" alt="CSBOX">
                    </a>
                </div>

                <nav class="flex grow">
                    <ul class="flex grow justify-end flex-wrap items-center">
                        {#if browser}
                            <li>
                                <a class="font-medium text-sm text-white hover:text-white transition duration-150 ease-in-out" href="/auth">Sign in</a>
                            </li>
                        {/if}

                        {#if $page.data.session && browser}
                            <li class="ml-6">
                                <a class="btn-sm text-white hover:text-white transition duration-150 ease-in-out w-full group gradient-bg relative before:bg-slate-800/30 before:rounded-full before:pointer-events-none" href="/auth">
                  <span class="relative inline-flex items-center">
                    Dashboard <span class="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1"><Fa icon={faArrowRight}/></span>
                  </span>
                                </a>
                            </li>
                        {/if}
                    </ul>
                </nav>
            </div>

            <slot/>

        </div>
    </header>


</div>
