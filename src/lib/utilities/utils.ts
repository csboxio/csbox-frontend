import { browser } from "$app/environment";
import { get, readable } from "svelte/store";
import { userStore, courseStore } from "../stores/stores.js";

export async function fetchCourses(fetch, supabase) {

  const courses = get(courseStore)

  // noinspection TypeScriptValidateTypes
  if (courses && courses.length > 0) {
    return courseStore;
  }

  if (browser) {
    const {data: courseData} = await supabase.from('courses')
      .select('id, inserted_at, course_image_url, course_title,' +
        ' course_prefix, course_number, course_term');
    courseStore.set(courseData);
    return courseStore;
  }
}
export async function fetchUsers(fetch, _user, supabase) {
  const user = browser && get(userStore)

  // noinspection TypeScriptValidateTypes
  if (user && Object.values(user).length > 0) {
    return userStore;
  }
  console.log(_user)

  const {data: userData, error} = await supabase.from('users')
    .select('updated_at, username, first_name, last_name, website, country, avatar_url')
    .eq('id', _user)
    .single()

  console.log(userData, error)

  const fetchedUser = userData

  if (browser) {
    courseStore.set(fetchedUser);
    return userStore;
  } else {
    return (fetchedUser);
  }

}