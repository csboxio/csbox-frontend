import type {PageServerLoadEvent} from "./$types"
import {getSupabase} from '@supabase/auth-helpers-sveltekit'
import {goto} from "$app/navigation";
import {redirect} from "@sveltejs/kit";

export const ssr = false;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/** @type {import('./$types').PageServerLoadEvent} */

export const load: PageServerLoadEvent = async (event) => {
    const {session, supabaseClient} = await getSupabase(event);
    if (session) {
        const {data: enrolled} = await supabaseClient.from('enrollment')
            .select('user_id')
            .eq('course_id', event.params.slug)
            .eq('user_id', session.user.id)
            .single();


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

