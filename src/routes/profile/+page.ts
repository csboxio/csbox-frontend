import type { PageLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async (event) => {
  const { session, supabaseClient } = await getSupabase(event);
  if (!session) {
    throw redirect(303, '/');
  }
  const { data: userRow } = await supabaseClient.from('profiles')
    .select('username, first_name, last_name, website, country, avatar_url');

  return {
    user: session.user,
    userRow
  };
};