import {browser} from "$app/environment";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const load: LayoutServerLoad = async (event) => {


    const {session, supabaseClient} = await getSupabase(event);
    if (session && !browser) {
        const {data: courseData, error} = await supabaseClient.from('courses')
          .select('id, inserted_at, course_image_url, course_title,' +
            ' course_prefix, course_number, course_term');



        const {data: enrolled} = await supabaseClient.from('enrollment')
          .select('hidden')
          .eq('user_id', session.user.id)

        return {
            courses: {
                courseData: courseData,
                enrolledData: enrolled
            },
        };
    }
}