import type { PageLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { onMount } from "svelte";
// @ts-ignore
export const load: PageLoad = async (event) => {

  const { session, supabaseClient } = await getSupabase(event);
  if (session) {
    const { data: courseData, error } = await supabaseClient.from('courses')
      .select('id, course_image_url, course_title, course_prefix, course_number, course_term')
      .eq('created_by', session.user.id);

    return {
      courseData
    };
  }
};

// This code ended up being not needed but will be left here, because I forget how I did this.
async function getCourseImages(image: URL | RequestInfo){
  // Convert url from database into blob
  return await fetch(image,
    {
      method: 'GET',
      headers: {
        credentials: 'omit',
        'cache-control': 'max-age=3600'
      }
    })
    .then((response) => response.blob())
    .then((myBlob) =>
    {
      return URL.createObjectURL(myBlob);
    })
}