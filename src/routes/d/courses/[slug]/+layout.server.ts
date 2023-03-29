import type {LayoutServerLoad} from './$types';

export const load = (async ({ params,parent }) => {
    const {courses} = await parent();
    const { slug } = params
    return {
        courses,
        slug
    };
}) satisfies LayoutServerLoad;

