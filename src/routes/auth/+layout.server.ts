export const load = async ({ fetch, locals: { getSession, getClaim } }) => {
  return {
    session: await getSession(),
    claim: await getClaim()
  }
}