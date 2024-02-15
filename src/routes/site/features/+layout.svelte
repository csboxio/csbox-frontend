<!-- BlogPost.svelte -->

<script>
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import Fa from 'svelte-fa/src/fa.svelte';
    import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
    import Header from "../../../lib/home/blocks/Header.svelte";
</script>

<svelte:head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport"/>
    <link rel="stylesheet" href="/style.css?v=1" as="style">
    <title>CSBOX</title>
</svelte:head>

<!-- Page wrapper -->
<div class="flex flex-col min-h-screen overflow-hidden">
    <!-- Site header -->
    <Header/>
    <slot/>
</div>
