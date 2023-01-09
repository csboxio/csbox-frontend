import { supabaseClient } from "$lib/supabaseClient";
import { json } from "@sveltejs/kit";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";

/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export async function POST({ request }) {
  // Get path url from database
  // TODO server side user check this is insecure
  const { user } = await request.json();
  let avatar_url;
  try {
    const { data, error, status } = await supabaseClient
      .from("users")
      .select(`avatar_url`)
      // @ts-ignore
      .eq("id", user.id)
      .single();
    if (error) {
      throw error;
    }
    if (data != null) {
      // Return avatar url
      // @ts-ignore
      avatar_url = data.avatar_url;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error downloading image: ", error.message);
    }
  }

  return new Response(avatar_url)
}