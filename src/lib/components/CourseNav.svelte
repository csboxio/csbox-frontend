<script>
  import {page} from "$app/stores";
  import {courseNavStore} from "$lib/stores/stores.ts";
  import {onMount} from "svelte";
  export const ssr = false

  export let claim;
  let route = '/d/courses/' + $page.params.slug + '/'

  const menuItems = [
    { name: "Home", route: route,                         claim: [ "student", "instructor" ] },
    { name: "Assignments", route: route + "assignments",  claim: [ "student", "instructor" ] },
    { name: "Modules", route: route + "modules",          claim: [ "student", "instructor" ] },
    { name: "Quizzes", route: route + "quizzes",          claim: [ "student", "instructor" ] },
    { name: "Grades", route: route + "grades",            claim: [ "student", "instructor" ] },
    { name: "People", route: route + "people",            claim: [ "student", "instructor" ] },
    { name: "Settings", route: route + "settings",        claim: [ "instructor" ] },
  ];


  function handleClick(menuItem) {
    $courseNavStore = menuItem.name;
  }
</script>

<section class="sticky inset-y-0 z-1 flex-shrink-0 mr-5 bg-gray-700 border-r border-t border-gray-500 dark:border-primary-darker dark:bg-darker lg:static focus:outline-none">
  <div class="flex flex-col h-screen">
    <!-- Panel content -->
    <div class="flex-1 pl-1.5 pr-1 mr-0.5 overflow-y-hidden font-semibold text-white">
      <!-- Content -->
      {#each menuItems as menuItem, index (menuItem.name)}
        {#if menuItem.claim.includes(claim)}
        <a href="{menuItem.route}" on:click={() => handleClick(menuItem)} key={index}>
          <div class="space-y-8 py-2 my-5 hover:bg-gray-800 rounded-lg" class:bg-gray-600={$courseNavStore === menuItem.name}>
            <p class="px-2 mx-1 text-gray-100" class:text-white={$courseNavStore === menuItem.name}>
              {menuItem.name}
            </p>
          </div>
        </a>
        {/if}
      {/each}
    </div>
  </div>
</section>