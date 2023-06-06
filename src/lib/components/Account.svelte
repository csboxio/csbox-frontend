<script lang="ts">
    import { onMount } from 'svelte'
    import Avatar from './Avatar.svelte'
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    let loading = false;
    export let session;
    export let supabase;


    let first_name = null
    let website = null
    let avatarUrl = null


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
    <button class="button block" disabled={loading}> Sign Out </button>
</div>
<div>
    <button class="button block" on:click|preventDefault={() => goto('/d')}> Dashboard </button>
</div>