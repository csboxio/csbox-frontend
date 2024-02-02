<script>
    import PricingRow from "../components/PricingRow.svelte";
    import PricingSubHeader from "../components/PricingSubHeader.svelte";

    // Pricing table data, header, checked is the row.
    // 0 is CSBOX, 1 is Competitor 1, 2 is Competitor 2.
    let featuresSetOne = [
        { header: "Education-First Platform", checked: [true, false, false] },
        { header: "Tailored for Higher Education", checked: [true, false, false] },
        { header: "LMS Integration", checked: [true, true, false] },
    ];

    let featuresSetTwo = [
        { header: "Robust Online Workspace", checked: [true, true, true] },
        { header: "Unmatched Performance", checked: [true, false, false] },
        { header: "1 TB of Storage per Class", checked: [true, false, false] },
    ];

    let featuresSetThree = [
        { header: "Any Programming Language Support", checked: [true, true, true] },
        { header: "Standardized Developer Environment", checked: [true, true, false] },
        { header: "Pre-built Templates Library", checked: [true, false, true] },
    ];

    let featuresSetFour = [
        { header: "Effortless Deployment and Monitoring", checked: [true, false, false] },
        { header: "Premium 24/7 Support", checked: [true, false, false] },
        { header: "Engaging Instructor Workshops", checked: [true, false, false] },
    ];

</script>

