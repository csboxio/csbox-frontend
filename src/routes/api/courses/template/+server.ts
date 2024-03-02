import {json, redirect, RequestHandler} from "@sveltejs/kit";
import {page} from "$app/stores";
import {createTemplateCourseData} from "../../../../lib/utilities/templateCourse.js";

export const GET: RequestHandler = async ({ request, url, locals: { supabase, getSession } }) => {
    const session = await getSession();
    const { searchParams } = new URL(url);
    const course_id = searchParams.get('course_id');

    console.log(course_id, supabase, session.user.id)
    if (session) {
        await createTemplateCourseData(course_id, supabase, session.user.id)
    }

    return json(true)
}