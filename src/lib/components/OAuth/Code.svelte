<script lang="ts">
  import { browser } from "$app/environment";
  import { Turnstile } from "svelte-turnstile";
  let token;
  $: token;
  export let code;

  async function codeForSession(_token) {
    await fetch(`auth/callback/?code=${code}`)
  }
</script>
<body class="antialiased bg-body text-body font-body bg-gray-600 h-screen">
<div class="">
  <div class="dark:bg-scale-200 bg-scale-100 relative py-2 pb-16">
    <div
      class="sm:py-18 gap container relative mx-auto grid  px-6 py-16 md:gap-16 md:py-24 lg:gap-16 lg:px-16 lg:py-24 xl:px-20"
    >
      <div class="relative col-span-12 mb-16 md:col-span-7 md:mb-0 lg:col-span-6">
        <div class="relative lg:mx-auto lg:max-w-md bg-gray-600">
            <div class="border-scale-400 bg-scale-300 relative rounded-xl px-8 py-12 drop-shadow-sm">
              <div class="mb-6 flex flex-col gap-6">
                <div class="flex items-center gap-1">
                  <h1 class="text-scale-1200 text-2xl text-white">CSBOX</h1>
                </div>
              </div>
              <div class="flex justify-center text-center">
                {#if browser}
                  <Turnstile siteKey="0x4AAAAAAAFpCF8-h1TYQKHV" on:turnstile-callback={e => codeForSession(e.detail.token)} />
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</body>
