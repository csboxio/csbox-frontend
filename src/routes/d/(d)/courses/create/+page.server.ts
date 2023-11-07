import type {Actions} from "./$types";
import {invalidateAll} from "$app/navigation";
import {redirect} from "@sveltejs/kit";
import {createPlaceHolderCourseDocument} from "../../../../../lib/utilities/quill.js";

export const prerender = false;

export const load = async ({ locals: { getSession, getClaim } }) => {
    const session = await getSession()
    if (session) {
        const claim = await getClaim()
        if (claim == "student") {
            throw redirect(303, '/')
        }
        return {
            claim: claim,
        }
    }
}

async function createModule () {

    /*const course_id = params.slug
    if (user != null) {
        const updates = {
            user_id: user.id,
            course_id: course_id,
            module_title: name
        }
        const {error} = await supabase.from('modules').upsert(updates)
        console.log(error)
    }*/
}
export const actions: Actions = {
    createCourse: async ({ request, url, locals: { supabase } }) => {
        const {data} = await supabase.auth.refreshSession()
        const user = data.user
        const formData = await request.formData()
        const title = formData.get('course_title') as string
        const prefix = formData.get('course_prefix') as string
        const number = formData.get('course_number') as string
        const term = formData.get('course_term') as string
        const color = formData.get('course_color') as string
        const contact = formData.get('course_contact') as string

        if (data.session) {
            //const course_id = Math.floor(Math.random() * 9999999999);

            console.log("create/page" + user)
            const updates = {
                _inserted_at: new Date(),
                _user_id: user.id,
                _course_image_url: null,
                _course_title: title,
                _course_prefix: prefix,
                _course_number: number,
                _course_term: term,
                _course_start: null,
                _course_end: null,
                _course_type: null,
                _course_color: color,
                _course_contact: contact,
            }

            console.log(updates)

            const { data, error } = await supabase.rpc('create_course', updates);

            console.log(data,error)
            if (error) {
                console.log(error)
            }

            const id = data;


        if (!error) {
            return {success: true, id: id};
          }
      }
    }
}