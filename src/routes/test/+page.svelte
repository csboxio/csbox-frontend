<script lang="ts">
  import { onMount } from 'svelte'
  import type { AuthSession } from '@supabase/supabase-js'
  import { supabaseClient } from '$lib/supabaseClient'
  import { getSupabase } from "@supabase/auth-helpers-sveltekit";
  import { redirect } from "@sveltejs/kit";
  import Avatar from '../Avatar.svelte'
  import type { ActionData } from './$types';
  import { page } from '$app/stores'

  export let form: ActionData;
  export let session = $page.data.session


  let loading = false
  let username: string | null = null
  let password: string | null = null
  let fullName: string | null = null
  let website: string | null = null
  let avatarUrl: string | null = null

  onMount(() => {
    getProfile()
  })

  async function updateProfile() {
    try {
      loading = true
      const { user } = session

      const updates = {
        id: user.id,
        username: username,
        full_name: fullName,
        website: website,
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

  const getProfile = async () => {
    try {
      loading = true
      const { user } = session

      const { data, error, status } = await supabaseClient
        .from('profiles')
        .select(`username, full_name, avatar_url, website`)
        .eq('id', user.id)
        .single()

      if (data) {
        username = data.username
        fullName = data.full_name
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
  <Avatar bind:url={avatarUrl} size={10} on:upload={updateProfile} />
  <div>
    <label for="email">Email</label>
    <input id="email" type="text" value={$page.data.session.user.email} disabled />
  </div>
  <div>
    <label for="name">Full Name</label>
    <input id="name" type="text" value={form?.values?.full_name ?? ''}/>
  </div>
  <div>
    <label for="website">Website</label>
    <input id="website" type="text" value={form?.values?.website ?? ''}/>
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