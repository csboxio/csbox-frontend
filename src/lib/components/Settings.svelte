<script lang="ts">
  import {page} from "$app/stores";
  import { goto } from "$app/navigation";
  import {Button, Dropdown, DropdownItem, DropdownDivider, DropdownHeader, Chevron, Avatar} from 'flowbite-svelte'
  import {notifications} from "$lib/utilities/notifications.js";
  import {onMount} from "svelte";

  export const ssr = true;
  export let showTopRightMenuModel = false
  export function handleToggleMenuTopRight(s) {
    showTopRightMenuModel = s == "inside" && !showTopRightMenuModel;
  }
  const { data: user } = $page.data.user;
  const { email } = $page.data.session?.user;
  const { updated_at: updated } = $page.data.user;
  const avatarUrl = `${user.avatar_url}?t=${updated}`;
  const full_name = `${user.first_name} ${user.last_name}`;

  export let data

  let { supabase } = data
  $: ({ supabase } = data)

  let notificationsReceived
  $: notificationsReceived;

  async function signOut() {
    try {
      let { error } = await  $page.data.supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
    await goto('/')
  }

  async function getNotifications() {
    const { data, error } = await supabase
            .from("notifications")
            .select("new")
            .eq('id', $page.data.session.user.id)

    if (!error) {
      return data;
    }
  }

  onMount(async () => {
    notificationsReceived = await getNotifications()
    notificationsReceived = JSON.parse(notificationsReceived[0].new)
    console.log(notificationsReceived)
  });
</script>

<div class="w-full lg:w-auto px-2">
  <div class="sm:flex items-center ">
    <div class="w-full sm:w-auto mb-6 sm:mb-0 sm:mr-4 z-10">
      <div class="flex flex-wrap items-center z-10 ">

        <!--Notifications-->
        <div id="bell" class="inline-flex items-center text-sm font-medium z-10 text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400">
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
          <div class="flex relative ">
            <div class="inline-flex relative z-10 -top-2 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>
          </div>
        </div>
        <Dropdown triggeredBy="#bell" class="w-full max-w-sm rounded divide-y divide-gray-100 z-10 shadow dark:bg-gray-800 dark:divide-gray-700">
          <div slot="header" class="text-center py-2 font-bold z-10">Notifications</div>
          {#key notificationsReceived}
          {#if notificationsReceived}
          {#each notificationsReceived.notifications as notification, id}
          <DropdownItem class="flex space-x-4 z-10">
            <div class="pl-3 w-full">
              <span class="font-semibold text-gray-900 dark:text-white">{notification.title}</span>: {notification.message}</div>

          </DropdownItem>
            {/each}
            {:else}
            <DropdownItem class="flex space-x-4 z-10">
              <div class="pl-3 w-full">
                <span class="font-semibold text-gray-900 dark:text-white">No notifications found...</span></div>
            </DropdownItem>
          {/if}
          {/key}
          <a slot="footer" href="" class="block py-2 -my-1 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
            <div class="inline-flex items-center">
              <svg class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
              View all
            </div>
          </a>
        </Dropdown>

      </div>
    </div>
    <div class="w-full sm:w-auto">
      <div class="relative inline-block text-left z-10">
        <div>
          <Button pill color="light"  id="avatar_with_name" class="!p-1.5 ">
            <Avatar src="{avatarUrl}" alt="{avatarUrl}" class="mr-4"/>
            <div class="mr-3 font-medium">{full_name}</div>
          </Button>
          <Dropdown inline triggeredBy="#avatar_with_name" class="z-10">
            <div slot="header" class="px-4 py-2">
              <span class="block text-sm text-gray-900 dark:text-white "> {full_name} </span>
              <span class="block truncate text-sm font-medium"> {email} </span>
            </div>
            <DropdownItem on:click={() => {goto('/d/profile')}}>Settings</DropdownItem>
            <DropdownItem on:click={signOut} slot="footer">Sign out</DropdownItem>
          </Dropdown>
        </div>
      </div>
    </div>
  </div>
</div>



