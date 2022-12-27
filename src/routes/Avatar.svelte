<script lang="ts">
    import { uploadAvatar } from "$lib/account";
    import { page } from "$app/stores";
    import { browser } from "$app/environment";
    import { supabaseClient } from "$lib/supabaseClient";
    import { onMount } from "svelte";

    let size = 10
    let url: string
    let avatarUrl: string
    let data: string | null = null
    let uploading = false
    let files: FileList
    let user = $page.data.session.user

    async function downloadAvatar(avatar_url) {

        const { data } = await supabaseClient.storage.from('avatars').download(avatar_url)
        // Check if null
        if (data == null) {
            return
        }
        // Get object URL
        avatarUrl = URL.createObjectURL(data)
    }

    async function getAvatar() {
        const res = await fetch(`/api/avatar`, {
            method: 'POST',
            body: JSON.stringify({ user }),
            headers: {
                'content-type': 'application/json'
            }
        });
        return await res.text()
    }
    let promise;
    async function handleAvatar() {
        if (browser == true) {
            promise = await getAvatar();
            console.log(promise)
            downloadAvatar(promise)
        }
    }
    onMount(async () => {
    handleAvatar()
    });
</script>

<div>
    {#if avatarUrl}
        <img
          src={avatarUrl}
          alt={avatarUrl ? 'Avatar' : 'No image'}
          class="avatar image"
          style="height: {size}em; width: {size}em;"
        />
    {:else}
        <div class="avatar no-image" style="height: {size}em; width: {size}em;"></div>
    {/if}

    <div style="width: {size}em;">
        <label class="button primary block" for="single">
            {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          style="visibility: hidden; position:absolute;"
          type="file"
          id="single"
          accept="image/*"
          bind:files
          on:change={uploadAvatar(files, uploading, url, user)}
          disabled={uploading}
        />
    </div>
</div>