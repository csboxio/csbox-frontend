<script>
    import { supabaseClient } from '$lib/supabaseClient'
    import { page } from '$app/stores'
    import Account from './Account.svelte'
    import Auth from './Auth.svelte'

    let loadedData = []
    async function loadData() {
        const { data } = await supabaseClient.from('test').select('*').limit(20)
        loadedData = data
    }

    $: if ($page.data.session) {
        loadData()
    }
</script>

<svelte:head>
    <title>Supabase + SvelteKit</title>
    <meta name="description" content="SvelteKit using supabase-js v2" />
</svelte:head>

{#if $page.data.session}
    <p>client-side data fetching with RLS</p>
    <pre>{JSON.stringify(loadedData, null, 2)}</pre>
{/if}

{#if !$page.data.session}
    <h1>I am not logged in</h1>

    <Auth />
{:else}
    <h1>Welcome {$page.data.session.user.email}</h1>
    <p>I am logged in!</p>

    <Account session={$page.data.session} />
{/if}