
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { redirect } from "@sveltejs/kit";
import { browser } from "$app/environment";
import { courseStore } from "../../../lib/stores/stores";
export const prerender = false;
//@ts-ignore
export const load: LayoutServerLoad = async ({ locals, event }) => {
  if (!locals.session?.user) {
    throw redirect(303, '/login')
  }
  if (locals.session && !browser) {

    let courses;
    const courseSubscribe = courseStore.subscribe(value => {
      courses = value
    });

    if (!courses) {
      const { data: courseData, error } = await locals.sb.from('courses')
        .select('id, course_image_url, course_title, course_prefix, course_number, course_term')
        .eq('created_by', locals.session.user.id);

      courseStore.set(courseData);
    }

    return {
      courses: {
        courseData: courses
      },
    };
  }
}