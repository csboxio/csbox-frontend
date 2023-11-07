import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";
export const ssr = false
export const load = (async ({ fetch, data, request, url, parent, params }) => {
  const parentData = await parent();
  const session = parentData.session

  if (!session) {
    throw redirect(303, '/');
  }
  const assignments = async () => {
    const response =  await fetch(`/api/assignments/?course=${params.slug}`)
    return response.json()
  }
  const modules = async () => {
    const response =  await fetch(`/api/modules/?course=${params.slug}`)
    return response.json()
  }

  const groups = async () => {
    const response =  await fetch(`/api/groups/?course=${params.slug}`)
    return response.json()
  }

  return {
    assignments: assignments(),
    groups: groups(),
    modules: modules(),
    session: session,
  };

});

