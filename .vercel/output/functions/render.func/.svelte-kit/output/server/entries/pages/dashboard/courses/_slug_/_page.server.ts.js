import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import "../../../../../chunks/index2.js";
const load = async (event) => {
  const { session, supabaseClient } = await getSupabase(event);
  if (session) {
    const { data: courseData } = await supabaseClient.from("courses").select("course_image_url, course_title, course_prefix, course_number, course_term").eq("created_by", session.user.id).eq("id", event.params.slug).single();
    return {
      courseData
    };
  }
};
export {
  load
};
