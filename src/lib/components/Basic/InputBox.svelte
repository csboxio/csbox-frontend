<script>
    export let data = "";
    export let label = "Title:";
    export let id = "title";
</script>

<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for={id}>
    {label}
</label>
<input
        type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id={id}
        name={id}
        bind:value={data}
/>
