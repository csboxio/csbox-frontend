import type {Actions, PageServerLoadEvent} from "./$types";

export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const load: PageServerLoadEvent = async ({ request, url, locals: { supabase, getSession } }) => {
  const session = await getSession()
  if (session) {
    const {data: assignmentData, error} = await supabase.from('assignments')
      .select('assignment_id, title')

    const {data: instanceData} = await supabase.from('instances')
      .select('id, assignment_id, inserted_at, type, assignments ( assignment_id, title )')
      .eq('user_id', session.user.id)

    return {
      assignmentData,
      instanceData
    };
  }
};
export const actions: Actions = {
  createInstance: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData()
    const {data} = await supabase.auth.refreshSession()

    let user = data.user
    const type = formData.get('type')
    const assignment = formData.get('assignment')
    if (user != null) {
      let updates = {
        user_id: user.id,
        inserted_at: new Date(),
        type: type,
        assignment_id: assignment
      }
      const {error} = await supabase.from('instances').upsert(updates)
    }
  }
}