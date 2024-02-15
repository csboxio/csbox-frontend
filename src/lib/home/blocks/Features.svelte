<script>
    import {goto} from "$app/navigation";
</script>

<section>

    <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="pt-12 md:pt-20">

            <!-- Section header -->
            <div class="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <div>
                    <div class="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-3">Education first platform</div>
                </div>
                <h2 class="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">Features</h2>
                <p class="text-lg text-slate-400">Our platform offers students a genuine, professional-grade developer experience.</p>
            </div>


            <div class="relative before:absolute before:inset-0 before:-translate-x-full ">
                <div class="testimonials-carousel swiper-container group">
                    <div class="flex flex-wrap justify-center" data-highlighter>


                        <div class="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 swiper-slide mb-4 mx-2 h-auto relative bg-slate-800 rounded-3xl p-px  before:absolute before:w-96 before:h-96 before:-left-48 before:-top-48 before:bg-blue-500 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:hover:opacity-20 before:z-30 before:blur-[100px] after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500 after:[background:_radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.slate.400),transparent)] after:group-hover:opacity-100 after:z-10 overflow-hidden group/slide">
                            <div class="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
                                <!-- Particles animation -->
                                <div class="absolute inset-0 -z-10 opacity-0  group-hover/slide:opacity-100 transition-opacity duration-500 ease-in-out" aria-hidden="true">
                                    <canvas data-particle-animation data-particle-quantity="3"></canvas>
                                </div>
                                <!-- Radial gradient -->
                                <div class="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/3 aspect-square" aria-hidden="true">
                                    <div class="absolute inset-0 translate-z-0 rounded-full bg-slate-800  transition-colors duration-500 ease-in-out blur-[60px]"></div>
                                </div>
                                <div class="flex flex-col p-6 h-full">
                                    <img class="mb-3" src="./images/carousel-icon-01.svg" width="56" height="56" alt="Icon 01">
                                    <div class="grow">
                                        <div class=" bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 font-bold text-lg mb-1">Automatic code grading</div>
                                        <div class="text-slate-400 mb-3">Seamlessly blend your testing scripts, with our interface.</div>
                                    </div>
                                    <div class="text-right">
                                        <a class="text-sm font-medium text-slate-300 hover:text-white inline-flex items-center transition duration-150 ease-in-out group" href="#0">Learn More <span class="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 swiper-slide mb-4 mx-2 h-auto relative bg-slate-800 rounded-3xl p-px  before:absolute before:w-96 before:h-96 before:-left-48 before:-top-48 before:bg-blue-500 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:hover:opacity-20 before:z-30 before:blur-[100px] after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500 after:[background:_radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.slate.400),transparent)] after:group-hover:opacity-100 after:z-10 overflow-hidden group/slide">
                            <div class="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
                                <!-- Particles animation -->
                                <div class="absolute inset-0 -z-10 opacity-0  group-hover/slide:opacity-100 transition-opacity duration-500 ease-in-out" aria-hidden="true">
                                    <canvas data-particle-animation data-particle-quantity="3"></canvas>
                                </div>
                                <!-- Radial gradient -->
                                <div class="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/3 aspect-square" aria-hidden="true">
                                    <div class="absolute inset-0 translate-z-0 rounded-full bg-slate-800  transition-colors duration-500 ease-in-out blur-[60px]"></div>
                                </div>
                                <div class="flex flex-col p-6 h-full">
                                    <img class="mb-3" src="./images/carousel-icon-02.svg" width="56" height="56" alt="Icon 01">
                                    <div class="grow">
                                        <div class=" bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 font-bold text-lg mb-1">Online Workspace</div>
                                        <div class="text-slate-400 mb-3">Eliminating all constraints, a full Linux virtual machine empowers Visual Studio Code.</div>
                                    </div>
                                    <div class="text-right">
                                        <a class="text-sm font-medium text-slate-300 hover:text-white inline-flex items-center transition duration-150 ease-in-out group" href="#0">Learn More <span class="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 swiper-slide mb-4 mx-2 h-auto relative bg-slate-800 rounded-3xl p-px  before:absolute before:w-96 before:h-96 before:-left-48 before:-top-48 before:bg-blue-500 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:hover:opacity-20 before:z-30 before:blur-[100px] after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500 after:[background:_radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.slate.400),transparent)] after:group-hover:opacity-100 after:z-10 overflow-hidden group/slide">
                            <div class="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
                                <!-- Particles animation -->
                                <div class="absolute inset-0 -z-10 opacity-0  group-hover/slide:opacity-100 transition-opacity duration-500 ease-in-out" aria-hidden="true">
                                    <canvas data-particle-animation data-particle-quantity="3"></canvas>
                                </div>
                                <!-- Radial gradient -->
                                <div class="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/3 aspect-square" aria-hidden="true">
                                    <div class="absolute inset-0 translate-z-0 rounded-full bg-slate-800  transition-colors duration-500 ease-in-out blur-[60px]"></div>
                                </div>
                                <div class="flex flex-col p-6 h-full">
                                    <img class="mb-3" src="./images/carousel-icon-03.svg" width="56" height="56" alt="Icon 01">
                                    <div class="grow">
                                        <div class=" bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 font-bold text-lg mb-1">LMS integration</div>
                                        <div class="text-slate-400 mb-3">Seamlessly integrate our platform with all LMSs using LTI 1.3.</div>
                                    </div>
                                    <div class="text-right">
                                        <a class="text-sm font-medium text-slate-300 hover:text-white inline-flex items-center transition duration-150 ease-in-out group" href="#0">Learn More <span class="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div on:click={() => { goto("/site/features/high-performance"); } } class="cursor-pointer sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 swiper-slide mb-4 mx-2 h-auto relative bg-slate-800 rounded-3xl p-px  before:absolute before:w-96 before:h-96 before:-left-48 before:-top-48 before:bg-blue-500 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:hover:opacity-20 before:z-30 before:blur-[100px] after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500 after:[background:_radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.slate.400),transparent)] after:group-hover:opacity-100 after:z-10 overflow-hidden group/slide">
                            <div class="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden" >
                                <!-- Particles animation -->
                                <div class="absolute inset-0 -z-10 opacity-0  group-hover/slide:opacity-100 transition-opacity duration-500 ease-in-out" aria-hidden="true">
                                    <canvas data-particle-animation data-particle-quantity="3"></canvas>
                                </div>
                                <!-- Radial gradient -->
                                <div class="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/3 aspect-square" aria-hidden="true">
                                    <div class="absolute inset-0 translate-z-0 rounded-full bg-slate-800  transition-colors duration-500 ease-in-out blur-[60px]"></div>
                                </div>
                                <div class="flex flex-col p-6 h-full">
                                    <img class="mb-3" src="./images/carousel-icon-04.svg" width="56" height="56" alt="Icon 01">
                                    <div class="grow">
                                        <div class=" bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 font-bold text-lg mb-1">High Performance</div>
                                        <div class="text-slate-400 mb-3">Our custom solution has dynamically allocated resources to match any workload.</div>
                                    </div>
                                    <div class="text-right">
                                        <a class="text-sm font-medium text-slate-300 hover:text-white inline-flex items-center transition duration-150 ease-in-out group" href="/site/features/high-performance">Learn More <span class="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 swiper-slide mb-4 mx-2 h-auto relative bg-slate-800 rounded-3xl p-px  before:absolute before:w-96 before:h-96 before:-left-48 before:-top-48 before:bg-blue-500 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:hover:opacity-20 before:z-30 before:blur-[100px] after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500 after:[background:_radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.slate.400),transparent)] after:group-hover:opacity-100 after:z-10 overflow-hidden group/slide">
                            <div class="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
                                <!-- Particles animation -->
                                <div class="absolute inset-0 -z-10 opacity-0  group-hover/slide:opacity-100 transition-opacity duration-500 ease-in-out" aria-hidden="true">
                                    <canvas data-particle-animation data-particle-quantity="3"></canvas>
                                </div>
                                <!-- Radial gradient -->
                                <div class="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/3 aspect-square" aria-hidden="true">
                                    <div class="absolute inset-0 translate-z-0 rounded-full bg-slate-800  transition-colors duration-500 ease-in-out blur-[60px]"></div>
                                </div>
                                <div class="flex flex-col p-6 h-full">
                                    <img class="mb-3" src="./images/carousel-icon-05.svg" width="56" height="56" alt="Icon 01">
                                    <div class="grow">
                                        <div class=" bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 font-bold text-lg mb-1">Full Stack Development</div>
                                        <div class="text-slate-400 mb-3">Any language, framework, database, web server, container, can be ran on our platform.</div>
                                    </div>
                                    <div class="text-right">
                                        <a class="text-sm font-medium text-slate-300 hover:text-white inline-flex items-center transition duration-150 ease-in-out group" href="#0">Learn More <span class="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- Arrows -->

        </div>
    </div>
</section>