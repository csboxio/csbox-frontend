<!-- App.svelte -->
<script>
    import { blur } from 'svelte/transition';

    let isExpanded = false;
    let isTabVisible = false;

    function toggleExpansion() {
        isExpanded = !isExpanded;
    }

    function handleMouseEnter(event) {
        const windowHeight = window.innerHeight;
        const mousePosY = event.clientY;
        const topThirdThreshold = windowHeight / 3;

        isTabVisible = mousePosY < topThirdThreshold;
        console.log(mousePosY, topThirdThreshold)
    }

    function handleMouseLeave() {
        isTabVisible = false;
    }
</script>

<style>
    .tab {
        @apply fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-500 rounded-full w-8 h-8 flex justify-center items-center text-white cursor-pointer;
        @apply transition-all duration-300;
    }

    .expanded {
        @apply w-24 h-8 top-2; /* Adjust the size and positioning for the expanded state */
        @apply bg-gray-500; /* Add background color for the expanded state */
    }

    .arrow {
        @apply border-t-3 border-white w-3 h-2.5 transform transition-transform duration-300;
    }

    .arrow-expanded {
        @apply rotate-180;
    }

    .content-container {
        @apply absolute top-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center;
    }

    .content {
        @apply bg-gray-500 text-white text-center mt-2 p-2 rounded;
    }

    .tab-container {
        /* Set the container height to 1/3 of the screen */
        height: calc(100vh / 3);
    }
</style>
<body class="h-screen">
<div class="relative tab-container" on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
    {#if isTabVisible}
        <div
                class={`tab ${isExpanded ? "expanded" : ""}`}
                on:click={toggleExpansion} transition:blur
        >
            <div class={`arrow ${isExpanded ? "arrow-expanded" : ""}`}></div>
        </div>
    {/if}
    {#if isExpanded && isTabVisible}
        <div class="content-container" transition:blur>
            <div class="content">
                <p>Workspace Name</p>
                <div class="mt-2">
                    <button class="bg-blue-500 text-white px-2 py-1 rounded mr-2">Button 1</button>
                    <button class="bg-blue-500 text-white px-2 py-1 rounded">Button 2</button>
                </div>
            </div>
        </div>
    {/if}
</div>
</body>