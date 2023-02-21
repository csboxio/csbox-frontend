import type { LayoutServerLoad } from './$types';

export const load = (async ({ parent }) => {
    const { courses } = await parent();
    return {
            courses
    };
}) satisfies LayoutServerLoad;