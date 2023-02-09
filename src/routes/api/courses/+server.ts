import { supabaseClient } from "$lib/utilities/supabaseClient";

/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export async function GET({ request }) {
  // Get path url from database
  // TODO server side user check this is insecure
    const { data: courseData, error } = await supabaseClient.from('courses')
      .select('id, course_image_url, course_title, course_prefix, course_number, course_term')
      .eq('created_by', request.event.locals.user.id);
    // @ts-ignore
    console.log(userData)
    // @ts-ignore
    return new Response(JSON.stringify(userData))
}