import { e as error, r as redirect } from "../../chunks/index.js";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
const load = async ({ locals }) => {
  const { data, error: err } = await locals.sb.auth.getSession();
  if (err) {
    throw error(500, err?.message);
  }
};
const actions = {
  signin: async (event) => {
    const { request, cookies, url } = event;
    const { session, supabaseClient } = await getSupabase(event);
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    await supabaseClient.auth.signInWithPassword({
      email,
      password
    });
    throw redirect(303, "/");
  },
  updateProfile: async (event) => {
    const { request, cookies, url } = event;
    const { supabaseClient } = await getSupabase(event);
    const formData = await request.formData();
    const { data } = await supabaseClient.auth.refreshSession();
    const { session, user } = data;
    const fullName = formData.get("name");
    const website = formData.get("website");
    const updates = {
      // @ts-ignore
      id: user.id,
      full_name: fullName,
      website,
      updated_at: new Date()
    };
    await supabaseClient.from("users").upsert(updates);
    throw redirect(303, "/");
  }
};
export {
  actions,
  load
};
