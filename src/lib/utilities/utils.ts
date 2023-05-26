import { courseStore } from "$lib/stores/stores.ts"
import { browser } from "$app/environment";
import { get, readable } from "svelte/store";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { supabaseClient } from '$lib/utilities/supabaseClient';



export async function fetchCourses(fetch) {
  const courses = browser && get(courseStore)

  // noinspection TypeScriptValidateTypes
  if (courses && Object.values(courses).length > 0) {
    return courseStore;
  }

  const {data: courseData} = await supabaseClient.from('courses')
    .select('id, inserted_at, course_image_url, course_title,' +
      ' course_prefix, course_number, course_term');

  const fetchedCourses = courseData

  if (browser) {
    courseStore.set(fetchedCourses);
    return courseStore;
  } else {
    return readable(fetchedCourses);
  }

}