<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import {goto, invalidateAll} from '$app/navigation';
    import {PUBLIC_SUPABASE_ID} from "$env/static/public";

    onMount(async () => {
        await goto('/');
    });



    async function fixError() {
        console.log("Fix Error")
        await invalidateAll();
        // Attempt to refresh session through getUser;
        //await $page.data.supabase.auth.getUser();
        // Attempt to refresh session through refreshSession;
        await $page.data.supabase.auth.refreshSession();
        // Sign out, assuming the above make the server session invalid.
        await $page.data.supabase.auth.signOut();
        // Delete cookie on browser TODO THIS CAN CHANGE BASED ON SUPABASE ID
        document.cookie = `sb-${PUBLIC_SUPABASE_ID}-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        // Redirect to auth page

    }
</script>

<div class="text-white text-center h2 text-bold p-8 bg-gray-700">
<h1>An unexpected error occurred...</h1>
<h1>Error Message: {$page.error.message}</h1>
<div class="text-blue-600 hover:text-blue-400 underline cursor-pointer" on:click={async () => { await fixError(); }}>Attempt to fix error</div>
</div>