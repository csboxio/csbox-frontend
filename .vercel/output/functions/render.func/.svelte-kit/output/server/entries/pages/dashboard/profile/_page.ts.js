async function load({ parent }) {
  const parentData = await parent();
  return {
    user: parentData.user.userData
  };
}
export {
  load
};
