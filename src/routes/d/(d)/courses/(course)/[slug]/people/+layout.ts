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
  const people = await fetch(`/api/people/?course=${params.slug}`)

  return {
    people: await people.json(),
    session: session
  };

});