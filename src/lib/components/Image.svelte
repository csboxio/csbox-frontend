{#if loaded}
    <img {src} alt="Document" />
{:else if failed}

{:else if loading}

{/if}

<script>
    import { onMount } from 'svelte'
    export let src;

    let loaded = false;
    let failed = false;
    let loading = false;

    onMount(() => {
        const img = new Image();
        img.src = src;
        loading = true;

        img.onload = () => {
            loading = false;
            loaded = true;
        };
        img.onerror = () => {
            loading = false;
            failed = true;
        };
    })
</script>
