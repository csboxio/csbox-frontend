import type { LayoutServerData } from './$types';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type {Session} from "@supabase/supabase-js";

import type { LayoutServerLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async (event) => {
    const { session } = await getSupabase(event)
    return { session }
}