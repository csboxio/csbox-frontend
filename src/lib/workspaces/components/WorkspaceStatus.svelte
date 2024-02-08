<script>
  export let workspace_state;

  // Sample JSON object with state information
  const stateInfo = [
    { id: 0, title: "Stopped", gradient: "from-gray-400 to-gray-500" },
    { id: 1, title: "Running", gradient: "from-green-600 to-green-700" },
    { id: 2, title: "Initializing", gradient: "from-green-800 to-green-500" },
    { id: 3, title: "Shutting Down", gradient: "from-red-700 to-red-500" },
    { id: 4, title: "Migrating", gradient: "from-blue-600 to-blue-400" },
    { id: 5, title: "Error", gradient: "from-red-500 to-red-700" },
    { id: 6, title: "Archived", gradient: "from-gray-600 to-gray-800" },
    { id: 7, title: "Paused", gradient: "from-yellow-800 to-yellow-600" },
    { id: 8, title: "Patching", gradient: "from-pink-500 to-pink-700" },
    { id: 9, title: "Removing", gradient: "from-blue-500 to-blue-700" }
  ];
</script>

{#if workspace_state >= 0 && workspace_state <= 9}
  {#each stateInfo as state}
    {#if workspace_state === state.id}
      {#key workspace_state}
      <div class="text-center items-center text-sm font-medium text-gray-900 dark:text-white inline-block">
        <span class={`flex w-3.5 h-3.5 animate-pulse bg-gradient-to-br ${state.gradient} rounded-full flex-shrink-0`} title={state.title}></span>
      </div>
      {/key}
    {/if}
  {/each}
{:else}
  <span class="text-gray-400">Unknown</span>
{/if}