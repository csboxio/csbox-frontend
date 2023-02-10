import { supabaseClient } from "$lib/utilities/supabaseClient";
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
import { createClient } from "@supabase/supabase-js";
import type { RequestHandler } from "@sveltejs/kit";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const GET: RequestHandler = async (event) => {
    const { session, supabaseClient } = await getSupabase(event)
    if (!session) {
        throw redirect(303, '/');
    }
    const { data, error } = await supabaseClient.from('courses')
      .select('id, course_image_url, course_title, course_prefix, course_number, course_term')
      .eq('created_by', session.user?.id);
    return new Response(JSON.stringify({ data }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
    })
}