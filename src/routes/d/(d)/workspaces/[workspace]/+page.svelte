
<script>
    export let embeddedContent;

</script>

<style>
    .embed-container {
        width: 800px;
        height: 600px;
    }
</style>

<h1>Embedded Website</h1>
{#if embeddedContent}
    <div>{@html embeddedContent}</div>
{:else}
    <p>Loading...</p>
{/if}