import { redirect, RequestHandler} from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request, locals: { supabase, getSession }, event }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, '/');
  }

  const user_id = session.user.id;

  // TODO Get user from session
  const { user } = await request.json();
  let avatar_url;
  try {
    const { data, error, status } = await supabase
      .from("users")
      .select(`avatar_url`)
      .eq("id", user_id)
      .single();
    if (error) {
      throw error;
    }
      if (data != null) {
        // Return avatar url
        avatar_url = data.avatar_url
      }
    } catch (error) {
    if (error instanceof Error) {
      console.log("Error downloading image: ", error.message);
    }
  }

  return new Response(avatar_url)
}