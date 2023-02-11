import type { LayoutData } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

// @ts-ignore
export const load: LayoutData = async (event) => {
  const { session, supabaseClient } = await getSupabase(event);
  if (session) {

    const { data: courseData, error } = await supabaseClient.from('courses')
      .select('id, course_image_url, course_title, course_prefix, course_number, course_term')
      .eq('created_by', session.user.id);

    return {
      courses: {
        courseData: courseData
      },
    };
  }
}