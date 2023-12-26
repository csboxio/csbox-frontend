export const load = async ({ locals: { getSession, supabase} }) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return {
    session: session,
  }
}