import { getContext } from "svelte";

export const load = (async ({ params,parent }) => {
    const {courses} = await parent();
    const { slug } = params
    if (courses.data.length === 0) {
        throw(302, "/d");
    }
    return {
        courses,
        slug
    };
});

