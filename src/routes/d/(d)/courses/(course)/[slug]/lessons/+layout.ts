import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";
export const ssr = false
export const prerender = true
export const load = (async ({ fetch, data, request, url, parent, params }) => {
  const parentData = await parent();
  const session = parentData.session
  if (!session) {
    throw redirect(303, '/');
  }
  // Experimental load test
  const modules = async () => {
    const response =  await fetch(`/api/modules/?course=${params.slug}`)
    return response.json()
  }

  return {
   // modules: modules(),
    session: session
  };

});