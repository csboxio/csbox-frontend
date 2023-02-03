import { s as supabaseClient } from "../../../../chunks/supabaseClient.js";
import "../../../../chunks/index.js";
import "@supabase/auth-helpers-sveltekit";
async function POST({ request }) {
  const { user } = await request.json();
  let avatar_url;
  try {
    const { data, error, status } = await supabaseClient.from("users").select(`avatar_url`).eq("id", user.id).single();
    if (error) {
      throw error;
    }
    if (data != null) {
      avatar_url = data.avatar_url;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error downloading image: ", error.message);
    }
  }
  return new Response(avatar_url);
}
export {
  POST
};
