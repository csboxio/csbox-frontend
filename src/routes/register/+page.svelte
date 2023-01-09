<script lang="ts">
  import type { ActionData } from './$types';
  import { applyAction, enhance, type SubmitFunction } from '$app/forms';
  import { invalidate } from '$app/navigation';

  export let form: ActionData;
  let loading = false;
</script>

<body class="antialiased bg-body text-body font-body">
<div class="">

  <section class="h-screen relative pt-16 pb-36 bg-gradient-black2 overflow-hidden">
    <img class="absolute top-0 transform left-1/2 -translate-x-1/2" src="/elements/radial.svg" alt="">
    <div class="relative z-10 container mx-auto px-4">
      <div class="flex flex-wrap -m-6">
        <div class="w-full p-6">
          <div class="md:max-w-xl text-center mx-auto">
            <h2 class="mb-4 font-heading font-bold text-gray-100 text-6xl sm:text-7xl">Register</h2>
            {#if form?.error}
              <div class="block notification is-danger">{form.error}</div>
            {/if}
            <p class="mb-11 text-lg text-gray-200">Please fill out the information below!</p>
            <form class="row flex-center flex" method="POST" action="?/signup">
              {#if form?.missing}<p class="error">The email field is required</p>{/if}
              {#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if}
              <div class="flex flex-wrap max-w-md mx-auto -m-2 mb-5">
                <div class="w-full p-2">
                  <!--Email-->
                  <input class="w-full px-5 py-3.5 text-gray-500 placeholder-gray-500 bg-white outline-none focus:ring-4 focus:ring-indigo-500 border border-gray-200 rounded-lg"
                         type="email" placeholder="Email address" name="email" autocomplete="username" value={form?.values?.email ?? ''}>
                </div>
                <!--Password-->
                <div class="w-full p-2">
                  <input class="w-full px-5 py-3.5 text-gray-500 placeholder-gray-500 bg-white outline-none focus:ring-4 focus:ring-indigo-500 border border-gray-200 rounded-lg"
                         id="password" type="password" placeholder="Password" name="password" autocomplete="current-password" required>
                </div>
                <div class="w-full p-2">
                  <div class="group relative">
                    <div class="absolute top-0 left-0 w-full h-full bg-gradient-blue opacity-0 group-hover:opacity-50 rounded-lg transition ease-out duration-300"></div>
                    <button class="p-1 w-full font-heading font-medium text-base text-white overflow-hidden rounded-md">
                      <div class="relative py-4 px-9 bg-gradient-blue overflow-hidden rounded-md">
                        <input on:submit|preventDefault type="submit"
                               class="absolute top-0 left-0 transform -translate-y-full group-hover:-translate-y-0 h-full w-full bg-gray-900 transition ease-in-out duration-500"
                               disabled={loading}
                               value = ""
                        />
                        <p class="relative z-10">{loading ? 'Loading' : 'Submit'}</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <p class="text-base text-gray-200">
              <span>Already have an account?</span>
              <a class="text-blue-500 hover:text-blue-300" href="/">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</body>