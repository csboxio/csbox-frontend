<script>
export let error
</script>
{#if error}
    <h1 class="text-red-500 font-bold">LTIK INVALID OR EXPIRED, PLEASE RELAUNCH</h1>
    {:else}
    <slot/>
{/if}