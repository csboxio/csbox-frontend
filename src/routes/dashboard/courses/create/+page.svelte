<script lang="ts" xmlns="http://www.w3.org/1999/html">
  import { page } from "$app/stores";
  import CourseImage from "$lib/components/CourseImage.svelte";
  import { onMount } from "svelte";
  let session = $page.data.session;

  /** @type {import("./$types").PageData} */
  export let data;
  // TODO error handling
  let course_title: string | null = null;
  let course_prefix: string | null = null;
  let course_number: string | null = null;
  let course_term: string | null = null;
</script>

<body class="bg-gray-600 antialiased bg-body text-body font-body">
<form method="POST" action="?/createCourse">
  <section class="py-3">
    <div class="container px-6 mx-auto">
      <div class="p-8 bg-gray-500 rounded-xl">
        <div class="flex flex-wrap items-center justify-between -mx-4 mb-8 pb-6 border-b border-gray-400 border-opacity-20">
          <div class="w-full sm:w-auto px-4 mb-6 sm:mb-0">
            <h4 class="text-2xl font-bold tracking-wide text-white mb-1">Create Course</h4>
          </div>
          <div class="w-full sm:w-auto px-4">
            <div>
              <!--Save and cancel buttons-->
              <a class="inline-block py-2 px-4 mr-3 text-xs text-center font-semibold leading-normal text-gray-200 bg-gray-600 hover:bg-gray-400 rounded-lg transition duration-200" href="/dashboard/courses">Cancel</a>
              <input class="inline-block py-2 px-4 text-xs text-center font-semibold leading-normal text-gray-200 bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-200" href="/dashboard/courses" type="submit">
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
          <div class="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
            <span class="text-sm font-medium text-gray-100">Course Title</span>
          </div>
          <div class="w-full sm:w-2/3 px-4">
            <div class="max-w-xl">
              <div class="flex flex-wrap items-center -mx-3">
                <div class="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
                  <input name="course_title" id="course_title" type="text" class="block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg" placeholder="Software Development I" bind:value={course_title}>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
          <div class="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
            <span class="text-sm font-medium text-gray-100">Course Prefix</span>
          </div>
          <div class="w-full sm:w-2/3 px-4">
            <div class="max-w-xl">
              <div class="flex flex-wrap items-center -mx-3">
                <div class="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
                  <input name="course_prefix" id="course_prefix" type="text" class="block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg" placeholder="CS101" bind:value={course_prefix}>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
          <div class="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
            <span class="text-sm font-medium text-gray-100">Course Number</span>
          </div>
          <div class="w-full sm:w-2/3 px-4">
            <div class="max-w-xl">
              <div class="flex flex-wrap items-center -mx-3">
                <div class="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
                  <input name="course_number" id="course_number" type="text" class="block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg" placeholder="12345" bind:value={course_number}>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
          <div class="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
            <span class="text-sm font-medium text-gray-100">Course Term</span>
          </div>
          <div class="w-full sm:w-2/3 px-4">
            <div class="max-w-xl">
              <div class="flex flex-wrap items-center -mx-3">
                <div class="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
                  <input name="course_term" id="course_term" type="text" class="block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg" placeholder="Spring 2023" bind:value={course_term}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  </section>
</form>
</body>
