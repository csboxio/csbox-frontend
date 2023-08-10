<script>

    export const ssr = false
    import {getContext} from 'svelte';

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


    export let id;

    export let title;

    export let subTitle = "";

    let isHovered = false;

    let isFocused = false;

    const active = getContext("context");

    $: isCurrentActive = $active === id;

    const onClickHandler = () => {

        if (isCurrentActive) {

            $active = null;
        } else {

            $active = id;
        }
    }
</script>


<div class=" border-gray-500  border-2 rounded-xl"
            class:bg-gray-700={!isHovered}
            class:bg-gray-600={isHovered}>

    <button
            on:click={onClickHandler}
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
             class:scale-y-[-1]={isCurrentActive}
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

        <div class="
            w-8
            transform
            transition
            text-gray-300
        "
             class:text-blue-400={isHovered || isFocused}>
            <Fa icon={faPlus}></Fa>
        </div>


        <div class="
            w-8
            transform
            transition
            text-gray-300
        "
             class:text-green-500={isCurrentActive}
             class:text-blue-400={isHovered || isFocused}>
            {#if !isCurrentActive}
                <Fa icon={faCircleXmark}></Fa>
                {:else}
                <Fa icon={faCheckCircle}></Fa>
            {/if}
        </div>

    </button>

    {#if isCurrentActive}
        <div class="px-4 pb-4 mt-4"
             transition:slide|local>
            <slot/>
        </div>
    {/if}
</div>