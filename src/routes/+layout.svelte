<script lang="ts">
    import { supabaseClient } from '$lib/utilities/supabaseClient'
    import {invalidate, invalidateAll} from '$app/navigation'
    import { onDestroy, onMount } from "svelte";
    import '../app.css'
    import { userStore } from "../lib/stores/stores";
    import { page } from "$app/stores";

    onMount(() => {
        const {
            data: { subscription }
        } = supabaseClient.auth.onAuthStateChange(() => {
            invalidateAll()
        })
        return () => {
            subscription.unsubscribe()
        }
    })

</script>
<svelte:head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>CSBOX</title>
</svelte:head>

<slot />