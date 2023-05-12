import type {PageServerLoadEvent} from "./$types"
import {getSupabase} from '@supabase/auth-helpers-sveltekit'

export const prerender = false;
// @ts-ignore
export const load: PageServerLoadEvent = async (event) => {
    const {session, supabaseClient} = await getSupabase(event);
    if (session) {
        const {data: courseData, error} = await supabaseClient.from('courses')
            .select('course_image_url, course_title, course_prefix, course_number, course_term')
            .eq('created_by', session.user.id)
            .eq('id', event.params.slug)

        const {data: enrollmentData} = await supabaseClient.from('enrollment')
          .select('user_id,  course_id, enrolled, enrollment_date')
          .eq('course_id', event.params.slug)

        console.log(enrollmentData)
        return {
            courseData,
            enrollmentData
        };
    }
};