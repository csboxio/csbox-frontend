import {redirect} from "@sveltejs/kit";

export const load = async ({ fetch, locals: { getSession, getClaim } }) => {
  const session = await getSession()

  return {
    session
  }
}