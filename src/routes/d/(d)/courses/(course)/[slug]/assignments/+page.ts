import { getSupabase } from "@supabase/auth-helpers-sveltekit";

export const load = (async (  event ) => {
  const {session } = await getSupabase(event);
  if (session) {
    const response = await event.fetch(`/api/assignments/?course=${event.params.slug}`)
    console.log(response)
    return {
      assignments: {
        assignmentData: await response.json()
        //enrolledData: enrolled
      },
    };
  }
});