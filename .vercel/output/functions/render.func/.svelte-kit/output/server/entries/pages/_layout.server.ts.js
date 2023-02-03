import { getSupabase } from "@supabase/auth-helpers-sveltekit";
const load = async (event) => {
  const { session, supabaseClient } = await getSupabase(event);
  if (session) {
    return {
      session,
      user: {
        userData: event.locals.user
      }
    };
  }
};
export {
  load
};
