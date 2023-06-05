import type {PageServerLoadEvent} from "./$types"
import {getSupabase} from '@supabase/auth-helpers-sveltekit'

export const prerender = false;
export const ssr = false;
// @ts-ignore
export const load: PageServerLoadEvent = async (event) => {
    const {session, supabaseClient} = await getSupabase(event);
    if (session) {
        const {data: enrollmentData, error} = await supabaseClient.from('enrollment')
          .select('user_id,  course_id, enrolled, enrollment_date, users ( first_name, last_name )')
          .eq('course_id', event.params.slug)

        return {
            enrollmentData
        };
    }
};