<script>

  import {afterUpdate, onMount} from "svelte";
  import { workspaceNavStore } from "$lib/stores/stores.ts";
  import {page} from "$app/stores";
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faArrowLeft, faArrowRight, faCheck, faLayerGroup, faX} from "@fortawesome/free-solid-svg-icons";
  import {browser} from "$app/environment";


  export let healthcheck;

  let route = '/d/workspaces/'


  const menuItems = [
    { name: "Workspaces", route: route + 'view' },
    { name: "Templates", route: route + 'templates' },
  ];

  let statusIndicator
  $: statusIndicator = healthcheck

  let pathname = '';
  let extractedName;

  function extractNameFromPath() {
    pathname = $page.url.pathname;
    const pathnameParts = pathname.split("/");
    if (pathnameParts.length > 4 && browser) {
      return pathnameParts[4].charAt(0).toUpperCase() + pathnameParts[3].substring(1)
    }
    else {
      return "View"
    }
  }
  afterUpdate(() => {
    extractedName = extractNameFromPath();
  });


  let isMenuVisible = false;

  function toggleMenu() {
    isMenuVisible = !isMenuVisible;
  }

</script>

<section class="sticky inset-y-0 z-1 flex-shrink-0 mr-5 dark:bg-gray-700 bg-gray-100 border-r border-t border-gray-500 dark:border-primary-darker dark:bg-darker lg:static focus:outline-none">
  <div class="flex flex-col h-screen">
    <!-- Panel content -->
    <div class="flex-1 pl-1.5 pr-1 mr-0.5 overflow-y-hidden font-semibold text-white">
      <button class="lg:hidden py-2 text-gray-200" on:click={toggleMenu}>
        {#if isMenuVisible}<Fa icon={faArrowLeft} size="lg"/>{:else}<Fa icon={faArrowRight} size="lg"/>{/if}
      </button>

      <!-- Content -->

      <!-- This is required to not duplicate menu (the if statement)-->
      {#if !isMenuVisible}
        <div class="hidden lg:block">
          {#each menuItems as menuItem, index (menuItem.name)}
            <a href="{menuItem.route}" key={index}>
              <div class="space-y-8 py-2 my-5 dark:hover:bg-gray-800 hover:bg-gray-200 rounded-lg dark:{$page.url.pathname === menuItem.route ? 'bg-gray-600' : ''} {$page.url.pathname === menuItem.route ? 'bg-gray-300' : ''}">
                <p class="px-4 text-black dark:text-gray-100 whitespace-nowrap dark:{$page.url.pathname === menuItem.route ? 'text-white' : ''} ">
                  {menuItem.name}
                </p>
              </div>
            </a>
          {/each}
        </div>
      {/if}

      {#if isMenuVisible}
        {#each menuItems as menuItem, index (menuItem.name)}
          <a href="{menuItem.route}" key={index}>
            <div class="space-y-8 py-2 my-5 hover:bg-gray-800 rounded-lg" class:bg-gray-600={$page.url.pathname === menuItem.route}>
              <p class="px-4 text-gray-100 whitespace-nowrap" class:text-white={$page.url.pathname === menuItem.route}>
                {menuItem.name}
              </p>
            </div>
          </a>
        {/each}
      {/if}

    </div>
  </div>
</section>