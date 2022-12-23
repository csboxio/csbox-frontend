import type { RequestEvent, ServerLoadEvent, LoadEvent } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load: LayoutServerLoad = async (event) => {
  const { session } = await getSupabase(event);
  return { session };
};