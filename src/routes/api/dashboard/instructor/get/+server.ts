import type { RequestHandler } from "@sveltejs/kit";
import { error, json, redirect } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request, url, setHeaders, locals: { supabase, getSession, getClaim }, event }) => {
  const session = await getSession()
  const claim = await getClaim()
  if (!session) {
    throw redirect(303, '/');
  }


  if (claim === 'instructor') {
    const { data, error } = await supabase
        .rpc('get_instructor_dashboard', {p_user_id: session.user.id});

    console.log(data, error)

    return json(data)
  }

  return new Response(JSON.stringify([{'avg_avg_grade': 0, 'total_num_people': 0, 'total_num_ungraded': 0, 'total_num_late': 0, 'total_num_late_ungraded': 0, 'total_num_missing': 0, 'num_courses': 0 }]), {
    status: 303,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}