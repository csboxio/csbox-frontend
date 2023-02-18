<script>
  import {page} from "$app/stores";
</script>

<section class="fixed inset-y-0 z-10 flex-shrink-0 w-60 bg-gray-600 border-r dark:border-primary-darker dark:bg-darker lg:static focus:outline-none">
  <div class="flex flex-col h-screen">
    <!-- Panel content -->
    <div class="flex-1 p-3 overflow-y-hidden text-lg font-semibold text-white ">
      <!-- Content -->
      <a href= {$page.params.slug}>
        <div class="space-y-8 py-3 hover:bg-gray-800 rounded-xl">
          <p class="px-4">Home</p>
        </div>
      </a>
      <a href= {$page.params.slug + "/assignments"}>
        <div class="space-y-8 py-3 hover:bg-gray-800 rounded-xl">
          <p class="px-4">Assignments</p>
        </div>
      </a>
      <div class="space-y-8 py-3 hover:bg-gray-800 rounded-xl">
        <p class="px-4">Modules</p>
      </div>
      <div class="space-y-8 py-3 hover:bg-gray-800 rounded-xl">
        <p class="px-4">Grades</p>
      </div>
      <div class="space-y-8 py-3 hover:bg-gray-800 rounded-xl">
        <p class="px-4">Settings</p>
      </div>

    </div>
  </div>
</section>