export const load = async ({ fetch, locals: { getSession, getClaim } }) => {
  // Session is valid here.

  const user = await fetch('/api/users');
  const dashboard = await fetch('/api/dashboard/instructor/get')

  return {
    user: await user.json(),
    dashboard: await dashboard.json(),
    session: await getSession(),
    claim: await getClaim()
  };
}