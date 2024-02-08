<script lang="ts">
    import {goto, invalidate, invalidateAll} from "$app/navigation";
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

            if (event === 'INITIAL_SESSION') {
                console.log('initial session')
            } else if (event === 'SIGNED_IN') {
                console.log('signed in')
            } else if (event === 'SIGNED_OUT') {
                // NEVER DO THIS supabase.auth.signOut()
                console.log('signed out')
            } else if (event === 'PASSWORD_RECOVERY') {
                console.log('password recovery')
            } else if (event === 'TOKEN_REFRESHED') {
                console.log('token refreshed')
            } else if (event === 'USER_UPDATED') {
                console.log('user updated')
            }

            // TODO testing without this invalidateAll();

            invalidate('supabase:auth')

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