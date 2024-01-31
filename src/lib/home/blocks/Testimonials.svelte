<script>
    import {onMount} from "svelte";
    import { blur } from 'svelte/transition';

    let active;
    $: active = 0;

    let testimonials = [
        {
            img: './images/testimonial-01.jpg',
            quote: "This platform revolutionized the way I teach coding. The seamless integration with LMSs and the performance-driven environment have made coding assignments a breeze for both me and my students.",
            name: 'Dr. Emily Johnson',
            role: 'Computer Science Professor'
        },
        {
            img: './images/testimonial-02.jpg',
            quote: "As a student, this coding platform has been a game-changer. The cloud-based environment allows me to access my assignments from any machine, and the one-click start feature saves me time and hassle. It's truly education without boundaries.",
            name: 'Alex Rodriguez',
            role: 'Computer Science Student'
        },
        {
            img: './images/testimonial-03.jpg',
            quote: "Teaching coding has never been this efficient. The ability to import content from our LMS and the automatic code grading feature make my job easier. My students are mastering fundamentals faster, leading to better outcomes.",
            name: 'Prof. Sarah Williams',
            role: 'IT Department Chair'
        },
    ];


    onMount(() => {

        // Testimonials changer, every 12 seconds
        const interval2 = setInterval(() => {
            active = active + 1 === testimonials.length ? 0 : active + 1;

        }, 12000);

        return () => {
            clearInterval(interval2);
        }
    });
</script>

<section>
    <div class="max-w-3xl mx-auto px-4 sm:px-6">
        <div class="relative pb-12 md:pb-20">

            <!-- Particles animation -->
            <div class="absolute left-1/2 -translate-x-1/2 top-0 -z-10 w-80 h-80 -mt-6">
                <div class="absolute inset-0 -z-10" aria-hidden="true">
                    <canvas data-particle-animation data-particle-quantity="10" data-particle-staticity="30"></canvas>
                </div>
            </div>

            <!-- Carousel -->
            <div class="text-center" >
                <!-- Testimonial image -->
                <div class="relative h-32 mask">
                    <div class="absolute top-0 left-1/2 -translate-x-1/2">
                        <!-- Svelte template for testimonial images -->
                        {#each testimonials as item, index (index)}
                            {#if active === index}
                                <img in:blur class="relative top-11 left-1/2 -translate-x-1/2 rounded-full" src={item.img} width="56" height="56" alt={item.name}>
                            {/if}
                        {/each}
                    </div>
                </div>
                <!-- Text -->
                <div class="mb-10">
                    <div class="relative flex flex-col transition-all duration-150 delay-300 ease-in-out">
                        <!-- Svelte template for testimonials -->
                        {#each testimonials as item, index (index)}
                            {#if active === index}
                                <div in:blur class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60">{item.quote}</div>
                            {/if}
                        {/each}
                    </div>
                </div>
                <!-- Buttons -->
                <div class="flex flex-wrap justify-center -m-1.5">
                    <!-- Svelte template for buttons -->
                    {#each testimonials as item, index (index)}
                        <button in:blur
                                class={`btn-sm m-1.5 text-xs py-1.5 text-slate-300 transition duration-150 ease-in-out
              ${active === index ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
                                on:click={() => { active = index; }}
                        >
              <span class="relative">
                <span class="text-slate-50">{item.name}</span> <span class="text-slate-600">-</span> <span>{item.role}</span>
              </span>
                        </button>
                    {/each}
                </div>
            </div>

        </div>
    </div>
</section>