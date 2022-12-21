<script lang="ts">
    import { onMount } from 'svelte'
    import type { AuthSession } from '@supabase/supabase-js'
    import { supabaseClient } from '$lib/supabaseClient'
    import Avatar from './Avatar.svelte'

    export let session: AuthSession

    let loading = false
    let username: string | null = null
    let password: string | null = null
    let fullName: string | null = null
    let website: string | null = null
    let avatarUrl: string | null = null

    onMount(() => {
        getProfile()
    })

    const getProfile = async () => {
        try {
            loading = true
            const { user } = session

            const { data, error, status } = await supabaseClient
                .from('profiles')
                .select(`username, full_name, avatar_url`)
                .eq('id', user.id)
                .single()

            if (data) {
                username = data.username
                fullName = data.full_name
                avatarUrl = data.avatar_url
            }

            if (error && status !== 406) throw error
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            loading = false
        }
    }

    async function updateProfile() {
        try {
            loading = true
            const { user } = session

            const updates = {
                id: user.id,
                username,
                fullName,
                website,
                avatar_url: avatarUrl,
                updated_at: new Date()
            }

            let { error } = await supabaseClient.from('profiles').upsert(updates)

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

<form class="form-widget" on:submit|preventDefault={updateProfile}>
    <Avatar bind:url={avatarUrl} size={10} on:upload={updateProfile} />
    <div>
        <label for="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
    </div>
    <div>
        <label for="username">Name</label>
        <input id="username" type="text" bind:value={username} />
    </div>
    <div>
        <label for="website">Website</label>
        <input id="website" type="website" bind:value={website} />
    </div>

    <div>
        <input
                type="submit"
                class="button block primary"
                value={loading ? 'Loading...' : 'Update'}
                disabled={loading}
        />
    </div>

    <div>
        <button class="button block" on:click={signOut} disabled={loading}> Sign Out </button>
    </div>
</form>