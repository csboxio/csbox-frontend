import type { LayoutData } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

export const prerender = 'auto';

// @ts-ignore
export const load: LayoutData = async (event) => {
  const { session, supabaseClient } = await getSupabase(event);
  if (session) {
    const {data: tableData} = await supabaseClient.from('users')
      .select('username, first_name, last_name, website, country, avatar_url')
      .eq('id', session.user.id)
      .single()
    return {
      session,
      user: {
        userData: tableData
      },
    };
  }
}