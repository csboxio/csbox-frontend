export const load = async ({ locals: { getSession, getClaim } }) => {
    return {
        session: await getSession(),
        claim: await getClaim()
    }
}