// src/routes/+layout.ts
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
import { goto, invalidateAll } from "$app/navigation";
import { redirect } from "@sveltejs/kit";
import type {Database} from "../../../schema.js";

export const load = async ({ fetch, data, depends, url, parent }) => {
    depends('supabase:auth')
    const parentData = await parent();
    const session = parentData.session
    const supabase = parentData.supabase

    if (session) {
      const response = await fetch('/api/users')
      if (url.searchParams.get('code')) {
        throw redirect(303,  '/')
      }
      return { user: await response.json() , supabase, session }
    }

    return { session, url }
}