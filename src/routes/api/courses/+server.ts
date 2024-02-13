import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ locals: { supabase } }) => {
    await supabase.auth.refreshSession()
    const { data, error } = await supabase.from('courses')
        .select('id, lms_course_id, inserted_at, updated_at, course_image_url, course_title, course_prefix, course_number, course_term, course_color, course_contact, course_start, course_end')
    if (error) {
        console.log(error)
    }

    return json({data})
}