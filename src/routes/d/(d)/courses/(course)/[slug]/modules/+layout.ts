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
  const modules = await fetch(`/api/modules/?course=${params.slug}`)
  const assignments = await fetch(`/api/assignments/?course=${params.slug}`)
  const quizzes = await fetch(`/api/quizzes/?course=${params.slug}`)


  return {
    modules: await modules.json(),
    assignments: await assignments.json(),
    quizzes: await quizzes.json(),
    session: session
  };

});