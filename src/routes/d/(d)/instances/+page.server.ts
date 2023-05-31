import type {Actions, PageServerLoadEvent} from "./$types";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import {v4 as uuidv4} from 'uuid';

export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const load: PageServerLoadEvent = async (event) => {
  const {session, supabaseClient} = await getSupabase(event);
  if (session) {
    const {data: assignmentData} = await supabaseClient.from('assignments')
      .select('id, assignment_title')

    const {data: instanceData} = await supabaseClient.from('instances')
      .select('id, assignment_id, inserted_at, type, assignments ( id, assignment_title )')
      .eq('user_id', session.user.id)

    return {
      assignmentData,
      instanceData
    };
  }
};
export const actions: Actions = {
  createInstance: async (event) => {

    const {request, cookies, url} = event
    const {supabaseClient} = await getSupabase(event)
    const formData = await request.formData()

    const {data} = await event.locals.sb.auth.refreshSession()
    let user;
    if (data == null) {
      const { data } = await supabaseClient.auth.refreshSession()
      user = data.user
    }
    user = data.user

    const type = formData.get('type')
    const assignment = formData.get('assignment')

    if (user != null) {
      let updates = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignores
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        user_id: user.id,
        inserted_at: new Date(),
        type: type,
        assignment_id: assignment
      }
      // Leave out the in_module (module id) if it is blank in the update, if not include it.
      //console.log(updates)
      const {error} = await event.locals.sb.from('instances').upsert(updates)
      //console.log(error)
    }
  }
}