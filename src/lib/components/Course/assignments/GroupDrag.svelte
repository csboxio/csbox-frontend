<script>
    import {flip} from "svelte/animate";
    import {dndzone, overrideItemIdKeyNameBeforeInitialisingDndZones, setDebugMode} from "svelte-dnd-action";

    export let assignments

    const flipDurationMs = 300;


</script>

<section use:dndzone="{{items: assignments, flipDurationMs}}" on:finalize="{handleDrop}" on:consider="{handleConsider}">
    <slot></slot>
</section>

