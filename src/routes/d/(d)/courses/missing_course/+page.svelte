<script>
    import { onMount } from 'svelte';

    let countdown = 10;

    /** @type {import('./$types').PageData} */
    export let data;
    let { supabase, claim } = data
    $: ({ supabase, claim } = data)

    onMount(() => {
        const interval = setInterval(() => {
            countdown -= 1;

            if (countdown === 0) {
                clearInterval(interval);
                window.location.href = '/d/courses';
            }
        }, 1000);
    });
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-900 text-white">
    <div class="text-center">
        <h1 class="text-5xl font-bold mb-4">Error</h1>
        <p class="text-2xl mb-6">This course number does not exist.</p>
        {#if claim === 'student'}
        <p class="text-2xl mb-6">If you believe this is an error, please contact your instructor.</p>
        {/if}
        {#if claim === 'instructor'}
            <p class="text-2xl mb-6">This course no longer exists, please relink a new course.</p>
        {/if}
        <p class="text-lg">Redirecting in {countdown} seconds...</p>
    </div>
</div>
