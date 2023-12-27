import { json, RequestHandler } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request, url, locals: { supabase, getSession }, event }) => {
  // Get path url from database
  // TODO server side user check this is insecure
  const { user } = await request.json();
  let avatar_url;
  try {
    const { data, error, status } = await supabase
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