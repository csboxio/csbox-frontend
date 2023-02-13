
import type { LayoutServerLoad } from "../../../.svelte-kit/types/src/routes/$types";
import { browser } from "$app/environment";
export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const load: LayoutServerLoad = async (event) => {

  if (event.locals.session && !browser) {
    console.time("layout")
    const {data: courseData, error} = await event.locals.sb.from('courses')
        .select('id, course_image_url, course_title, course_prefix, course_number, course_term')
        .eq('created_by', event.locals.session.user.id);

    const {data: tableData} = await event.locals.sb.from('users')
        .select('username, first_name, last_name, website, country, avatar_url')
        .eq('id', event.locals.session.user.id)
        .single()

    console.timeEnd("layout")
    return {
      session: event.locals.session,

      courses: {
        courseData: courseData
      }
    };
  }

}