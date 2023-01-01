<script lang="ts">
    import { page } from '$app/stores'
    import { supabaseClient } from '$lib/supabaseClient'
    import { invalidate } from '$app/navigation'
    import { onMount } from 'svelte'
    import '../app.css'

    onMount(() => {
        const {
            data: { subscription }
        } = supabaseClient.auth.onAuthStateChange(() => {
            invalidate('supabase:auth')
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