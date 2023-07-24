// src/routes/+layout.server.ts
export const load = async ({ locals: { getSession, getClaim } }) => {
  return {
    session: await getSession(),
    claim: await getClaim()
  }
}