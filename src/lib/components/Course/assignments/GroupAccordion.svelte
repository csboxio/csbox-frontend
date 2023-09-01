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
    import {Dropdown, DropdownItem} from "flowbite-svelte";

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
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
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