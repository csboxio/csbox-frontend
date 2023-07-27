<script>
  import {page} from "$app/stores";
  import {onMount} from "svelte";
  import { workspaceNavStore } from "$lib/stores/stores.ts";

  export const ssr = false

  let route = '/d/workspaces/'


  const menuItems = [
    { name: "Create Workspaces", route: route + 'create' },
    { name: "Workspaces", route: route },
  ];

  onMount(() => {
    const storedItem = localStorage.getItem('selectedWorkspaceItem');
    $workspaceNavStore = storedItem ? JSON.parse(storedItem) : null;
  });

  function handleClick(menuItem) {
    $workspaceNavStore = menuItem.name;
    localStorage.setItem('selectedWorkspaceItem', JSON.stringify(menuItem.name));
  }

</script>

<section class="sticky inset-y-0 z-1 flex-shrink-0 mr-5 bg-gray-700 border-r border-t border-gray-500 dark:border-primary-darker dark:bg-darker lg:static focus:outline-none">
  <div class="flex flex-col h-screen">
    <!-- Panel content -->
    <div class="flex-1 pl-1.5 pr-1 mr-0.5 overflow-y-hidden font-semibold text-white ">
      <!-- Content -->
      {#each menuItems as menuItem, index}
        <a href="{menuItem.route}" on:click={() => handleClick(menuItem)} key={index}>
          <div class="space-y-8 py-2 my-5 hover:bg-gray-800 rounded-lg" class:bg-gray-600={$workspaceNavStore === menuItem.name}>
            <p class="px-4 text-gray-100 whitespace-nowrap" class:text-white={$workspaceNavStore === menuItem.name}>
              {menuItem.name}
            </p>
          </div>
        </a>
      {/each}
      <hr>
    </div>
  </div>
</section>