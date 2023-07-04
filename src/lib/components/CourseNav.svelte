<script>
  import {page} from "$app/stores";
  import {courseNavStore} from "$lib/stores/stores.ts";
  export const ssr = false
  let route = '/d/courses/' + $page.params.slug + '/'

  const menuItems = [
    { name: "Home", route: route },
    { name: "Assignments", route: route + "assignments" },
    { name: "Modules", route: route + "modules" },
    { name: "Quizzes", route: route + "quizzes" },
    { name: "Grades", route: route + "grades" },
    { name: "People", route: route + "people" },
    { name: "Settings", route: route + "settings" },
  ];
</script>

<section class="sticky inset-y-0 z-1 flex-shrink-0 mr-5 bg-gray-700 border-r border-t border-gray-500 dark:border-primary-darker dark:bg-darker lg:static focus:outline-none">
  <div class="flex flex-col h-screen">
    <!-- Panel content -->
    <div class="flex-1 pl-1.5 pr-1 mr-0.5 overflow-y-hidden font-semibold text-white ">
      <!-- Content -->
      {#each menuItems as menuItem, index}
        <a href="{menuItem.route}" each="{menuItem, index} in menuItems" key="{index}"
           on:click={() => $courseNavStore = menuItem.name}>
          <div class="space-y-8 py-2 my-5 hover:bg-gray-800 rounded-lg"
               class:bg-gray-600={$courseNavStore === menuItem.name}>
            <p class="px-2 mx-1 text-gray-100"
               class:text-white={$courseNavStore === menuItem.name}>
              {menuItem.name}
            </p>
          </div>
        </a>
        {/each}
    </div>
  </div>
</section>