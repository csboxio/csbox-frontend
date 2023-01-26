<script lang="ts" xmlns="http://www.w3.org/1999/html">
  import { page } from "$app/stores";
  import CourseImage from "$lib/components/CourseImage.svelte";
  import { onMount } from "svelte";
  import { enhance } from '$app/forms';



  let session = $page.data.session;

  /** @type {import("./$types").PageData} */
  export let data;
  // TODO error handling
  let course_title: string | null = null;
  let course_prefix: string | null = null;
  let course_number: string | null = null;
  let course_term: string | null = null;

  let step;

  function handleSteps(num, event) {
    step = num;
  }

  export let files: FileList;

  import { invalidateAll, goto } from '$app/navigation';
  import { applyAction, deserialize } from '$app/forms';

  import type { ActionData } from './$types';
  import type { ActionResult } from '@sveltejs/kit';

  export let form: ActionData;

  let error: any;

  let currentCourseId;

  async function handleSubmit(event) {
      const data = new FormData(this);

      const response = await fetch(this.action, {
          method: 'POST',
          body: data,
          headers: {
              'x-sveltekit-action': 'true'
          }
      });

      const result: ActionResult = deserialize(await response.text());

      if (result.type === 'success') {
          // re-run all `load` functions, following the successful update
          step = 2;
          currentCourseId = JSON.stringify(result["data"].course_id)

          //currentCourseId = data.get('course_number') as string
          await invalidateAll();
      }

      applyAction(result);
  }
</script>

<!--Svelte-kit preloading doesn't like me changing the body background color between pages-->
<body class="bg-gray-600 antialiased bg-body text-body font-body">
<div class="from-gray-500 to-gray-600 bg-gradient-to-br antialiased bg-body text-body font-body">

<form method="POST" action="?/createCourse" on:submit|preventDefault={handleSubmit}>
  <section class="py-3">
    <div class="container px-9 mx-auto">
      <div class="min-h-screen flex">

        <div class="flex w-1/2 justify-around i items-center md:w-1/2">
          <div class="relative group md:w-1/2 ">
            <div class="absolute -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-400 rounded-lg blur opacity-10 group-hover:opacity-75 transition duration-1500 group-hover:duration-200 animate-tilt"></div>
          <div>
              <div class="relative p-6 bg-gray-700 rounded-xl">
                <img src="https://dummyimage.com/150x150/000/fff" class="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-lg"/>
                <a class="inline-block absolute top-1 right-0 m-5 text-gray-300 hover:text-gray-200" href="#">
                  <svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </a>
                <h4 class="text-xl text-white font-bold mb-3">Software Development</h4>
                <h4 class="text-xl text-white font-bold mb-1">CS101 12345</h4>
                <h4 class="text-gray-300 mb-1">Spring 2024</h4>
              </div>
          </div>
        </div>
        </div>

        <div>
          <div class="p-9 bg-gray-600 rounded-xl">
            <!--Header-->
            <div
              class="flex flex-wrap items-center justify-between -mx-4 mb-8 pb-6 border-b border-gray-400 border-opacity-20">
              <div class="w-full sm:w-auto px-4 mb-6 sm:mb-0">
                <h4 class="text-2xl font-bold tracking-wide text-white mb-1">Create Course</h4>
              </div>
            </div>

            <!--Progress stepper-->
            <div
              class="flex flex-wrap items-center justify-between -mx-4 mb-8 pb-6 border-b border-gray-400 border-opacity-20">
              <ol
                class="flex items-center w-1/2 text-sm font-medium text-center text-gray-300 dark:text-gray-200 sm:text-base">
                <li
                  class="flex md:w-full items-center text-blue-500 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
        <span
          class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-300">
            <svg aria-hidden="true" class="w-4 h-4 mr-2 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd"
                                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                          clip-rule="evenodd"></path></svg>
            Course <span class="hidden sm:inline-flex sm:ml-2">Info</span>
        </span>
                </li>
                <li
                  class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
        <span
          class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">
            <span class="mr-2">2</span>
            Customize <span class="hidden sm:inline-flex sm:ml-2"></span>
        </span>
                </li>
                <li class="flex items-center">
                  <span class="mr-2">3</span>
                  Confirmation
                </li>
              </ol>
            </div>

            <!--Create course form-->
            {#if step === undefined}
            <div class="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
              <div class="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
                <span class="text-sm font-medium text-gray-100">Course Title</span>
              </div>
              <div class="w-full sm:w-2/3 px-4">
                <div class="max-w-xl">
                  <div class="flex  items-center -mx-3">
                    <div class="w-full sm:w-auto px-3 mb-3 sm:mb-0">
                      <input name="course_title" id="course_title" type="text"
                             class="block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg"
                             placeholder="Software Development I" bind:value={course_title}>
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
                    <div class="w-full sm:w-auto px-3 mb-3 sm:mb-0">
                      <input name="course_prefix" id="course_prefix" type="text"
                             class="block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg"
                             placeholder="CS101" bind:value={course_prefix}>
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
                    <div class="w-full sm:w-auto px-3 mb-3 sm:mb-0">
                      <input name="course_number" id="course_number" type="text"
                             class="block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg"
                             placeholder="12345" bind:value={course_number}>
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
                    <div class="w-full sm:w-auto px-3 mb-3 sm:mb-0">
                      <input name="course_term" id="course_term" type="text"
                             class="block py-4 px-3 w-full text-sm text-gray-100 placeholder-gray-100 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg"
                             placeholder="Spring 2023" bind:value={course_term}>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--<CourseImage bind:files={files} />-->

            <div class="flex justify-between w-full sm:w-auto mr-6">
              <div>
                <!--Save and cancel buttons-->
                <a
                  class="inline-block py-2 px-4 mr-3 text-xs text-center font-semibold leading-normal text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200"
                  href="/dashboard/courses" >Cancel</a>
              </div>
                <input
                  class="inline-block py-2 px-4 text-sm text-center font-semibold leading-normal text-gray-200 bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-200"
                  type="submit" value="Next">
            </div>
            {:else}
                <form>
                <CourseImage bind:courseID={currentCourseId}/>
                </form>
                <button class="inline-block py-2 px-4 text-xs text-center font-semibold leading-normal text-gray-200 bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-200"
                        on:click={() => handleSteps(2)}>
                    Next
                </button>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </section>
</form>
</div>
</body>

