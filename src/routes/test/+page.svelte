<script lang="ts">

  import { onMount } from 'svelte'
  import type { AuthSession } from '@supabase/supabase-js'
  import { supabaseClient } from '$lib/supabaseClient'
  import { PrismaClient } from "@prisma/client";
  import Avatar from '../Avatar.svelte'
  import { error } from "@sveltejs/kit";

  export let session: AuthSession

  let loading = false
  let username: string | null = null
  let full_name: string | null = null
  let avatar_url: string | null = null
  let password: string | null = null
  let website: string | null = null

  const prisma = new PrismaClient()

  async function updateProfile() {
    try {
      loading = true;
      const { user } = session;
      const updates = {
        where: {
          id: user.id,
        },
        create: {
          id: user.id,
          updated_at: new Date(),
          username: username,
          full_name: full_name,
          avatar_url: avatar_url,
          website: website,
        },
        update: {
          id: user.id,
          updated_at: new Date(),
          username: username,
          full_name: full_name,
          avatar_url: avatar_url,
          website: website,
        }
      };
      let { error } = await prisma.profiles.upsert(updates);
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      loading = false;
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

<form class="form-widget" on:submit|preventDefault={updateProfile}>
  <Avatar bind:url={avatar_url} size={10} on:upload={updateProfile} />
  <div>
    <label for="email">Email</label>
    <input id="email" type="text" bind:value={full_name}  />
  </div>
  <div>
    <label for="username">Name</label>
    <input id="username" type="text" bind:value={username} />
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