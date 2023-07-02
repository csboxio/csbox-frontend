import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";
import {createClient} from "@supabase/supabase-js";
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";

// TODO UNKNOWN IF TRULY SECURE
// https://github.com/supabase/auth-helpers/issues/408
/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const GET: RequestHandler = async ({ request, url, locals: { getSession }, event }) => {
  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY,
      {
        db: { schema: 'private' },
        auth: {
          persistSession: false,
        }
      });

  const session = await getSession()

  if (session) {
    const course = url.searchParams.get('course')
    const {data, error } = await supabase.from('enrollment')
        .select('user_id,  course_id, enrolled, enrollment_date, users ( first_name, last_name )')
        .eq('course_id', course)

    console.log(data, error )
    //event.setHeaders({
    //  'cache-control': 'public, max-age=60, s-maxage=60'
    //})

    return json(data)
  }

}