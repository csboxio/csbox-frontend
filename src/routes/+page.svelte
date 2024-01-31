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
	import FacultyBenefits from "../lib/home/blocks/FacultyBenefits.svelte";
	import StudentBenefits from "../lib/home/blocks/StudentBenefits.svelte";
	import Testimonials from "../lib/home/blocks/Testimonials.svelte";
	import CTA from "../lib/home/blocks/CTA.svelte";
	import Footer from "../lib/home/blocks/Footer.svelte";
    import {onMount} from "svelte";
    import {init} from "../lib/home/scripts/init.js";

    onMount(() => {
        // Main init function for home page.
        init();
    });

</script>

<svelte:head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport"/>
    <link href="./style.css" rel="stylesheet">
    <link href="./src/lib/home/style/home.css" rel="stylesheet">
    <link href="./css/vendors/aos.css" rel="stylesheet">

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
    <!-- Pricing -->
    <Pricing/>
    <!-- Faculty Benefits -->
    <FacultyBenefits/>
    <!-- Student Benefits -->
    <StudentBenefits/>
    <!-- Testimonials -->
    <Testimonials/>
    <!-- CTA -->
    <CTA/>

    <!-- Site footer -->
    <Footer/>
</div>