import type { LayoutServerLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { applyAction, deserialize } from "$app/forms";
import { invalidateAll } from "$app/navigation";
import { json } from "@sveltejs/kit";
import type { Session } from '@supabase/supabase-js';
import { browser } from "$app/environment";

export const prerender = "auto";

// @ts-ignore
export const load: LayoutServerLoad = async (event) => {
  const { session, supabaseClient } = await getSupabase(event);
  if (session) {
    return {
      session,
      user: {
        userData: await getUser(session)
      },
    }
  }
}

  async function getUser(session: Session) {
  if(browser) {
    const response = await fetch('api/profile', {
      method: 'GET',
      body: session.user.id,
      headers: {
        'x-sveltekit-action': 'true',
        'cache-control': 'max-age=300'
      }
    });
    return json(response)
  }
  }
