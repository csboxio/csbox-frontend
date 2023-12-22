export const load = async ({ locals: { getSession, getClaim, getLMSUserID, supabase } }) => {
  return {
    session: await getSession(),
    claim: await getClaim(),
    lms_user_id: await getLMSUserID()
  }
}