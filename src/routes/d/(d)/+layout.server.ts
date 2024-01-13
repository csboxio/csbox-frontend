export const load = async ({ fetch, locals: { getSession, getClaim } }) => {
  // Session is valid here.

  const user = await fetch('/api/users');

  return {
    user: await user.json(),
    session: await getSession(),
    claim: await getClaim()
  };
}