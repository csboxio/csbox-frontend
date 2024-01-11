import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";
import {createClient} from "@supabase/supabase-js";
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ request, url, params, locals: { getSession }, event }) => {

    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY,
        {
            db: { schema: 'material' },
            auth: {
                persistSession: false,
            }
        });

  const session = await getSession()

  if (session) {
    const course = url.searchParams.get('course')

      const {data, error } = await supabase.from(`${course}+people_info`)
          .select('username, avatar_url, website, first_name, last_name, id, enrolled, enrollment_date')


      if (error) {
          console.log(data, error)
      }

      console.log(data, error)


    //event.setHeaders({
    //  'cache-control': 'public, max-age=60, s-maxage=60'
    //})

    return json(data)
  }

}