<script lang="ts">
    import { onMount } from 'svelte'
    import { supabaseClient } from '$lib/utilities/supabaseClient'
    import Avatar from './Avatar.svelte'
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    export let session;
    let loading = false;
    let username = $page.data.user.userData.username;
    let first_name = $page.data.user.userData.first_name;
    let website = $page.data.user.userData.website;
    let avatarUrl = $page.data.user.userData.avatar_url;

    async function signOut() {
        try {
            loading = true
            let { error } = await supabaseClient.auth.signOut()
            if (error) throw error
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            loading = false
        }
    }

</script>

<form method="POST" action="?/updateProfile">
    <Avatar bind:url={avatarUrl} size={10}/>
    <div>
        <label for="email">Email</label>
        <input name="email" id="email" type="text" value={session.user.email} disabled />
    </div>
    <div>
        <label for="name">Full Name</label>
        <input name="name" id="name" type="text" bind:value={first_name} />
    </div>
    <div>
        <label for="website">Website</label>
        <input name="website" id="website" type="text" bind:value={website} />
    </div>
    <div>
        <input
                type="submit"
                class="button block primary"
                value={loading ? 'Loading...' : 'Update'}
                disabled={loading}
        />
    </div>
</form>
<div>
    <button class="button block" on:click={signOut} disabled={loading}> Sign Out </button>
</div>
<div>
    <button class="button block" on:click|preventDefault={() => goto('/dashboard')}> Dashboard </button>
</div>