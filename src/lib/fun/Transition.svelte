<script lang="ts">
    import { fly, blur } from 'svelte/transition'

    export let url: URL
</script>

{#key url}
    <div in:blur|local={{ y: -50, duration: 250}}>
        <slot/>
    </div>
{/key}