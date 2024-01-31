<script lang="ts">
    import {goto, invalidateAll} from "$app/navigation";
    import {onMount} from "svelte";
    import '../app.css';
    import {browser} from "$app/environment";

    export let data

    let {supabase, session, user} = data
    $: ({supabase, session, user} = data)

    onMount(() => {
        // Auth state change, invalidate everything.
        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((event, session) => {
            invalidateAll()
        })
        return () => subscription.unsubscribe()
    });

    // Code in url.
    if (browser) {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code')
        if (code) {
            goto('/auth')
        }
    }
</script>

<svelte:head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport"/>
</svelte:head>

<slot/>

