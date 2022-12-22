<script lang="ts">
    import { supabaseClient } from '$lib/supabaseClient'
    import { page } from '$app/stores'
    import Account from './Account.svelte'
    import Auth from './Auth.svelte'

</script>


{#if !$page.data.session}
    <Auth />
{:else}
    <h1>Welcome {$page.data.session.user.email}</h1>
    <p>I am logged in!</p>

    <Account session={$page.data.session} />
{/if}