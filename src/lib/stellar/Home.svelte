<script context="module">

</script>

<script>

import Header from "$lib/stellar/Header.svelte";
import Clients from "$lib/stellar/Clients.svelte";
import Hero from "$lib/stellar/Hero.svelte";
import Features from "$lib/stellar/Features.svelte";
import Features02 from "$lib/stellar/Features02.svelte";
import Features03 from "$lib/stellar/Features03.svelte";
import Features04 from "$lib/stellar/Features04.svelte";
import Pricing from "$lib/stellar/Pricing.svelte";
import {Cta} from "flowbite-svelte-blocks";
import {Footer} from "flowbite-svelte";
</script>


<div class="flex flex-col min-h-screen overflow-hidden">
  <Header>
  </Header>
  <main class="grow">
    <Hero>
    </Hero>
    <Features>
    </Features>
    <Features02>
    </Features02>
    <Features03>
    </Features03>
    <Features04>
    </Features04>
    <Pricing>
    </Pricing>
    <Cta>
    </Cta>
  </main>
  <Footer>
  </Footer>
</div>
