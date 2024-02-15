<!-- Home Page - Hero Block -->

<script>
    import Fa from 'svelte-fa/src/fa.svelte';
    import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
    import { fade } from 'svelte/transition';
</script>

<section>
    <div class="relative max-w-6xl mx-auto px-4 sm:px-6">

        <!-- Particles animation -->
        <div class="absolute inset-0 -z-10" aria-hidden="true">
            <canvas data-particle-animation></canvas>
        </div>

        <!-- Illustration -->
        <div class="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden" aria-hidden="true">
            <div class="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10">
                <img src="/images/glow-bottom.svg" class="max-w-none" width="2146" height="774" alt="Hero Illustration" loading="lazy">
            </div>
        </div>

        <div class="pt-32 pb-16 md:pt-52 md:pb-32">
            <!-- Hero content -->
            <div class="max-w-3xl mx-auto text-center">
                <div class="mb-6" in:fade={{ delay: 0, duration: 300 }}>
                    <div class="inline-flex relative before:absolute before:inset-0 before:bg-blue-500 before:blur-md">
                        <button class="btn-sm border-none py-0.5 text-slate-300 hover:text-white group relative before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-full before:pointer-events-none shadow">
                            <span class="relative inline-flex items-center">
                                Get Started <span class="tracking-normal text-blue-200 group-hover:translate-x-0.5 ease-in-out ml-1"><Fa icon={faArrowRight}/></span>
                            </span>
                        </button>
                    </div>
                </div>
                <h1 class="h1 wrap text-gray-300 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4" in:fade={{ delay: 250, duration: 300 }}>Developer environment for education</h1>
                <p class="text-lg text-gray-300 mb-8">A cloud-based code learning platform built for next-generation education.</p>
                <div class="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4" in:fade={{ delay: 250, duration: 300 }}>
                    <div>
                        <a class="btn border-none text-slate-200 hover:text-white bg-slate-900 bg-opacity-25 hover:bg-opacity-30 w-full" href="/auth">
                            <svg class="shrink-0 fill-slate-300 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                                <path d="m1.999 0 1 2-1 2 2-1 2 1-1-2 1-2-2 1zM11.999 0l1 2-1 2 2-1 2 1-1-2 1-2-2 1zM11.999 10l1 2-1 2 2-1 2 1-1-2 1-2-2 1zM6.292 7.586l2.646-2.647L11.06 7.06 8.413 9.707zM0 13.878l5.586-5.586 2.122 2.121L2.12 16z" />
                            </svg>
                            <span>Read the docs</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>