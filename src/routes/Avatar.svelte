<script lang="ts">
    import { uploadAvatar, downloadImage } from "$lib/account";
    let size = 10
    let url: string
    let avatarUrl: string | null = null

    let data: string | null = null
    let uploading = false
    let files: FileList
    let user = $page.data.session.user


    import type { AuthSession } from "@supabase/supabase-js";
    import { page } from "$app/stores";
    export async function getAvatar(){
        avatarUrl = await downloadImage(user)
    }
    getAvatar()
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