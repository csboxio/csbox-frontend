<script>
    import {onMount} from "svelte";

    let error = null;

    onMount(() => {
        window.addEventListener('error', handleGlobalError);
        window.addEventListener('unhandledrejection', handleGlobalError);
    });

    function handleGlobalError(event) {
        event.preventDefault();
        error = event.error;
    }
</script>


<div>
    {#if error}
        <h2>Error occured:</h2>
        <pre>{error.message}</pre>
        {:else }
        <slot></slot>
    {/if}
</div>