export const load = async ({ locals: { getSession, getClaim, getLMSUserID, supabase } }) => {
  const { data, error } = await supabase.auth.getSession()
  console.log(data, error)
  return {
    session: await getSession(),
    claim: await getClaim(),
    lms_user_id: await getLMSUserID()
  }
}