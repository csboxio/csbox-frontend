import { r as redirect } from "../../../../chunks/index.js";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
const actions = {
  updateProfile: async (event) => {
    const { request } = event;
    const { supabaseClient } = await getSupabase(event);
    const formData = await request.formData();
    const { data } = await supabaseClient.auth.refreshSession();
    const { session, user } = data;
    const fullName = formData.get("first");
    const lastName = formData.get("last_name");
    const website = formData.get("website");
    const updates = {
      // @ts-ignore
      id: user.id,
      first_name: fullName,
      last_name: lastName,
      website,
      updated_at: new Date()
    };
    await supabaseClient.from("users").upsert(updates);
    throw redirect(303, "/dashboard/profile");
  }
};
export {
  actions
};
