import { supabaseClient } from "$lib/utilities/supabaseClient";

/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export async function GET({ request }) {
  // Get path url from database
  // TODO server side user check this is insecure
  const { user } = await request.json();

    const {data: userData} = await supabaseClient.from('users')
      .select('username, first_name, last_name, website, country, avatar_url')
      .eq('id', user.id)
      .single()
    // @ts-ignore
  return new Response(userData)
}