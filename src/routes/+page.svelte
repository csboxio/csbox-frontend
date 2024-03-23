<script lang="ts">
	import '../app.css';
    import Header from "../lib/home/blocks/Header.svelte";
	import Hero from "../lib/home/blocks/Hero.svelte";
	import Clients from "../lib/home/blocks/Clients.svelte";
	import RotatingCategories from "../lib/home/blocks/RotatingCategories.svelte";
	import Features from "../lib/home/blocks/Features.svelte";
	import FeaturesGrid from "../lib/home/blocks/FeaturesGrid.svelte";
	import Benefits from "../lib/home/blocks/Benefits.svelte";
	import Pricing from "../lib/home/blocks/Pricing.svelte";
	import Testimonials from "../lib/home/blocks/Testimonials.svelte";
	import CTA from "../lib/home/blocks/CTA.svelte";
	import Footer from "../lib/home/blocks/Footer.svelte";
    import {onMount} from "svelte";
    import {init} from "../lib/home/scripts/init.js";
    import {navigating} from "$app/stores";
    import SIBenefits from "../lib/home/blocks/SIBenefits.svelte";
    import {PUBLIC_STRIPE_TEST_MODE} from "$env/static/public";
    import PricingTable from "$lib/home/blocks/PricingTable.svelte";

    onMount(() => {
        // Main init function for home page.
        init();
    });

</script>

<svelte:head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport"/>
    <link rel="stylesheet" href="/style.css?v=1" as="style">
    <link rel="stylesheet" href="/src/lib/home/style/home.css?v=1" as="style">
    <link rel="stylesheet" href="/css/vendors/aos.css?v=1" as="style">
    <title>CSBOX</title>
</svelte:head>

<!-- Page wrapper -->
<div class="flex flex-col min-h-screen overflow-hidden">
    <!-- Site header -->
    <Header/>
    <!-- Hero -->
    <Hero/>
    <!-- Clients TODO Empty obviously -->
    <Clients/>
    <!-- Rotating Categories -->
    <RotatingCategories/>
    <!-- Features #1 -->
    <Features/>
    <!-- Features Grid -->
    <FeaturesGrid/>
    <!-- Benefits -->
    <Benefits/>

    <PricingTable/>

    <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
    {#if PUBLIC_STRIPE_TEST_MODE}
        <stripe-pricing-table pricing-table-id="prctbl_1OuLBJRwAbJEJm28rkVTKAYg"
                              publishable-key="pk_test_51OuJKpRwAbJEJm28XoImgqZSBTLhYLd2DlGBKJRumOG3SprpNxHZ05cKgzQvbewdwzeHYZgo9hRNMEqLAuzfCBos00PzmaVmDF">
        </stripe-pricing-table>
        {:else}
        <stripe-pricing-table pricing-table-id="prctbl_1OuMAhRwAbJEJm284tCVEyVb"
                              publishable-key="pk_live_51OuJKpRwAbJEJm286wqnRZXsC58MMWpoSRIeb8A71oEvzMvJdmr4AeGHeG8BjMGF8gEZpHO1C4zQumUNHzmASAp000HLVXBHch">
        </stripe-pricing-table>
    {/if}
    <!-- Pricing -->
    <!-- Faculty Benefits -->
    <SIBenefits/>
    <!-- Testimonials -->
    <Testimonials/>
    <!-- CTA -->
    <CTA/>

    <!-- Site footer -->
    <Footer/>
</div>