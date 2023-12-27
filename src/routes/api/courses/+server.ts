import { error, json, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, setHeaders, url, locals: { getSession, supabase }, event }) => {
    const session = await getSession()

    if (!session) {
        return json({message: 'No session'})
    }
        const { data, error } = await supabase.from('courses')
            .select('id, lms_course_id, inserted_at, updated_at, course_image_url, course_title, course_prefix, course_number, course_term, course_color, course_contact, course_start, course_end')

        if (error) {
            console.log(error)
        }

        return json({data})

}