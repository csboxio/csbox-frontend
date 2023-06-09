import type {Actions, PageServerLoadEvent} from "./$types";

/*
export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const load: PageServerLoadEvent = async (event) => {
    /*const {session, supabaseClient} = await getSupabase(event);
    const slug = event.params.slug
    if (session) {
        const {data: assignmentData} = await supabaseClient.from('assignments')
            .select('assignment_id, inserted_at, assignment_title, category, submission_type, description, due, points')
            .eq('course_id', event.params.slug)
            .eq('assignment_id', event.params.assignment)
            .single()

        const {data: modules, error} = await supabaseClient.from('modules')
          .select('module_title, id')
          .eq('user_id', session.user.id)
          .eq('course_id', event.params.slug)

        return {
            assignmentData,
            slug,
            modules
        };
    }*/