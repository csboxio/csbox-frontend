<script lang="ts">
  import { page } from '$app/stores'
  export let showTopRightMenuModel = false
  export function handleToggleMenuTopRight(s: string) {
    showTopRightMenuModel = s == "inside" && !showTopRightMenuModel;
  }
</script>

<div class="w-full sm:w-auto">
  <button type="button" class="inline-flex items-center justify-center py-2 pl-2 pr-3 bg-gray-500 hover:bg-gray-400 hover:bg-opacity-40 transition duration-150 rounded-full"
          id="menu-button" aria-expanded="true" aria-haspopup="true"
          on:click|stopPropagation={() => handleToggleMenuTopRight("inside")}>
    <img class="h-8 w-8 mr-3 rounded-full object-cover" src="" alt="">
    <h4 class="text-white font-extrabold tracking-wide mr-5"></h4>
    <svg width="10" height="6" viewbox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L5 5L9 1" stroke="#3D485B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  </button>

  {#if showTopRightMenuModel}
    <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div class="py-1" role="none">
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <a href="#" class="text-gray-100 block px-4 py-2 text-sm hover:bg-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
        <button type="submit" class="text-gray-100 block w-full px-4 py-2 text-left text-sm hover:bg-gray-700" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
      </div>
    </div>
  {/if}
</div>