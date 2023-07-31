
export const load = (async ({ params,parent }) => {
    const parentData = await parent();

    const { slug } = params
    if (parentData.courses.data.length === 0) {
        throw(302, "/d");
    }
    console.log(parentData)
    return {
        courses: parentData.courses,
        claim: parentData.session.user.app_metadata.userrole,
        slug
    };
});

