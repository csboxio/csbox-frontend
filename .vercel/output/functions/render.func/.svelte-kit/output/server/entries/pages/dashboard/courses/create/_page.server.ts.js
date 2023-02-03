import { getSupabase } from "@supabase/auth-helpers-sveltekit";
const actions = {
  createCourse: async (event) => {
    const { request } = event;
    const { supabaseClient } = await getSupabase(event);
    const { data } = await supabaseClient.auth.refreshSession();
    const { session, user } = data;
    const formData = await request.formData();
    const title = formData.get("course_title");
    const prefix = formData.get("course_prefix");
    const number = formData.get("course_number");
    const term = formData.get("course_term");
    if (user != null) {
      const updates = {
        id: Math.floor(Math.random() * 9999999999),
        inserted_at: new Date(),
        created_by: user.id,
        course_title: title,
        course_prefix: prefix,
        course_number: number,
        course_term: term
      };
      const { error: error2 } = await supabaseClient.from("courses").insert(updates);
      if (!error2) {
        return { success: true, course_id: updates.id };
      }
    }
  }
};
export {
  actions
};
