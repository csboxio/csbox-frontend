// src/routes/+layout.js
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'

export const load = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const supabase = createSupabaseLoadClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data.session,
  })

  const { data: { session }, } = await supabase.auth.getSession()

  const response = await fetch('/api/users')


  //const response = await fetch('/api/users')

  return { user: { userData: await response.json() }, supabase, session }

}



/*/
if (session) {
  const response = await fetch('/api/users')
  return {
    user: {
      userData: await response.json()
    },
    session: session
  };
}*/