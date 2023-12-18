export const load = async ({ locals: { getSession, getClaim, supabase } }) => {
  const { data, error } = await supabase.auth.getSession()
  console.log(data, error)
  return {
    session: await getSession(),
    claim: await getClaim()
  }
}