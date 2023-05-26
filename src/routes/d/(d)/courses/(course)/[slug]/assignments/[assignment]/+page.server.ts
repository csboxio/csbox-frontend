import type {Actions, PageServerLoadEvent} from "./$types";
import {getSupabase} from '@supabase/auth-helpers-sveltekit'

export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const load: PageServerLoadEvent = async (event) => {
    const {session, supabaseClient} = await getSupabase(event);
    if (session) {

        const {data: assignmentData} = await supabaseClient.from('assignments')
            .select('id, inserted_at, assignment_title, category, description, points, submission_type, submission_attempts, assign_to, due')
            .eq('course_id', event.params.slug)
            .eq('id', event.params.assignment)
            .single()

        return {
            assignmentData
        };
    }
};
