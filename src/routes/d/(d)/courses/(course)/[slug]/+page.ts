
export const load = (async ({ params,parent }) => {
    const parentData = await parent();

    const { slug } = params
    if (parentData.courses.data.length === 0) {
        throw(302, "/d");
    }

    const todo = async () => {
        const response =  await fetch(`/api/todo/?course=${params.slug}`)
        return response.json()
    }

    return {
        courses: parentData.courses,
        claim: parentData.session.user.app_metadata.userrole,
        slug,
        todo: todo(),
    };
});


