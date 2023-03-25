import {redirect} from "@sveltejs/kit";
import {browser} from "$app/environment";
import {courseStore} from "../../../lib/stores/stores";
export const prerender = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const load: LayoutServerLoad = async ({locals, event}) => {
    if (!locals.session?.user) {
        throw redirect(303, '/login')
    }
    if (locals.session && !browser) {

        let courses;
        const courseSubscribe = courseStore.subscribe(value => {
            courses = value
        });

        if (!courses) {
            const {data: courseData, error} = await locals.sb.from('courses')
              .select('id, inserted_at, course_image_url, course_title, course_prefix, course_number, course_term')
              .eq('created_by', locals.session.user.id);

            courseStore.set(courseData);
        }

        return {
            courses: {
                courseData: courses
            },
        };
    }
}

// This works, but I feel like sending BLOBS and arrayBuffers to clients will be network, ram and CPU intensive .
// This probably isn't worth the slight saving in edge functions hits for CDN images.
/*
async function getImages(course_images: string | any[])
{
  const imgs = [];
  for (let i = 0; i < course_images.length; i++) {
    if (course_images[i] == null) {
      imgs.push(undefined)
      continue
    }
    const image = await fetch(course_images[i])
        .then(res=>res.blob());
    const url = URL.createObjectURL(image);
    imgs.push(url)
  }
  return imgs;
}
*/