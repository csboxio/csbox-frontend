import type {LayoutServerLoad} from './$types';
import { getContext } from "svelte";

export const load = (async ({ params,parent }) => {
    const {courses} = await parent();
    const { slug } = params
    return {
        courses,
        slug
    };
}) satisfies LayoutServerLoad;

