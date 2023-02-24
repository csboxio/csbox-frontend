<script lang="ts">
    import {page} from '$app/stores'
    import Account from '$lib/components/Account.svelte'
    import Auth from '$lib/components/Auth.svelte'

    let loading = false;
</script>


{#if !$page.data.session}
    <Auth/>
{:else}
    <h1>Welcome {$page.data.session.user.email}</h1>
    <p>Edit account</p>

    <Account session={$page.data.session}/>
{/if}