<section class="relative">
    <!-- Radial gradient -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div class="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/3 aspect-square">
            <div class="absolute inset-0 translate-z-0 bg-blue-500 rounded-full blur-[120px] opacity-50"></div>
        </div>
    </div>
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="py-12 md:py-20">
            <!-- Content -->
            <div class="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <div>
                    <div class="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-3">Pricing plans</div>
                </div>
                <h2 class="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">Competitive Pricing</h2>
                <p class="text-lg text-slate-400">Our platform is lower-price and higher performance compared to any competitor.</p>
            </div>
            <!-- Pricing tabs -->
            <div class="relative">
                <!-- Blurred shape -->
                <div class="max-md:hidden absolute bottom-0 -mb-20 left-2/3 -translate-x-1/2 blur-2xl opacity-70 pointer-events-none" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
                        <defs>
                            <linearGradient id="bs5-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
                                <stop offset="0%" stop-color="#4572D1" />
                                <stop offset="100%" stop-color="#1F3D70" stop-opacity="0" />
                            </linearGradient>
                        </defs>
                        <path fill="url(#bs5-a)" fill-rule="evenodd" d="m661 736 461 369-284 58z" transform="matrix(1 0 0 -1 -661 1163)" />
                    </svg>
                </div>
                <!-- Content -->
                <div class="grid md:grid-cols-4 xl:-mx-6 text-sm max-md:mb-8 max-md:rounded-b-3xl md:rounded-tr-3xl md:rounded-bl-3xl :bg-slate-700/20 :bg-transparent max-md::hidden max-md::order-1 max-md::order-2 max-md::order-3 max-md:md::mb-0 :relative before::absolute before::-inset-px before::rounded-before::border-x-2 before::border-t-2 before::border-b-2 before::border-blue-500 before::-z-10 before::pointer-events-none">

                    <!-- Pricing toggle Column -->
                    <div class="px-6 flex flex-col justify-end">
                        <div class="pb-5 md:border-b border-slate-800">
                            <!-- Toggle switch -->
                            <div class="max-md:text-center">
                                <div class="inline-flex items-center whitespace-nowrap">
                                    <div class="text-sm text-slate-400 font-medium mr-2 md:max-lg:hidden">Monthly</div>
                                    <div class="relative">
                                        <input type="checkbox" id="toggle" class="peer sr-only" />
                                        <label for="toggle" class="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-slate-400 px-0.5 outline-slate-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow-sm before:transition-transform before:duration-150 peer-checked:bg-blue-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-blue-500">
                                            <span class="sr-only">Pay Yearly</span>
                                        </label>
                                    </div>
                                    <div class="text-sm text-slate-400 font-medium ml-2">Yearly <span class="text-teal-500">(-20%)</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Pricing header - CSBOX -->
                    <div class="px-6 flex flex-col justify-end border-t border-x border-blue-500">
                        <div class="grow pb-4 mb-4 border-b border-slate-800 ">
                            <div class="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-0.5"><img src="/logo-fullColor-white-text.png" width="150" height="100%" alt="CSBOX"/></div>
                            <div class="mb-1">
                                <span class="text-lg font-medium text-slate-500">$</span><span class="text-3xl font-bold text-slate-50">10</span><span class="text-sm text-slate-600 font-medium">/mo (per user)</span>
                            </div>
                        </div>
                        <div class="pb-4 border-b border-slate-800">
                            <a class="btn-sm text-white bg-blue-500 hover:bg-blue-600 w-full transition duration-150 ease-in-out group" href="#0">
                                Get Started <span class="tracking-normal text-blue-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                            </a>
                        </div>
                    </div>

                    <!-- Pricing header - Competitor 1 -->
                    <div class="px-6 flex flex-col justify-end">
                        <div class="grow pb-4 mb-4 border-b border-slate-800">
                            <div class="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-0.5">Competitor 1</div>
                            <div class="mb-1">
                                <span class="text-lg font-medium text-slate-400">$</span><span class="text-3xl font-bold text-slate-50">1000</span><span class="text-sm text-slate-500 font-medium">/mo (platform fee)</span>
                            </div>
                            <div class="mb-1">
                                <span class="text-lg font-medium text-slate-400">$</span><span class="text-2xl font-bold text-slate-50">40</span><span class="text-sm text-slate-500 font-medium">/mo (per user)</span>
                            </div>
                        </div>
                    </div>

                    <div class="px-6 flex flex-col justify-end">
                        <div class="grow pb-4 mb-4 border-b border-slate-800">
                            <div class="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-0.5">Competitor 2</div>
                            <div class="mb-1">
                                <span class="text-lg font-medium text-slate-500">$</span><span class="text-3xl font-bold text-slate-50">~30</span><span class="text-sm text-slate-600 font-medium">/mo (per user)</span>
                            </div>
                            <div class="text-slate-500">$0.36 per hour, per user.</div>
                        </div>
                    </div>

                    <div class="px-6 flex flex-col justify-end">
                        <div class="py-2 text-slate-50 font-medium mt-4">Features</div>
                    </div>

                    <div class="px-6 flex flex-col justify-end border-x border-blue-500">
                        <div class="py-2 text-slate-50 font-medium mt-4"></div>
                    </div>

                    <div class="px-6 flex flex-col justify-end">
                        <div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                            <span><span class=""></span></span>
                        </div>
                    </div>

                    <div class="px-6 flex flex-col justify-end">
                        <div class="py-2 text-slate-50 font-medium mt-4"></div>
                    </div>

                    <PricingSubHeader subHeader={'Platform'}/>

                    {#each featuresSetOne as { header, checked }}
                        <PricingRow {header} {checked} />
                    {/each}

                    <PricingSubHeader subHeader={'Workspace'}/>

                    {#each featuresSetTwo as { header, checked }}
                        <PricingRow {header} {checked} />
                    {/each}

                    <PricingSubHeader subHeader={'Environment'}/>

                    {#each featuresSetThree as { header, checked }}
                        <PricingRow {header} {checked} />
                    {/each}

                    <PricingSubHeader subHeader={'Addons'}/>

                    {#each featuresSetFour as { header, checked }}
                        <PricingRow {header} {checked} />
                    {/each}

                    <div class="px-6 flex flex-col justify-end">
                        <div class="py-2 text-slate-50 font-medium mt-4"></div>
                    </div>

                    <div class="px-6 flex flex-col justify-end border-t border-blue-500">
                        <div class="py-2 text-slate-50 font-medium mt-4"></div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</section>