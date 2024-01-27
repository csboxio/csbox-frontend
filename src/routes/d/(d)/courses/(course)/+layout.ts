

export const load = async ({ fetch, data, request, url, parent, params }) => {
    const parentData = await parent();
    // Destructed data from previous layout.ts
    const user = parentData.user;

    console.log(user)

    const { slug } = params
    if (parentData.courses.data.length === 0) {
        throw(302, "/d");
    }

    return {
        courses: parentData.courses,
        claim: parentData.session?.user.app_metadata.userrole,
        slug,
        user: user,
    };
};


