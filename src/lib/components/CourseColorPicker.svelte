<script>
    let colors = ['red', 'blue', 'green', 'yellow', 'purple', 'teal', 'pink'];
    export let selectedColor = 'red';

    function selectColor(color) {
        selectedColor = color;
    }
</script>

<div class="flex">
    {#each colors as color}
        <div
                class="w-6 h-6 rounded m-2 cursor-pointer bg-{color}-500"
                on:click={() => selectColor(color)}
                class:selected="{selectedColor === color}"
        ></div>
    {/each}
</div>

<style>
    .selected {
        border: 2px solid #ffffff;
    }
</style>
