import type { LayoutRouteId,  } from "./$types"
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { applyAction, deserialize } from "$app/forms";
import { invalidateAll } from "$app/navigation";
import type { json, ServerLoadEvent } from "@sveltejs/kit";
import type { Session } from "@supabase/supabase-js";
import { browser } from "$app/environment";

export const prerender = "auto";

// @ts-ignore
export const load: LayoutLoad = async (event) => {
  const { session, supabaseClient } = await getSupabase(event);
    return {
      session,
      user: {
        userData: await getUser(event)
      }
    };
};

async function getUser(event: ServerLoadEvent<{ slug?: string | undefined; }, {}, LayoutRouteId>) {
  if (browser) {
    console.log('browser')
    const response = await event.fetch('api/profile', {
      method: 'GET',
      headers: {
        'x-sveltekit-action': 'true',
        'cache-control': 'max-age=300'
      }
    });
    return new Response(JSON.stringify(response))
  }
}
