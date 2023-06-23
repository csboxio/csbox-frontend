<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import { applyAction, deserialize } from "$app/forms";

  // this is needed for the outside click div, that needs to be redone
  let model;

  /** @type {import('./$types').PageData} */
  export let data;
  let instances;
  $: instances = data.instances;
  let ide;
  $: ide = data.ide;


  let selectedConfig = null;
  $: selectedConfig;
  let hoverConfig = null;

  function selectConfig(config) {
    selectedConfig = config;
  }

  async function handleSubmit(event) {
    const data = new FormData(this);
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
<body class="bg-gray-600 antialiased h-screen">
<div class="p-4">
  <h2 class="text-white  text-xl font-bold mb-4 pt-6">Create Workspace</h2>

  <form method="POST" action="?/createInstance" on:submit|preventDefault={handleSubmit}>

    <div class="grid gap-4 mb-6 px-2 sm:grid-cols-2 py-12">
    <div>
      <label for="title" class="block mb-2 text-sm font-medium text-white dark:text-white"
      >Title</label
      >
      <input
        type="text"
        name="title"
        id="title"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
								 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
								  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder="Instance Name"
        required
      />
    </div>
      <!--
<div>
<label
  for="configuration"
  class="block mb-2 text-sm font-medium text-white dark:text-white">Configuration</label
>
<select
  name="configuration"
  id="configuration"
  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500
           focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
           dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
  required
>
  <option selected="">Select category</option>
  {#each Object.entries(ide[0].configuration) as [key, config]}
    <option value={key}>{config.name}</option>
  {/each}
</select>
    </div>-->


    <div>
      <h2 class="text-white text-center text-xl font-bold mb-4">Type</h2>

      <div class="grid grid-cols-5 gap-0">
      {#each Object.entries(ide[0].types.configurations) as [key, config]}
        <div
                class="object-contain rounded-lg cursor-pointer transition-colors duration-300 relative w-4/5 border p-1 hover:bg-gray-400"
                class:border-blue-300={selectedConfig === config}
                class:selected={selectedConfig === config}
                on:click={() => selectConfig(config)}
                on:hover={() => hoverConfig = config}
        >
          <h3 class="text-lg font-bold text-white text-center">{config.name}</h3>
          <div class="relative aspect-w-1 aspect-h-1">
            <div class="absolute inset-0 top-8 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-75"
                 class:opacity-100={selectedConfig === config || hoverConfig === config}
            >
              <div class="text-white text-center">
                <p class="font-bold">{config.cpu} vCPU</p>
                <p class="font-bold">{config.memory}</p>
                <!--<p class="font-bold">Tokens per hour: {config.tokens}</p>-->
              </div>
            </div>
          </div>
        </div>

      {/each}

      </div>
    </div>
      <div class="container mx-auto p-4">
        <div class="grid grid-cols-3 gap-4">
          {#each Object.entries(ide[0].languages.languages) as [key, config]}
            <button type="button" class="p-4 border rounded-lg flex flex-col items-center justify-center">
              <img src="/icons/languages/{config.name}.png" class="w-12 h-12 mb-2" />
              <span class="text-sm text-white">{config.name}</span>
            </button>
          {/each}
        </div>
      </div>

    </div>

    <div class="fixed bottom-0 left-20 right-0 p-4 flex justify-between bg-white">
      <p class="text-gray-600 text-lg">Monthly Rate: {selectedConfig?.tokens == null ? 0 : selectedConfig?.tokens * 100} Tokens</p>
      <div class="text-gray-600 text-lg">Hourly Rate: {selectedConfig?.tokens == null ? 0 : selectedConfig?.tokens} Tokens</div>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
    </div>
</form>
</div>
</body>