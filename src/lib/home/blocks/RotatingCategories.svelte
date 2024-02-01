<script>
    import {onMount} from "svelte";
    import {blur} from 'svelte/transition';
    import { fade } from 'svelte/transition';



    const categories = ['students', 'instructors', 'professors', 'developers'];
    let categoryIndex = 0;
    let category = categories[categoryIndex];

    onMount(() => {
        // Categories changer, every 2.5 seconds
        const interval = setInterval(() => {
            categoryIndex = (categoryIndex + 1) % categories.length;
            category = categories[categoryIndex];

        }, 2500);

        return () => {
            clearInterval(interval);
        }
    });
</script>

<section class="relative">
    <!-- Particles animation -->
    <div class="absolute left-1/2 -translate-x-1/2 top-0 -z-10 w-80 h-80 -mt-24 -ml-32">
        <div aria-hidden="true" class="absolute inset-0 -z-10">
            <canvas data-particle-animation data-particle-quantity="6" data-particle-staticity="30"></canvas>
        </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="pb-16 md:pt-16">
            <!-- Section header -->
            <div class="max-w-4xl mx-auto text-center relative">
                <div class="flex justify-center">
                    <div class="flex items-center">
                        <span class="font-bold inline-block text-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4 pr-1.5 sm:pr-1.5 sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl">Code learning platform for</span>
                        {#key category}
                            <span class="font-bold inline-block bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4 sm:pr-1.5 sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl"
                                  in:blur>{category}</span>
                        {/key}
                    </div>
                </div>
            </div>
            <div class="max-w-2xl mx-auto text-center pb-12 md:pb-20 relative">
                <p class="md:text-lg sm:text-md text-slate-400 text-center">A cloud based environment for educating, and
                    learning.</p>
            </div>

            <!-- Particles animation -->
            <div class="absolute inset-0 -z-10" aria-hidden="true">
                <canvas data-particle-animation></canvas>
            </div>

            <!-- Highlighted boxes -->
            <div class="relative pb-12 md:pb-20">
                <!-- Blurred shape -->
                <div aria-hidden="true"
                     class="absolute bottom-0 -mb-20 left-1/2 -translate-x-1/2 blur-2xl opacity-50 pointer-events-none">
                    <svg height="427" width="434" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="bs2-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
                                <stop offset="0%" stop-color="#4572D1"/>
                                <stop offset="100%" stop-color="#1F3D70" stop-opacity="0"/>
                            </linearGradient>
                        </defs>
                        <path d="m346 898 461 369-284 58z" fill="url(#bs2-a)" fill-rule="evenodd"
                              transform="translate(-346 -898)"/>
                    </svg>
                </div>
                <!-- Grid -->
                <div class="grid md:grid-cols-12 gap-6 group" data-highlighter>
                    <!-- Box #1 -->
                    <div class="md:col-span-12" transition:fade|local={{ delay: 250, duration: 300 }}>
                        <div class="relative h-full bg-slate-800 rounded-3xl p-px before:absolute before:w-96 before:h-96 before:-left-48 before:-top-48 before:bg-blue-500 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:hover:opacity-20 before:z-30 before:blur-[100px] after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500 after:[background:_radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.slate.400),transparent)] after:group-hover:opacity-100 after:z-10 overflow-hidden">
                            <div class="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
                                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <!-- Blurred shape -->
                                    <div aria-hidden="true" class="absolute right-0 top-0 blur-2xl">
                                        <svg height="393" width="342" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <linearGradient id="bs-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
                                                    <stop offset="0%" stop-color="#6366F1"/>
                                                    <stop offset="100%" stop-color="#6366F1" stop-opacity="0"/>
                                                </linearGradient>
                                            </defs>
                                            <path d="m104 .827 461 369-284 58z" fill="url(#bs-a)" fill-rule="evenodd"
                                                  opacity=".7" transform="translate(0 -112.827)"/>
                                        </svg>
                                    </div>
                                    <!-- Radial gradient -->
                                    <div aria-hidden="true"
                                         class="absolute flex items-center justify-center bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 h-full aspect-square">
                                        <div class="absolute inset-0 translate-z-0 bg-blue-500 rounded-full blur-[120px] opacity-70"></div>
                                        <div class="absolute w-1/4 h-1/4 translate-z-0 bg-blue-400 rounded-full blur-[40px]"></div>
                                    </div>


                                    <!-- Text -->
                                    <div class="md:max-w-[480px] shrink-0 order-1 md:order-none p-6 md:p-8 md:pr-0">
                                        <div class="mb-5">
                                            <div>
                                                <h3 class="inline-flex text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-1">
                                                    Platform</h3>
                                                <p class="text-slate-400">Elevate Your LMS into a Coding-Centric
                                                    Platform
                                                    Empower Students, Simplify Teaching, Unleash Coding Potential.</p>
                                            </div>
                                        </div>
                                        <div>
                                            <a class="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none"
                                               href="/auth">
                                                            <span class="relative inline-flex items-center">
                                                                Learn more <span
                                                                    class="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                                                            </span>
                                            </a>
                                        </div>
                                    </div>
                                    <!-- Image -->
                                    <img alt="Feature 01"
                                         class="invisible sm:invisible md:invisible lg:visible absolute bottom-0 left-1/2 -translate-x-1/2 mx-auto max-w-none md:relative md:left-0 md:translate-x-0 py-4" loading="lazy" src="/icons/home/codingman.gif" width="550">

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="md:col-span-7" in:fade={{ delay: 250, duration: 300 }}>
                        <div class="relative h-full bg-slate-800 rounded-3xl p-px before:absolute before:w-96 before:h-96 before:-left-48 before:-top-48 before:bg-blue-500 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:hover:opacity-20 before:z-30 before:blur-[100px] after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500 after:[background:_radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.slate.400),transparent)] after:group-hover:opacity-100 after:z-10 overflow-hidden">
                            <div class="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
                                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <!-- Blurred shape -->
                                    <div aria-hidden="true" class="absolute right-0 top-0 blur-2xl">
                                        <svg height="393" width="342" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <linearGradient id="bs-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
                                                    <stop offset="0%" stop-color="#4572D1"/>
                                                    <stop offset="100%" stop-color="#1F3D70" stop-opacity="0"/>
                                                </linearGradient>

                                            </defs>
                                            <path d="m104 .827 461 369-284 58z" fill="url(#bs-a)" fill-rule="evenodd"
                                                  opacity=".7" transform="translate(0 -112.827)"/>
                                        </svg>
                                    </div>
                                    <!-- Radial gradient -->
                                    <div aria-hidden="true"
                                         class="absolute flex items-center justify-center bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 h-full aspect-square">
                                        <div class="absolute inset-0 translate-z-0 bg-blue-500 rounded-full blur-[120px] opacity-70"></div>
                                        <div class="absolute w-1/4 h-1/4 translate-z-0 bg-blue-400 rounded-full blur-[40px]"></div>
                                    </div>


                                    <!-- Text -->
                                    <div class="md:max-w-[480px] shrink-0 order-1 md:order-none p-6 md:p-8 pt-5">
                                        <div>
                                            <h3 class="inline-flex text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-1 ">
                                                Cloud Environment</h3>
                                            <p class="text-slate-400">Based on the industry standard, Visual Studio
                                                Code. No artificial limits, best in class performance.</p>
                                        </div>
                                    </div>
                                    <!-- Image -->
                                    <div class="relative w-full  md:h-auto overflow-hidden md:pb-8">
                                        <img alt="Feature 02"
                                             class="absolute bottom-0 left-1/2 -translate-x-1/2 mx-auto max-w-none md:max-w-full md:relative md:left-0 md:translate-x-0 pr-4 pt-4" height="100%" src="/icons/home/cloud-storage.png"
                                             width="250">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Box #3 -->
                    <div class="md:col-span-5" in:fade={{ delay: 250, duration: 300 }}>
                        <div class="relative h-full bg-slate-800 rounded-3xl p-px before:absolute before:w-96 before:h-96 before:-left-48 before:-top-48 before:bg-blue-500 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:hover:opacity-20 before:z-30 before:blur-[100px] after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500 after:[background:_radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.slate.400),transparent)] after:group-hover:opacity-100 after:z-10 overflow-hidden">
                            <div class="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
                                <div class="flex flex-col">
                                    <!-- Radial gradient -->
                                    <div aria-hidden="true"
                                         class="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square">
                                        <div class="absolute inset-0 translate-z-0 bg-slate-800 rounded-full blur-[80px]"></div>
                                    </div>
                                    <!-- Text -->
                                    <div class="md:max-w-[480px] shrink-0 order-1 md:order-none p-6 md:p-8">
                                        <div>
                                            <h3 class="inline-flex text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-1">
                                                Integrate with (LMSs)</h3>
                                            <p class="text-slate-400">Link any LTI 1.3 LMS to our platform.</p>
                                            <p class="text-sm text-slate-600 pt-4">Canvas, Moodle, Blackboard, D2L,
                                                Sakai, and more.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Features list -->
            <div class="grid md:grid-cols-3 gap-8 md:gap-12">
                <div>
                    <div class="flex items-center space-x-2 mb-1">
                        <svg class="shrink-0 fill-slate-300" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0ZM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12Zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2Z"/>
                        </svg>
                        <h4 class="font-medium text-slate-50">LMS Integration</h4>
                    </div>
                    <p class="text-sm text-slate-400">Seamless integration with LMSs, start coding or grading instantly,
                        results feedback into LMS.</p>
                </div>
                <!-- Feature -->
                <div>
                    <div class="flex items-center space-x-2 mb-1">
                        <svg class="shrink-0 fill-slate-300" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8ZM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1Z"/>
                        </svg>
                        <h4 class="font-medium text-slate-50">Import</h4>
                    </div>
                    <p class="text-sm text-slate-400">Easily import existing content from your LMS, and start
                        teaching.</p>
                </div>
                <!-- Feature -->
                <div>
                    <div class="flex items-center space-x-2 mb-1">
                        <svg class="shrink-0 fill-slate-300" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12Zm0 14V2H2v12h12Zm-3-7H5a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2Zm0 4H5a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <h4 class="font-medium text-slate-50">Grading</h4>
                    </div>
                    <p class="text-sm text-slate-400">One-click open and run, no more broken submissions.</p>
                </div>
            </div>
        </div>
    </div>
</section>