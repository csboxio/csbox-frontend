<script context="module">

  let tab = '1';

</script>
<script>



import Particles from "$lib/stellar/Particles.svelte";
</script>

{tab}
<section>
  <div class="relative max-w-6xl mx-auto px-4 sm:px-6">
    <div class="absolute inset-0 -z-10 -mx-28 rounded-t-[3rem] pointer-events-none overflow-hidden"
         aria-hidden="true">
      <div class="absolute left-1/2 -translate-x-1/2 top-0 -z-10">
        <img src="../images/glow-top.svg"
             class="max-w-none"
             width="1404"
             height="658"
             alt="Features Illustration"/>
      </div>
    </div>
    <div class="pt-16 pb-12 md:pt-52 md:pb-20">
      <div>
        <div class="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-8 space-y-reverse md:space-y-0">
          <div class="md:w-7/12 lg:w-1/2 order-1 md:order-none max-md:text-center"
               data-aos="fade-down">
            <div>
              <div class="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-200 pb-3">
The security first platform              </div>
            </div>
            <h3 class="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">
Simplify your security with authentication services            </h3>
            <p class="text-lg text-slate-400 mb-8">
Define access roles for the end-users, and extend your authorization capabilities to implement dynamic access control.            </p>
            <div class="mt-8 max-w-xs max-md:mx-auto space-y-2">
              <button class="flex items-center text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100
                      {tab !== '1' ? 'border-slate-700 opacity-50' : 'border-purple-700 shadow shadow-purple-500/25'}"
                      on:click={tab = '1'}>
                <svg class="shrink-0 fill-slate-300 mr-3"
                     xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16">
                  <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12Zm0 14V2H2v12h12Zm-3-7H5a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2Zm0 4H5a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Z">
                  </path>
                </svg>
                <span>
Simplify your security                </span>
              </button>
              <button class="flex items-center text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100
                            {tab !== '2' ? 'border-slate-700 opacity-50' : 'border-purple-700 shadow shadow-purple-500/25'}"
                      on:click={tab = '2'}>
                <svg class="shrink-0 fill-slate-300 mr-3"
                     xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16">
                  <path d="M2 6H0V2a2 2 0 0 1 2-2h4v2H2v4ZM16 6h-2V2h-4V0h4a2 2 0 0 1 2 2v4ZM14 16h-4v-2h4v-4h2v4a2 2 0 0 1-2 2ZM6 16H2a2 2 0 0 1-2-2v-4h2v4h4v2Z">
                  </path>
                </svg>
                <span>
Customer identity                </span>
              </button>
              <button class="flex items-center text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100
                            {tab !== '3' ? 'border-slate-700 opacity-50' : 'border-purple-700 shadow shadow-purple-500/25'}"
                      on:click={tab = '3'}>
                <svg class="shrink-0 fill-slate-300 mr-3"
                     xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16">
                  <path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8ZM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1Z">
                  </path>
                </svg>
                <span>
Adaptable authentication                </span>
              </button>
            </div>
          </div>
          <div class="md:w-5/12 lg:w-1/2"
               data-aos="fade-up"
               data-aos-delay="100">
            <div class="relative py-24 -mt-12">
              <Particles class="absolute inset-0 -z-10"
                         quantity="{8}"
                         staticity="{30}">
              </Particles>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
