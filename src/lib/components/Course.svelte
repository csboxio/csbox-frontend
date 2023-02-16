<script type="module">

  import { imageStore } from "$lib/stores/stores";
  import { onMount } from "svelte";

  export let id;
  export let course_image_url;
  export let course_title;
  export let course_prefix;
  export let course_number;
  export let course_term;


    let image;
    const imageSubscribe = imageStore.subscribe(value => {
      image = value
    });
    if (!image) {
      imageStore.set(imageToBlob(course_image_url))
    }
    let imageSource;
  onMount(async () => {
    imageSource = await test(image);
    console.log(imageSource)
  });

    async function test(image) {
      return image
    }

  async function imageToBlob(image){
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
        return myBlob;
      })
  }
</script>

<a href="/dashboard/courses/{id}" data-sveltekit-preload-data="hover">
  <div class="mb-8 mx-4">
    <div class="min-w-xs max-w-xs ">
      <div class="relative group ">
        <div class="absolute group-hover:scale-105 -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-400 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-1500 group-hover:duration-200"></div>
        <div>
          <div class="relative p-6 bg-gray-700 rounded-xl group-hover:scale-105 transition duration-1500">
            <img {imageSource} loading="lazy" class="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-lg drop-shadow-2xl bg-gray-600 "/>
            <div class="inline-block absolute top-1 right-0 m-5 text-gray-300 hover:text-gray-200" href="#">
              <svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </div>
            <h4 class="text-xl text-white font-bold mb-3">{course_title === "" ? "Course Name" : course_title}</h4>
            <h4 class="text-xl text-white font-bold mb-1">{course_prefix === "" ? "Empty" : course_prefix} {course_number}</h4>
            <h4 class="text-gray-300 mb-1">{course_term}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</a>