export const load = async ({ locals: { getSession, getClaim, getLMSUserID } }) => {
    return {
        session: await getSession(),
        claim: await getClaim(),
        lms_user_id: await getLMSUserID()
    }
}