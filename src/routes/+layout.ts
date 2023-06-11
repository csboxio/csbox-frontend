// src/routes/+layout.ts
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
import type { Database } from '../schema.ts'
import { goto, invalidateAll } from "$app/navigation";

export const load = async ({ fetch, data, depends, url }) => {
  depends('supabase:auth')

  const supabase = createSupabaseLoadClient<Database>({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data.session,
  })

  const {
    data: { session, error },
  } = await supabase.auth.getSession()

  if (session) {
    const response = await fetch('/api/users')
    if (url.searchParams.get('code')) {
      goto('/')
    }
    return { user: await response.json() , supabase, session }
  }

  return { supabase, session, url }
}