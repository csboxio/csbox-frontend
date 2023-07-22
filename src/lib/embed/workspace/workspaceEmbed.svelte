<!-- src/routes/workspaceEmbed.svelte -->
<script>
    import {onMount} from "svelte";
    import {browser} from "$app/environment";

    export let url = '';
    export let nonce = '';

    let contentContainer;

</script>

<style>
    .embedded-content {
        width: 100%;
        height: 100%;
        border: none;
    }
</style>
{#if browser}
<iframe class="embedded-iframe" src="{url}" ></iframe>
    {/if}