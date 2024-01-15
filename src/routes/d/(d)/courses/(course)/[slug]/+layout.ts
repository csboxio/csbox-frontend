import {redirect} from "@sveltejs/kit";

export const load = (async ({ params,parent }) => {
    const parentData = await parent();

    if (parentData.courses.data.length === 0 || !parentData.courses.data.some(course => course.id === parseInt(params.slug))) {
        throw redirect (301, '/d/courses/missing_course');
    }

});