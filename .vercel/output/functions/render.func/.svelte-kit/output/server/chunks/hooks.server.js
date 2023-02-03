import "./supabaseClient.js";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { r as redirect } from "./index.js";
const handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith("/api")) {
    const { session: session2 } = await getSupabase(event);
    if (!session2) {
      throw redirect(303, "/");
    }
  }
  const { session, supabaseClient } = await getSupabase(event);
  event.locals.sb = supabaseClient;
  if (session) {
    const { data: tableData } = await supabaseClient.from("users").select("username, first_name, last_name, website, country, avatar_url").eq("id", session.user.id).single();
    event.locals.user = tableData;
  }
  return resolve(event);
};
export {
  handle
};
