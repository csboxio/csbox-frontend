<script lang="ts">
  import {page} from "$app/stores";
  import {goto, invalidateAll} from "$app/navigation";
  import {Button, Dropdown, DropdownItem, DropdownDivider, DropdownHeader, Chevron, Avatar} from 'flowbite-svelte'
  import {notifications} from "$lib/utilities/notifications.js";
  import {afterUpdate, onMount} from "svelte";
  import {browser} from "$app/environment";
  import { fade, slide } from 'svelte/transition'

  export let showTopRightMenuModel = false
  export function handleToggleMenuTopRight(s) {
    showTopRightMenuModel = s == "inside" && !showTopRightMenuModel;
  }


  export let supabase

  let notificationsReceived
  $: notificationsReceived;

  let notifications_open = false;

  async function signOut() {
    try {
      let { error } = await  $page.data.supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
    await invalidateAll();
    await goto('/')
  }

  async function getNotifications() {
    const response = await fetch('/api/users/notifications');
    if (response.ok) {
      return await response.json()
    }
  }

  async function deleteNotification(notifications, pos, event) {

    console.log(notifications, pos)

    if (pos >= 0 && pos < notifications.notifications.length) {
      notifications.notifications.splice(pos, 1)
    }

    console.log(notifications, pos)

    //console.log(notifications)
    const { data, error } = await supabase
            .from("notifications")
            .update({ 'all_notifications': notifications})
            .eq('user_id', $page.data.session.user.id)
    console.log(data, error)

    fetchNotifications();
  }

  export let user;
  $: user


  onMount(async () => {

    const storedNotifications = localStorage.getItem('storedNotifications');

    if(storedNotifications != 'undefined') {
      notificationsReceived = JSON.parse(storedNotifications);
      fetchNotifications();
    }
    else {
      console.log('here')
      fetchNotifications();
    }

   //notificationsReceived = await getNotifications()
    //notificationsReceived = notificationsReceived.new
    //console.log(notificationsReceived)
  });

  afterUpdate(() => {
    localStorage.setItem('storedNotifications', JSON.stringify(notificationsReceived))
  })

  function fetchNotifications() {
    getNotifications()
            .then((notifications) => {
              notificationsReceived = notifications;
              localStorage.setItem('storedNotifications', JSON.stringify(notificationsReceived))
            })
            .catch((error) => {
              console.log('Error notifications: ', error)
            })
  }

</script>

<div class="w-full lg:w-auto px-2">
  <div class="flex sm:flex items-center ">
    <div class="mr-4 z-20">
      <div class="flex flex-wrap items-center z-20 ">

        <!--Notifications-->
        <div id="bell" class=" inline-flex items-center text-sm font-medium z-20 text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400">
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
          <div class="flex relative ">
            <div class="inline-flex relative z-10 -top-2 right-3 w-3 h-3 bg-red-500 animate-pulse rounded-full border-2 border-white dark:border-gray-900"></div>
          </div>
        </div>

        <Dropdown triggeredBy="#bell" class="w-full max-w-sm rounded divide-y divide-gray-100 z-20 shadow dark:bg-gray-800 dark:divide-gray-700" >
          <div slot="header" class="text-center py-2 font-bold z-10">Notifications</div>

          {#if notificationsReceived !== undefined && notificationsReceived.all_notifications != null && JSON.stringify(notificationsReceived) !== JSON.stringify([])}
          {#each notificationsReceived.all_notifications.notifications as notification, id}
          <DropdownItem class="flex space-x-4 z-20" >
            <div class="pl-3 w-full" transition:slide|local>
              <span class="font-semibold text-gray-900 dark:text-white" transition:slide|local>{notification.title}</span>: {notification.message}</div>
            <div class="text-gray-300 hover:text-gray-100 hover:scale-110 cursor-pointer">
            <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    on:click|stopPropagation={() => { deleteNotification(notificationsReceived.all_notifications, id) }}
            >
              <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
              />
            </svg>
            </div>

          </DropdownItem>
            {/each}
            {:else}
            <DropdownItem class="flex space-x-4 z-20">
              <div class="pl-3 w-full">
                <span class="font-semibold text-gray-900 dark:text-white">No notifications found...</span></div>
            </DropdownItem>
          {/if}

          <a slot="footer" class="block py-2 z-20 -my-1 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
            <div class="inline-flex items-center">
              <svg class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
              View all
            </div>
          </a>
        </Dropdown>

      </div>
    </div>
    <div class="w-full w-auto">
      <div class="relative inline-block text-left z-20 ">
        <div>
          {#key user}
              <Button pill color="light"  id="avatar_with_name" class=" !p-1.5 ">
                <Avatar src="{user?.avatar_url === 'null?t=undefined' ? '' : user?.avatar_url}" alt="" class=" "/>
                <!-- Smaller than sm hide name -->
                <div class="hidden sm:block">
                <div class="ml-3 mr-3 font-medium text-nowrap ">{user?.first_name == null ? '' : user?.first_name} {user?.last_name == null ? '' : user?.last_name}</div>
                </div>
              </Button>
              <Dropdown inline triggeredBy="#avatar_with_name" class="z-20">
                <div slot="header" class="px-4 py-2">
                  <span class="block text-sm text-gray-900 dark:text-white "> {user?.first_name == null ? '' : user?.first_name} {user?.last_name == null ? '' : user?.last_name} </span>
                  <span class="block truncate text-sm font-medium"> {$page.data.session?.user?.email} </span>
                  <span class="block truncate text-sm font-bold text-blue-500 animate-text bg-gradient-to-r from-blue-500 via-teal-500 to-yellow-500 bg-clip-text text-transparent text-5xl font-black"> {$page.data.session?.user?.app_metadata.userrole.toUpperCase() } </span>
                </div>
                <DropdownItem on:click={() => {goto('/d/profile')}}>Settings</DropdownItem>
                <DropdownItem on:click={signOut} slot="footer">Sign out</DropdownItem>
              </Dropdown>
            {/key}
        </div>
      </div>
    </div>
  </div>
</div>



