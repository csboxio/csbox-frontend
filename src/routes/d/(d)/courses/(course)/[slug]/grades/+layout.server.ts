
export const load = async ({ locals: { getSession, getClaim } }) => {
  const session = await getSession()
  if (session) {
    const claim = await getClaim()
    return {
      claim: claim,
      session: await getSession(),
    }
  }
}