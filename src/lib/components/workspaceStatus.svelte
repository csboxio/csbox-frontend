<script>
    export let workspace_state;
    let isHovering;

    /*function getStatusText(statusCode) {
        const statusText = ide.status_codes[statusCode];
        return statusText ? statusText : "Unknown";
    }*/
</script>

<span class="flex flex-row items-center text-sm font-medium text-gray-900 dark:text-white ">
    {#if workspace_state === 0}
    <span class="flex w-3.5 h-3.5 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex-shrink-0"
          title="Stopped"> </span>
  {:else if workspace_state === 1}
    <span class="flex w-3.5 h-3.5 animate-pulse bg-gradient-to-br from-green-600 to-green-700 rounded-full flex-shrink-0"
          title="Running"> </span>
  {:else if workspace_state === 2}
    <span class="flex w-3.5 h-3.5 bg-gradient-to-br from-green-800 to-green-500 rounded-full flex-shrink-0"
          title="Initializing"> </span>
  {:else if workspace_state === 3}
    <span class="flex w-3.5 h-3.5 bg-gradient-to-br from-red-700 to-red-500  rounded-full flex-shrink-0"
          title="Shutting Down"> </span>
  {:else if workspace_state === 4}
    <span class="flex w-3.5 h-3.5 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex-shrink-0"
          title="Migrating">
    </span>
  {:else if workspace_state === 5}
    <span class="flex w-3.5 h-3.5 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex-shrink-0"
          title="Error">
    </span>
  {:else if workspace_state === 6}
    <span class="flex w-3.5 h-3.5 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex-shrink-0"
          title="Archived">
    </span>
  {:else if workspace_state === 7}
    <span class="flex w-3.5 h-3.5 bg-gradient-to-br from-yellow-800 to-yellow-600  rounded-full flex-shrink-0"
          title="Paused">
    </span>
  {:else if workspace_state === 8}
    <span class="flex w-3.5 h-3.5 bg-gradient-to-br from-pink-500 to-pink-700 rounded-full flex-shrink-0"
          title="Patching">
    </span>
  {:else if workspace_state === 9}
    <span class="flex w-3.5 h-3.5 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex-shrink-0"
          title="Removing">
    </span>

  {:else}
    <span class="text-gray-400">Unknown</span>
  {/if}
</span>
