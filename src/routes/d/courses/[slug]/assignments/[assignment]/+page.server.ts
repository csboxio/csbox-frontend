import type {Actions, PageServerLoadEvent} from "./$types";
import {getSupabase} from '@supabase/auth-helpers-sveltekit'

export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const load: PageServerLoadEvent = async (event) => {
    const {session, supabaseClient} = await getSupabase(event);
    if (session) {
        const {data: courseData} = await supabaseClient.from('courses')
            .select('course_image_url, course_title, course_prefix, course_number, course_term')
            .eq('created_by', session.user.id)
            .eq('id', event.params.slug)
            .single();

        const {data: assignmentData} = await supabaseClient.from('assignments')
            .select('id, inserted_at, assignment_title, category, description')
            .eq('course_id', event.params.slug)
            .eq('id', event.params.assignment)
            .single()

        return {
            courseData,
            assignmentData
        };
    }
};
