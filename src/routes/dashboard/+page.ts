
/** @type {import('./$types').PageServerLoad} */
// @ts-ignore
export async function load({ parent }) {
  const parentData = await parent();
  console.log(parentData.user.userData)
  return {
    user: parentData.user.userData
  }
}