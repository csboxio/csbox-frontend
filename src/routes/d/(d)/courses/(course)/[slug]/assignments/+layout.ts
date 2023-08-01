import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";
export const ssr = false
export const load = (async ({ fetch, data, request, url, parent, params }) => {
  const parentData = await parent();
  const session = parentData.session

  if (!session) {
    throw redirect(303, '/');
  }
  const assignments = await fetch(`/api/assignments/?course=${params.slug}`)
  const modules = await fetch(`/api/modules/?course=${params.slug}`)
  const groups = await fetch(`/api/groups/?course=${params.slug}`)

  return {
    assignments: {
      assignmentData: await assignments.json(),
    },
    groups: await groups.json(),
    modules: await modules.json(),
    session: session,
  };

});

