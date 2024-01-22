import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals: { supabase, getSession, getClaim } }) => {
  const session = await getSession()
  const claim = await getClaim()

  if (session) {
    if (claim === 'instructor') {
      const { data, error } = await supabase.rpc('get_instructor_dashboard', {p_user_id: session.user.id});
      console.log(data, error)
      if (error) {
        return new Response(JSON.stringify([{'avg_avg_grade': 0, 'total_num_people': 0, 'total_num_ungraded': 0, 'total_num_late': 0, 'total_num_late_ungraded': 0, 'total_num_missing': 0, 'num_courses': 0 }]), {
          status: 303,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }
      return json(data)
    }
  }

  return new Response(JSON.stringify([{'avg_avg_grade': 0, 'total_num_people': 0, 'total_num_ungraded': 0, 'total_num_late': 0, 'total_num_late_ungraded': 0, 'total_num_missing': 0, 'num_courses': 0 }]), {
    status: 303,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}