export const load = async ({ locals: { getSession, getClaim, getLMSUserID } }) => {
    const session = await getSession()
    if (session) {
        const claim = await getClaim()
        const lms_user_id = await getLMSUserID()
        return {
            claim: claim,
            lms_user_id: lms_user_id
        }
    }
}