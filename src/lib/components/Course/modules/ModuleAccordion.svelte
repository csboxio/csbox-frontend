<script lang="ts">

    import {invalidateAll} from "$app/navigation";


    import {createEventDispatcher, getContext} from 'svelte';

    import {slide} from "svelte/transition";
    import Fa from 'svelte-fa/src/fa.svelte';
    import {
        faAngleDown,
        faArrowDown,
        faCheckCircle,
        faCircle,
        faCircleXmark,
        faGear, faPlus
    } from "@fortawesome/free-solid-svg-icons";
    import {backOut, circOut, cubicOut, quintOut} from "svelte/easing";

    export let id;
    export let title;
    export let points = "";
    export let claim
    export let published;
    export let addModuleModel;
    export let addAssignmentModel
    export let item_id

    export let module_id;

    let isHovered = false;

    let isFocused = false;


    let isOpen = false;

    function toggleOpen() {
        isOpen = !isOpen
    }

    const dispatch = createEventDispatcher();


    function addItem(id){
        console.log('here', addAssignmentModel, item_id)
        addAssignmentModel = true
        item_id = id;
        dispatch('addItem', item_id)
    }

    async function publishModule() {
        published = !published
      const url = new URL('/api/modules/publish/', window.location.origin);
      url.searchParams.append('module_id', module_id);
      const response = await fetch(url);
      const { res, error, status } = await response.json();
        console.log(published)
      await invalidateAll();
    }

    async function unpublishModule() {
        published = !published
        const url = new URL('/api/modules/unpublish/', window.location.origin);
        url.searchParams.append('module_id', module_id);
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
             class:scale-y-[-1]={isOpen}
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

        {#if claim !== 'student'}
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
        <div class="
            w-8
            transform
            transition
            text-gray-300"
             class:text-green-500={published}
             class:text-blue-400={isHovered || isFocused}>
            {#if !published}
                <div class="hover:text-white" on:click|stopPropagation={async () => { await publishModule() }}>
                    <Fa icon={faCircleXmark}></Fa>
                </div>
                {:else}
                <div class="hover:text-white" on:click|stopPropagation={async () => await unpublishModule()}>
                    <Fa icon={faCheckCircle}></Fa>
                </div>
            {/if}

        </div>
        {/key}
        {/if}

    </button>

    {#if isOpen}
        <div class=""
             transition:slide|local={{duration: 250, easing: cubicOut}}>
            <slot/>
        </div>
    {/if}
</div>