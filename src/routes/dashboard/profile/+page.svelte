<script lang="ts" xmlns="http://www.w3.org/1999/html">
  import { page } from "$app/stores";
  import Avatar from "$lib/components/Avatar.svelte";
  import { onMount } from "svelte";
  import { goto, invalidateAll } from "$app/navigation";
  import { applyAction, deserialize } from "$app/forms";
  let session = $page.data.session;

  /** @type {import("./$types").PageData} */
  export let data;
  // TODO error handling
  let username: string | null = null;
  let firstName: string | null = data.user.first_name;
  let last_name: string | null = data.user.last_name;
  let website: string | null = data.user.website;
  let country: string | null = data.user.country;
  let avatarUrl: string | null = data.user.avatar_url;

  let loading;
  function previousPage() {
    history.back()
  }

  async function handleSubmit(event) {
    loading = true;
    const data = new FormData(this);

    const response = await fetch(this.action, {
      method: 'POST',
      body: data,
      headers: {
        'x-sveltekit-action': 'true',
        'cache-control': 'max-age=1800'
      }
    });

    const result = deserialize(await response.text());

    if (result.type === 'redirect') {
      // re-run all `load` functions, following the successful update
      console.log('courses made');
      await invalidateAll();
    }

    await applyAction(result);
  }
</script>

<body class="bg-gray-600 antialiased bg-body text-body font-body">
<form method="POST" action="?/updateProfile" on:submit|preventDefault={handleSubmit}>
  <section class="py-3">
    <div class="container px-6 mx-auto">
      <div class="p-8 bg-gray-500 rounded-xl">
        <div class="flex flex-wrap items-center justify-between -mx-4 mb-8 pb-6 border-b border-gray-400 border-opacity-20">
          <div class="w-full sm:w-auto px-4 mb-6 sm:mb-0">
            <h4 class="text-2xl font-bold tracking-wide text-white mb-1">Edit Profile</h4>
          </div>
          <div class="w-full sm:w-auto px-4">
            <div>
              <!--Save and cancel buttons-->
              <a class="inline-block py-2 px-4 mr-3 text-xs text-center font-semibold leading-normal text-gray-200 bg-gray-600 hover:bg-gray-400 rounded-lg transition duration-200" rel="external" on:click={previousPage}>Cancel</a>
              <input class="inline-block py-2 px-4 text-xs text-center font-semibold leading-normal text-gray-200 bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-200" rel="external" href="/dashboard" type="submit">
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
          <div class="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
            <span class="text-sm font-medium text-gray-100">Name</span>
          </div>
          <div class="w-full sm:w-2/3 px-4">
            <div class="max-w-xl">
              <div class="flex flex-wrap items-center -mx-3">
                <div class="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
                  <input name="first" id="first" type="text" class="block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg" placeholder="" bind:value={firstName}>
                </div>
                <div class="w-full sm:w-1/2 px-3">
                  <input name="last_name" id="last_name" type="text" class="block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg" placeholder="" bind:value={last_name}>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
          <div class="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
            <span class="text-sm font-medium text-gray-100">Email address</span>
          </div>
          <div class="w-full sm:w-2/3 px-4">
            <div class="max-w-xl">
              <input class="block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg" id="formInput1-3" type="text" placeholder="example@email.com" bind:value={session.user.email}>
            </div>
          </div>
        </div>
        <Avatar size={10} bind:url={avatarUrl}/>
        <div class="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
          <div class="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
            <span class="text-sm font-medium text-gray-100">Country</span>
          </div>
          <div class="w-full sm:w-2/3 px-4">
            <div class="max-w-xl">
              <div class="relative block px-3 w-full text-sm text-gray-200 placeholder-gray-100 font-medium border border-gray-400 hover:border-white focus-within:border-blue-500 rounded-lg">
                      <span class="absolute top-1/2 right-0 mr-5 transform -translate-y-1/2">
                        <svg width="12" height="8" viewbox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.9999 1.16994C10.8126 0.983692 10.5591 0.87915 10.2949 0.87915C10.0308 0.87915 9.77731 0.983692 9.58995 1.16994L5.99995 4.70994L2.45995 1.16994C2.27259 0.983692 2.01913 0.87915 1.75495 0.87915C1.49076 0.87915 1.23731 0.983692 1.04995 1.16994C0.95622 1.26291 0.881826 1.37351 0.831057 1.49537C0.780288 1.61723 0.75415 1.74793 0.75415 1.87994C0.75415 2.01195 0.780288 2.14266 0.831057 2.26452C0.881826 2.38638 0.95622 2.49698 1.04995 2.58994L5.28995 6.82994C5.38291 6.92367 5.49351 6.99807 5.61537 7.04883C5.73723 7.0996 5.86794 7.12574 5.99995 7.12574C6.13196 7.12574 6.26267 7.0996 6.38453 7.04883C6.50638 6.99807 6.61699 6.92367 6.70995 6.82994L10.9999 2.58994C11.0937 2.49698 11.1681 2.38638 11.2188 2.26452C11.2696 2.14266 11.2957 2.01195 11.2957 1.87994C11.2957 1.74793 11.2696 1.61723 11.2188 1.49537C11.1681 1.37351 11.0937 1.26291 10.9999 1.16994Z" fill="#3D485B"></path>
                        </svg>
                      </span>
                <select name="country" id="country" class="w-full py-4 appearance-none bg-transparent outline-none">
                  <option class="bg-gray-600" value="1">United States</option>
                  <option class="bg-gray-600" value="1">United States</option>
                  <option class="bg-gray-600" value="1">United States</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
          <div class="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
            <span class="text-sm font-medium text-gray-100">Github</span>
          </div>
          <div class="w-full sm:w-2/3 px-4">
            <div class="max-w-xl">
              <input class="block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg" id="website" name="website" type="text" placeholder="" bind:value={website}>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-start -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
          <div class="w-full sm:w-1/3 px-4 mb-5 sm:mb-0">
            <span class="block mt-2 text-sm font-medium text-gray-100">Bio</span>
            <span name="bio" class="text-xs text-gray-300">Tell everyone more about yourself!</span>
          </div>
          <div class="w-full sm:w-2/3 px-4">
            <div class="max-w-xl"><textarea class="block h-56 py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg resize-none" id="formInput1-9" type="text" placeholder="Hello! . . ."></textarea></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</form>
</body>
