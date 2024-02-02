<script>
    export let header;
    export let checked;
</script>


<div class="px-6 flex flex-col justify-end">
    <div class="py-2 text-slate-400 border-b border-slate-800">{header}</div>
</div>
{#each checked as checked, i}
    {#if checked === true}
        <div class="px-6 flex flex-col justify-end {i === 0 ? 'border-x border-blue-500' : ''}">
            <div class="{i === 0 ? 'flex items-center h-full border-b border-slate-800' : ''} {i === 0 ? 'text-blue-500' : 'text-slate-400'} py-2">
                <svg class="shrink-0 mr-3 {i === 0 ? 'fill-current' : ''}" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z"></path>
                </svg>
            </div>
        </div>
        {:else}
        <div class="px-6 flex flex-col justify-end ">
            <div class=" py-2">
                <svg class="shrink-0 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                </svg>
            </div>
        </div>
    {/if}
{/each}
