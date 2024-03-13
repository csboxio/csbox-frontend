<script lang="ts">
    import Settings from "$lib/components/Settings.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import {navStore} from "../../../../../lib/stores/stores.js";
    import {onMount} from "svelte";
    import '$lib/styles/calendar.css'

    import AdminNav from "$lib/components/AdminNav.svelte";
    import { loadStripe } from '@stripe/stripe-js';
    import { CardElement, Elements } from 'svelte-stripe-elements';

    let stripePromise = loadStripe('your_stripe_public_key');

    export let data

    let { supabase, session, user, claim } = data
    $: ({ supabase, session, user, claim } = data)


    onMount(() => {
        // Set the selected item when the page is mounted
        navStore.set('admin');
    });

    async function handleSubmit(event) {
        event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error(error);
        } else {
            // Handle successful payment
            console.log(paymentMethod);
        }
    }


</script>

<body class="bg-gray-600 antialiased bg-body text-body font-body">

<!-- Nav bar on the left of the screen-->
<Navbar claim={claim}/>

<div class="mx-auto lg:ml-16">

    <!-- Top bar of settings -->
    <section>
        <div class="pt-3 pb-3 px-8 dark:bg-gray-700 bg-white">
            <div class="flex flex-wrap items-center justify-between -mx-2">
                <div class="lg:w-auto px-2 my-1 sm:my-2  ">
                    <h4 class="text-2xl font-bold dark:text-white  tracking-wide leading-7 mb-1">Organization - Billing</h4>
                </div>
                <div class="w-full lg:w-auto px-2">
                    <Settings bind:supabase={supabase} bind:user={user} bind:claim={claim}/>
                </div>
            </div>
        </div>
    </section>

    <div class="flex min-h-screen">
        <!-- Work space navigation -->
        <aside class="h-screen sticky top-0 inline-block" >
            <AdminNav />
        </aside>
        <!-- Content -->
        <section class="flex flex-col p-8 inline-block w-full">

            <div class="relative overflow-x-auto  sm:rounded-lg w-full">
                <Elements stripe={stripePromise}>
                    <div class="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <form on:submit={handleSubmit} class="space-y-4">
                            <h2 class="text-2xl font-semibold mb-4">Billing Information</h2>
                            <div class="mb-4">
                                <label for="card-element" class="block text-gray-700 text-sm font-bold mb-2">
                                    Card details
                                </label>
                                <CardElement id="card-element" class="p-2 border rounded" />
                            </div>
                            <div class="flex items-center justify-between">
                                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Pay
                                </button>
                            </div>
                        </form>
                    </div>
                </Elements>

            </div>
        </section>
    </div>
</div>
</body>

