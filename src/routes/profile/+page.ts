import type { PageLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutLoad} */
// @ts-ignore
export async function load({ parent }) {
  const parentData = await parent();
  return {
    user: parentData.user.userData
  }
}