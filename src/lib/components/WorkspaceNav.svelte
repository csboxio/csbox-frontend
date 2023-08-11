<script>

  import {onMount} from "svelte";
  import { workspaceNavStore } from "$lib/stores/stores.ts";

  export let healthcheck;

  let route = '/d/workspaces/'


  const menuItems = [
    { name: "Create Workspace", route: route + 'create' },
  ];

  const secondMenuItems = [
    { name: "Workspaces", route: route },
    { name: "Templates", route: route + 'templates' },
  ];

  let statusIndicator
  $: statusIndicator = healthcheck

  onMount(async () => {
    const storedItem = localStorage.getItem('selectedWorkspaceItem');
    $workspaceNavStore = storedItem ? JSON.parse(storedItem) : null;
  });

  function handleClick(menuItem) {
    $workspaceNavStore = menuItem.name;
    localStorage.setItem('selectedWorkspaceItem', JSON.stringify(menuItem.name));
  }

</script>

<section class="sticky inset-y-0 z-1 flex-shrink-0  bg-gray-700 border-r border-t border-gray-500 dark:border-primary-darker dark:bg-darker lg:static focus:outline-none">
  <div class="flex flex-col h-[calc(100vh-5rem)]">
    <!-- Panel content -->
    <div class="flex-1 pl-1.5 pr-1 mr-0.5 overflow-y-hidden font-semibold text-white ">

      {#each secondMenuItems as menuItem, index}
        <a href="{menuItem.route}" on:click={() => handleClick(menuItem)} key={index}>
          <div class="space-y-8 py-2 my-5 hover:bg-gray-800 rounded-lg" class:bg-gray-600={$workspaceNavStore === menuItem.name}>
            <p class="px-4 text-gray-100 whitespace-nowrap" class:text-white={$workspaceNavStore === menuItem.name}>
              {menuItem.name}
            </p>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>