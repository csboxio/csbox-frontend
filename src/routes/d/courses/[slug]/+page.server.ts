import type {PageServerLoadEvent} from "./$types"
import {getSupabase} from '@supabase/auth-helpers-sveltekit'

export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const load: PageServerLoadEvent = async (event) => {
    const {session, supabaseClient} = await getSupabase(event);
    if (session) {
        const {data: courseData} = await supabaseClient.from('courses')
            .select('inserted_at, course_image_url, course_title, course_prefix, course_number, course_term')
            .eq('created_by', session.user.id)
            .eq('id', event.params.slug)
            .single();
        return {
            courseData
        };
    }
};
