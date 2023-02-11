<script lang="ts">
    import { page } from '$app/stores'
    import Account from '$lib/components/Account.svelte'
    import Auth from '$lib/components/Auth.svelte'

</script>
<h1>Welcome {$page.data.user.userData.first_name}</h1>
<h1>Welcome {console.log($page.data.user.courseData)}</h1>
{#if !$page.data.session}
    <Auth />
{:else}
    <h1>Welcome {$page.data.session.user.email}</h1>
    <p>Edit account</p>

    <Account session={$page.data.session} />

{/if}