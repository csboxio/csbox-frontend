import type { PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ( {locals }) => {
  const { data, error: err } = await locals.sb.auth.getSession()

  if (err) {
    throw error(500, err?.message)
  }


}