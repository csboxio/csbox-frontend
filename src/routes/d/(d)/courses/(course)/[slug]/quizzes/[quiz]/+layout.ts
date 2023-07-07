import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";
import {createClient} from "@supabase/supabase-js";
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
export const ssr = false
export const load = (async ({ fetch, data, request, url, parent, params }) => {
  const parentData = await parent();
  const session = parentData.session

  if (!session) {
    throw redirect(303, '/');
  }

  const quiz = await fetch(`/api/quizzes/quiz/?id=${params.quiz}`)

  return {
        quiz: await quiz.json(),
        session: session
    };
});