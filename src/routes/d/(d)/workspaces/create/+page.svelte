<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import { applyAction, deserialize } from "$app/forms";
  import { Range, Label } from 'flowbite-svelte'
  import {page} from "$app/stores";
  import WorkspaceNav from "$lib/components/WorkspaceNav.svelte";
  import Settings from "$lib/components/Settings.svelte";
  import Navbar from "$lib/components/Navbar.svelte";


  /** @type {import('./$types').PageData} */
  export let data;

  let active_workspaces;
  $: active_workspaces = $page.data.active_workspaces.data;

  let ide;
  $: ide = $page.data.ide;

  let selectedConfig = null;
  $: selectedConfig;
  let hoverConfig = null;
  $: hoverConfig;
  let selectedLanguage = null;
  $: selectedLanguage;

  let storageSize = 5;

  function selectLanguage(language) {
    selectedLanguage = language;
  }

  function selectConfig(config) {
    selectedConfig = config;
    console.log(selectedConfig)
  }

  function selectHoverConfig(config) {
    hoverConfig = config;
    console.log(hoverConfig)
  }

  async function handleSubmit(event) {
    const data = new FormData(this);

    data.set('type', selectedConfig);
    data.set('user_id', $page.data.session.user.id);
    data.set('language', selectedLanguage); // TODO not implemented

    const response = await fetch(this.action, {
      method: 'POST',
      body: data
    });
    const result = deserialize(await response.text());
    if (result.type === 'success') {
      // re-run all `load` functions, following the successful update
      await invalidateAll();
    }

    await applyAction(result);
  }
</script>

<body class="bg-gray-600 antialiased bg-body text-body font-body">

<!-- Nav bar on the left of the screen-->
<Navbar/>

<div class="mx-auto lg:ml-16">

  <!-- Top bar of settings -->
  <section>
    <div class="pt-3 pb-3 px-8 dark:bg-gray-700 bg-white">
      <div class="flex flex-wrap items-center justify-between -mx-2">
        <div class="w-full lg:w-auto px-2 mb-6 lg:mb-0">
          <h4 class="text-2xl font-bold dark:text-white  tracking-wide leading-7 mb-1">Workspaces - Create</h4>
        </div>
        <div class="w-full lg:w-auto px-2">
          <Settings bind:data={data}/>
        </div>
      </div>
    </div>
  </section>

  <div class="flex min-h-screen">
    <!-- Work space navigation -->
    <aside class="h-screen sticky top-0 inline-block" >
      <WorkspaceNav active_workspaces={active_workspaces}/>
    </aside>
    <!-- Content -->
    <section class="flex flex-col p-8 inline-block w-full">
      <div class="p-4">
        <h2 class="text-white  text-xl font-bold mb-4 pt-6">Create Workspace</h2>
        <form method="POST" action="?/createWorkspace" on:submit|preventDefault={handleSubmit}>
          <div class="grid gap-8 mb-6 px-6 sm:grid-cols-2 py-12">
            <div>
              <!-- Workspace Name-->
              <label for="workspace_name" class="block mb-2 text-sm font-medium text-white dark:text-white">
                Title
              </label>
              <input type="text" name="workspace_name" id="workspace_name"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
		focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
		dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     placeholder="Workspace Name"
                     required />
            </div>
            <div>
              <!-- Workspace Type-->
              <label for="type" class="block mb-2 text-sm font-medium text-white dark:text-white">
                Type
              </label>
              <div class="grid grid-cols-5 gap-0 mb-10" id="type">
                {#if ide}
                  {#each Object.entries(ide.type.configurations) as [key, config]}
                    <div class="object-contain rounded-lg cursor-pointer transition-colors duration-300 relative w-4/5 border p-1 hover:bg-gray-400"
                         class:border-blue-300={selectedConfig === config}
                         class:selected={selectedConfig === config}
                         on:click={() => selectConfig(config)}
                         on:mouseenter={() => selectHoverConfig(config)}
                         on:mouseleave={() => hoverConfig = null}>
                      <h3 class="text-lg font-bold text-white text-center">{config.name}</h3>
                      <div class="relative aspect-w-1 aspect-h-1">
                        <div class="absolute inset-0 top-8 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-75"
                             class:opacity-100={selectedConfig === config || hoverConfig === config}>
                          <div class="text-white text-center">
                            <p class="font-bold">{config.cpu} vCPU</p>
                            <p class="font-bold">{config.memory}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  {/each}
                {/if}
              </div>
            </div>
            <!-- Workspace Configuration -->
            <div class="container mx-auto">
              <label class="block mb-2 text-sm font-medium text-white dark:text-white">
                Language
              </label>
              <div class="grid grid-cols-3 gap-4">
                {#each Object.entries(ide.language.languages) as [key, config]}
                  <button type="button" class="p-4 border rounded-lg flex flex-col items-center justify-center hover:bg-gray-400"
                          class:border-blue-300={selectedLanguage === config}
                          class:selected={selectedLanguage === config}
                          on:click={() => selectLanguage(config)}>
                    <img src="/icons/languages/{config.name}.png" class="w-12 h-12 mb-2" />
                    <span class="text-sm text-white">{config.name}</span>
                  </button>
                {/each}
              </div>
            </div>

            <!-- Workspace storage size -->
            <div>
              <label class="block mb-2 text-sm font-medium text-white dark:text-white">
                Storage Size
              </label>
              <Range id="size" min="5" max="20" bind:value={storageSize}/>
              <p class="dark:text-white">GB: {storageSize}</p>
            </div>
          </div>
          <div class="p-4 flex  justify-between bg-white -ml-5">
            <p class="text-gray-600 text-lg">Monthly Rate: {selectedConfig?.tokens == null ? 0 : selectedConfig?.tokens * 100} Tokens</p>
            <div class="text-gray-600 text-lg">Hourly Rate: {selectedConfig?.tokens == null ? 0 : selectedConfig?.tokens} Tokens</div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
          </div>
        </form>

      </div>
    </section>
  </div>
</div>
</body>


