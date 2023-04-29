import {redirect} from "@sveltejs/kit";
import {browser} from "$app/environment";
import {courseStore} from "../../../lib/stores/stores";
import { getContext, setContext } from "svelte";
import { page } from "$app/stores";
import courses from "../../+layout.svelte"
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const load: LayoutServerLoad = async ({locals, event}) => {
    if (!locals.session?.user) {
        throw redirect(303, '/login')
    }

    const {session, supabaseClient} = await getSupabase(event);
    if (session) {
            const {data: courseData, error} = await locals.sb.from('courses')
              .select('id, inserted_at, course_image_url, course_title, course_prefix, course_number, course_term')
              .eq('created_by', session.user.id);
            // TODO HERE
            //courses.set(courseData)

        console.log(locals.session.user.id)


        return {
            courses: {
                courseData: courseData
            },
        };
    }
}