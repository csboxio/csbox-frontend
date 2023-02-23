import type { Actions, PageServerLoadEvent } from "./$types";
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { page } from '$app/stores';
import { redirect } from "@sveltejs/kit";

export const prerender = false;
// @ts-ignore
export const load: PageServerLoadEvent = async (event) => {
  const { session, supabaseClient } = await getSupabase(event);
  if (session) {
    const { data: courseData } = await supabaseClient.from('courses')
      .select('course_image_url, course_title, course_prefix, course_number, course_term')
        .eq('created_by', session.user.id)
        .eq('id', event.params.slug)
        .single();

    const { data: assignmentData } = await supabaseClient.from('assignments')
      .select('id, inserted_at, assignment_title, category, description')
      .eq('course_id', event.params.slug)

    return {
      courseData,
      assignmentData
    };
  }
};

export const actions: Actions = {
  createAssignment: async (event) => {
    const { request, cookies, url } = event
    const { supabaseClient } = await getSupabase(event)
    const formData = await request.formData()

    const { data } = await event.locals.sb.auth.refreshSession()
    const { session, user } = data

    const name = formData.get('name')
    let category = formData.get('category')
    const description = formData.get('description')
    const course_id = event.params.slug

    // if category is selected make it blank
    // TODO make this impossible to leave blank in the first place
    if (category == "Select category") {
      category = "";
    }

    const updates = {
      // @ts-ignores
      id: Math.floor(Math.random() * 9999999999),
      assignment_title: name,
      // @ts-ignore
      user_id: user.id,
      inserted_at: new Date(),
      course_id: course_id,
      category: category,
      description: description
    }
    let { error } = await event.locals.sb.from('assignments').upsert(updates)
    console.log(error)
  }
}