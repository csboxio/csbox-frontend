export const load = async ({ locals: { getSession, supabase} }) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log('auth layoutserverts session', session)
  return {
    session: session,
  }
}