
import {browser} from "$app/environment";
import { redirect } from "@sveltejs/kit";
export const prerender = false;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore

export const load = async ({ fetch, data, request, url, params, parent, locals: {supabase} }) => {
    const parentData = await parent();
    const session = parentData.session
    if (!session) {
        throw redirect(303, '/');
    }
    const {data: assignmentDataInfo, error} = await supabase.from('assignments_info')
      .select('description, submission_type,' +
        ' submission_attempts, display_as, available_start, available_end,' +
        ' inserted_at, assign_to')
      .eq('assignment', params.assignment)
      .single()

    console.log(error)
    return {
        courses: await assignmentDataInfo
    };
};
