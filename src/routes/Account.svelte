<script lang="ts">
    import { onMount } from 'svelte'
    import type { AuthSession } from '@supabase/supabase-js'
    import { supabaseClient } from '$lib/supabaseClient'
    import Avatar from './Avatar.svelte'
    import { goto } from "$app/navigation";

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
                .select('username, first_name, last_name, website, country, avatar_url')
                .eq('id', user.id)
                .single()

            if (data) {
                username = data.username
                fullName = data.first_name
                website = data.website
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
        <input name="name" id="name" type="text" bind:value={fullName} />
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