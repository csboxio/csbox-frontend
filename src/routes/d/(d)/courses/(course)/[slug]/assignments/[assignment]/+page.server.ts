import type {Actions, PageServerLoadEvent} from "./$types";
import {getSupabase} from '@supabase/auth-helpers-sveltekit'

export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const load: PageServerLoadEvent = async (event) => {
    const {session, supabaseClient} = await getSupabase(event);
    if (session) {

        const {data: assignmentDataInfo, error} = await supabaseClient.from('assignments_info')
            .select('description, submission_type,' +
              ' submission_attempts, display_as, available_start, available_end,' +
              ' inserted_at, assign_to')
            .eq('assignment', event.params.assignment)
            .single()

        console.log(error)

        return {
            assignmentDataInfo
        };
    }
};
