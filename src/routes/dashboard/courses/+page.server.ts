import type { PageLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
// @ts-ignore
export const load: PageLoad = async (event) => {
  const { session, supabaseClient } = await getSupabase(event);
  if (session) {
    const { data: courseData } = await supabaseClient.from('courses')
      .select('course_image_url, course_title, course_prefix, course_number, course_term')
      .eq('created_by', session.user.id);
    console.log(courseData)
    return {
      courseData
    };
  }
};
