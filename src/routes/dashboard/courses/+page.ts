/** @type {import('./$types').LayoutLoad} */
// @ts-ignore
export async function load({ parent }) {
  const parentData = await parent();
  return {
    user: parentData.user.userData
  }
}