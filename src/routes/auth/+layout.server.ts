import {redirect} from "@sveltejs/kit";
export const load = async ({ fetch, locals: { getSession, getClaim } }) => {
  const session = await getSession()

  if (session) {
    throw redirect(301, '/d')
  }

  return {
    session: await getSession()
  }
}