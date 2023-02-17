<script lang="ts">
  import { supabaseClient } from "$lib/utilities/supabaseClient";
  import { goto } from "$app/navigation";
  import {page} from "$app/stores";
  import { onDestroy, onMount } from "svelte";
  import { userStore } from "../stores/stores";
  import {browser} from "$app/environment";

  export const ssr = true;
  export let showTopRightMenuModel = false
  export function handleToggleMenuTopRight(s) {
    showTopRightMenuModel = s == "inside" && !showTopRightMenuModel;
  }

  let email;
  let avatarUrl;
  let full_name;
  let user;

  user = $page.data.user.userData
  email = $page.data.session?.user.email
  avatarUrl = user.avatar_url;
  full_name = user.first_name + " " + user.last_name;

  async function signOut() {
    try {
      let { error } = await supabaseClient.auth.signOut()
      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
    await goto('/login')
  }


</script>

<div class="w-full sm:w-auto">
  <div class="relative inline-block text-left">
    <div>
      <button type="button" class="inline-flex items-center justify-center py-2 pl-2 pr-3 bg-gray-500 hover:bg-gray-400 hover:bg-opacity-40 transition duration-150 rounded-full"
              id="menu-button" aria-expanded="true" aria-haspopup="true"
              on:click|stopPropagation={() => handleToggleMenuTopRight("inside")}>
        <img class="h-8 w-8 mr-3 rounded-full object-cover" src="{avatarUrl}" alt="{avatarUrl}">
        <h4 class="text-white font-bold tracking-wide mr-5">{full_name}</h4>
        <svg width="10" height="6" viewbox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L9 1" stroke="#3D485B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>

      {#if showTopRightMenuModel}
        <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div class="truncate font-bold">{email}</div>
          </div>
          <div class="py-1" role="none">
            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
            <a href="/dashboard/profile" class="font-semibold text-gray-100 block px-4 py-2 text-sm hover:bg-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
            <button type="submit" on:click={signOut} class="font-semibold text-gray-100 block w-full px-4 py-2 text-left text-sm hover:bg-gray-700" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>