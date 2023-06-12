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
  <h2 class="text-white text-center text-xl font-bold mb-4">Create Instance</h2>

  <form method="POST" action="?/createInstance" on:submit|preventDefault={handleSubmit}>


    <div>
      <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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

    <div>
      <label
        for="configuration"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Configuration</label
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
    </div>

    <div>
      <h2 class="text-white text-center text-xl font-bold mb-4">4th Gen Intel Xeon Scalable processor </h2>

      <div class="grid grid-cols-5 gap-4">
      {#each Object.entries(ide[0].types.configurations) as [key, config]}
        <div
          class="p-4 rounded-lg cursor-pointer transition-colors duration-300 relative w-3/5"
          class:bg-gray-400={selectedConfig === config}
          class:selected={selectedConfig === config}
          on:click={() => selectConfig(config)}
        >
          <h3 class="text-lg font-bold mb-2">{config.name}</h3>
          <div class="relative aspect-w-1 aspect-h-1">
            <img src="/instances/{config.name}.jfif" alt="Configuration Image" class="object-cover rounded-lg hover:filter-blur-md h-32 h-32">
            <div class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-75">
              <div class="text-white text-center">
                <p class="font-bold">CPU: {config.cpu} vCPU</p>
                <p class="font-bold">Memory: {config.memory}</p>
                <p class="font-bold">Tokens per hour: {config.tokens}</p>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
    </div>





    <button
      type="submit"
      class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      <svg
        class="mr-1 -ml-1 w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clip-rule="evenodd"
        />
      </svg>
      Add new instance
    </button>
</form>
</div>
</body>