import type {LayoutServerLoad} from './$types';
import { getContext } from "svelte";

export const load = (async ({ params,parent }) => {
    const {courses} = await parent();
    const { slug } = params
    if (courses.courseData.length === 0) {
        throw(302, "/d");
    }
    return {
        courses,
        slug
    };
}) satisfies LayoutServerLoad;

