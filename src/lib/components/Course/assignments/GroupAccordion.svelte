<script lang="ts">

    import {invalidateAll} from "$app/navigation";


    import {createEventDispatcher, getContext} from 'svelte';

    import {slide} from "svelte/transition";
    import Fa from 'svelte-fa/src/fa.svelte';
    import {
        faAngleDown,
        faArrowDown,
        faCheckCircle,
        faCircle, faCircleChevronDown,
        faCircleXmark, faEllipsisVertical,
        faGear, faPlus
    } from "@fortawesome/free-solid-svg-icons";
    import {backOut, circOut, cubicOut, quintOut} from "svelte/easing";
    import {writable} from "svelte/store";
    import {Dropdown, DropdownItem, Modal} from "flowbite-svelte";
    import {page} from "$app/stores";
    import {addNotification} from "../../../utilities/notifications.js";

    export let id;
    export let title;
    export let subtitle;
    export let points = "";
    export let claim
    export let published;
    export let addModuleModel;
    export let addAssignmentModel
    export let item_id

    export let group_id;

    let isHovered = false;

    let isFocused = false;


    let isOpen = localStorage.getItem(id + 'group_accordion') === 'true' || false;
    const isOpenStore = writable(isOpen);


    isOpenStore.subscribe(value => {
        localStorage.setItem(id + 'group_accordion', value.toString());
    });

    function toggleOpen() {
        isOpenStore.update(isOpen => !isOpen);
    }

    const dispatch = createEventDispatcher();


    function addItem(id){
        console.log('here', addAssignmentModel, item_id)
        addAssignmentModel = true
        item_id = id;
        dispatch('addItem', item_id)
    }

    async function publishGroup() {
        published = !published
      const url = new URL('/api/groups/publish/', window.location.origin);
      url.searchParams.append('group_id', group_id);
      const response = await fetch(url);
      const { res, error, status } = await response.json();
        console.log(published)
      await invalidateAll();
    }

    async function unpublishGroup() {
        published = !published
        const url = new URL('/api/groups/unpublish/', window.location.origin);
        url.searchParams.append('group_id', group_id);
        const response = await fetch(url);
        const { res, error, status } = await response.json();

        await invalidateAll();
    }

    let removeGroup = false;

    function deleteGroupOpen() {
        removeGroup = true;
    }

    function deleteGroupClose() {
        removeGroup = false;
    }

    async function handleDeleteGroup() {
        const {error, status} = await $page.data.supabase.from('groups').delete().match({id: group_id});
        console.log(status)
        if (status === 204) {
            const newNotification =
                {
                    title: "Success! 🥳",
                    message: `Deleted Group!`
                };
            addNotification(newNotification, $page.data.supabase, $page.data.session.user)
            deleteGroupClose();
            await invalidateAll();
        }
    }

    let editGroup = false;
    function editGroupOpen() {
        editGroup = true;
    }

    function editGroupClose() {
        editGroup = false;
    }

    async function handleEditGroup() {
        const {error, status} = await $page.data.supabase.from('groups').update({group_title: editGroupTitle}).eq('id', group_id);
        console.log(error, status)
        if (status === 204) {
            editGroupClose();
            await invalidateAll();
        }
        else {
            alert("Failed")
        }
    }

    let editGroupTitle;
    $: editGroupTitle = title;

</script>


<div class=" border-gray-500  border-2 rounded-xl"
            class:bg-gray-700={!isHovered}
            class:bg-gray-600={isHovered}>

    <button
            on:click={toggleOpen}
            on:mouseenter={() => isHovered = true}
            on:mouseleave={() => isHovered = false}
            on:focus={() => isFocused = true}
            on:blur={() => isFocused = false}
            class="flex text-left w-full focus:outline-none items-center p-4">

        <div class="
            w-8
            transform
            transition
            text-gray-300"
             class:scale-y-[-1]={$isOpenStore}
             class:text-blue-400={isHovered || isFocused}>
            <Fa icon={faAngleDown}></Fa>
        </div>

        <div class="w-full">
            <div class="
                font-semibold
                text-sm
                transition
                text-white"
                 class:text-blue-400={isHovered || isFocused}>

                <span class="
                    border-b-2
                    inline-block
                    border-transparent
                    transition
                    text-lg"
                      class:border-opacity-50={isFocused}
                      class:border-blue-300={isFocused}>
                    {title}
                </span>


            </div>


        </div>

        {#if claim === 'instructor'}
        <div class="
            w-8
            transform
            transition
            text-gray-300
        "
             class:text-blue-400={isHovered || isFocused}>
            <div class="hover:text-white" on:click|stopPropagation={() => {addItem(id)}}>
                <Fa icon={faPlus}></Fa>
            </div>
        </div>


        {#key published}
            <!-- It's the transform -->
        <div class="
            w-8
            transition
            text-gray-300"
             class:text-green-500={published}
             class:text-blue-400={isHovered || isFocused}>
            {#if !published}
                <div class="hover:text-white" title="Not published" on:click|stopPropagation={async () => { await publishGroup() }}>
                    <Fa icon={faCircleXmark}></Fa>
                </div>
                {:else}
                <div class="hover:text-white" title="Published" on:click|stopPropagation={async () => await unpublishGroup()}>
                    <Fa icon={faCheckCircle}></Fa>
                </div>
            {/if}
        </div>
        {/key}
            {#if claim === 'instructor'}
                <button on:click|stopPropagation class="pl-1 text-gray-300 hover:text-white px-4 text-center justify-center">
                <div class="text-center justify-center"><Fa icon={faEllipsisVertical}></Fa></div>
                </button>
                <Dropdown containerClass="absolute z-50 top-8 right-0">
                    <DropdownItem on:click={() => { editGroupOpen()}}>Edit</DropdownItem>
                    <DropdownItem on:click={() => { deleteGroupOpen() }}>Delete</DropdownItem>
                </Dropdown>
            {/if}
        {/if}

    </button>

    {#if $isOpenStore}
        <div class=""
             transition:slide|local={{duration: 250, easing: cubicOut}}>
            <slot/>
        </div>
    {/if}
</div>

<Modal title="Remove group" class="max-w-xs" bind:open={removeGroup}>
    <p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete {title}? </p>
    All group will be deleted, only.
    <div class="flex justify-center items-center space-x-4">
        <button on:click={() => removeGroup = false} data-modal-toggle="deleteModal" type="button" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            No, cancel
        </button>
        <button on:click={() => handleDeleteGroup(group_id)} type="submit" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
            Yes, I'm sure
        </button>
    </div>
</Modal>

<Modal title="Edit group" class="max-w-xs" bind:open={editGroup}>
    <!-- Modal body -->
    <form method="POST" action="?/createGroup" on:submit|preventDefault={handleEditGroup}>
        <div class="grid gap-4 mb-4 sm:grid-cols-1">
            <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
                <input
                        type="text"
                        name="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Group Name"
                        required
                        bind:value={editGroupTitle}
                />
            </div>
        </div>

        <button type="submit" class="text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full
         text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:border-gray-700">Submit</button>


    </form>
</Modal>
