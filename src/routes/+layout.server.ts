import type { LayoutServerLoad } from "./$types";
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { browser } from "$app/environment";

export const prerender = false;

// @ts-ignore
export const load: LayoutServerLoad = async (event) => {
  if (event.locals.session && !browser) {
    console.time('layout')
    const {data: tableData} = await event.locals.sb.from('users')
      .select('username, first_name, last_name, website, country, avatar_url')
      .eq('id', event.locals.session.user.id)
      .single()
    console.timeEnd('layout')
    return {
      session: event.locals.session,
      user: {
        userData: tableData,
      },
    };
  }
}