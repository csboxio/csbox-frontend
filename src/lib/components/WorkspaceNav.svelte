<script>
  import {page} from "$app/stores";
  export const ssr = false

  export let active_workspaces = []

</script>

<section class="sticky inset-y-0 z-1 flex-shrink-0 mr-5 bg-gray-700 border-r border-t border-gray-500 dark:border-primary-darker dark:bg-darker lg:static focus:outline-none">
  <div class="flex flex-col h-screen">
    <!-- Panel content -->
    <div class="flex-1 pl-1.5 pr-1 mr-0.5 overflow-y-hidden font-semibold text-white ">
      <!-- Content -->
      <a href="/d/workspaces/create">
        <div class="space-y-8 py-4 hover:bg-gray-800 rounded-lg">
          <p class="px-4 whitespace-nowrap">Create Workspace</p>
        </div>
      </a>
      {#each active_workspaces as workspace}
        <a href="/d/workspaces/">
          <div class="space-y-8 py-2 my-5 hover:bg-gray-800 rounded-lg">
            <p class="px-2 mx-1 text-gray-100">{workspace.workspace_name}</p>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>