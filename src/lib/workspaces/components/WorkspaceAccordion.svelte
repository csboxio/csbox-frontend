<script lang="ts">
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
    import WorkspaceStatus from "$lib/workspaces/components/WorkspaceStatus.svelte";
    import {formatDistanceToNow, parseISO} from "date-fns";



    export let id;
    export let workspace_name;
    export let inserted_at;
    export let tier;
    export let workspace_state;


    let isHovered = false;

    let isFocused = false;


    let isOpen = localStorage.getItem(id + 'workspace_accordion') === 'true' || false;
    const isOpenStore = writable(isOpen);


    isOpenStore.subscribe(value => {
        localStorage.setItem(id + 'workspace_accordion', value.toString());
    });

    function toggleOpen() {
        isOpenStore.update(isOpen => !isOpen);
    }

    const dispatch = createEventDispatcher();


</script>


<div class="my-2 border-gray-500  border-2 rounded-xl"
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

        <WorkspaceStatus workspace_state={workspace_state}/>

        <div class="grid grid-cols-4 grid-rows-1 gap-4 w-full pl-3">

            <span class="
            border-b-2 inline-block border-transparent font-semibold text-sm transition text-white
            transition text-lg"
                  class:border-opacity-50={isFocused}
                  class:border-blue-300={isFocused}>
                {workspace_name}
            </span>

            <span class="
                    block mt-1 text-xs text-gray-300
                    border-b-2 inline-block border-transparent
                    transition text-lg"
                  class:border-opacity-50={isFocused}
                  class:border-blue-300={isFocused}>
                    {tier}
                </span>

            <span class="
                    block mt-1 text-xs text-gray-300
                    border-b-2 inline-block border-transparent
                    transition text-lg"
                  class:border-opacity-50={isFocused}
                  class:border-blue-300={isFocused}>
                    {formatDistanceToNow(parseISO(inserted_at), {addSuffix: true})}
                </span>
        </div>



        <div class="w-8 transform transition text-gray-300"

                 class:text-blue-400={isHovered || isFocused}>

            </div>


                <!-- It's the transform -->
                <div class="
            w-8
            transition
            text-gray-300"
                     class:text-blue-400={isHovered || isFocused}>

                </div>

                <button on:click|stopPropagation class="pl-1 text-gray-300 hover:text-white px-4 text-center justify-center">
                    <div class="text-center justify-center"><Fa icon={faEllipsisVertical} size="lg"></Fa></div>
                </button>
                <Dropdown containerClass="absolute z-50 top-8 right-0">

                </Dropdown>



    </button>

    {#if $isOpenStore}
        <div class=""
             transition:slide|local={{duration: 250, easing: cubicOut}}>
            <slot/>
        </div>
    {/if}
</div>

