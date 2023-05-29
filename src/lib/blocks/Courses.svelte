<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import { browser } from "$app/environment";
  import { blur } from "svelte/transition";
  import { page } from "$app/stores";
  import { supabaseClient } from "../utilities/supabaseClient.js";

  export let courses
  export let hoverID


  async function handleHideCourse(course_id, pid) {
    console.log($page.data.session?.user.id, pid)
    const { error, data, status } = await supabaseClient.rpc('hide_course',
      {_user_id: pid, _course_id: course_id})
    console.log(error, data, status)
    if (status === 200) {
      //delete_model_close();
      await invalidateAll();
    }
    invalidateAll();
  }
</script>
<div class="container m-6">

  <div class="flex flex-wrap -mx-12 -mb-2">

    <!--Each course-->
    {#if courses}
      {#each courses as { id, inserted_at, course_image_url, course_title, course_prefix, course_number, course_term, hidden }, i}
        {#if !hidden}
          <div class="relative mb-8 mx-4 cursor-pointer">
            <div class=" min-w-xs max-w-xs">
              <div class="relative group">
                <a on:click={() => goto(`/d/courses/${id}`)}>
                  <div
                    class="absolute group-hover:scale-105 -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-400 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-1500 group-hover:duration-200"></div>
                  <div>
                    <div
                      class="relative p-6 bg-gray-700 rounded-xl group-hover:scale-105 transition|local duration-1500"
                    >
                      <img
                        src={course_image_url === null ? 'https://dummyimage.com/150x150/000/fff' : course_image_url + '?t=' + inserted_at}
                        class="relative inline-flex items-center justify-center w-20 h-20 mb-6 rounded-lg drop-shadow-2xl bg-gray-600"
                        alt='Course Image'
                      />
                      <a
                        on:click|stopPropagation={() => {
															hoverID = i;
															open = true;
														}}
                      >
                        <div
                          class=" inline-block absolute top-1 right-0 m-5 text-gray-300 hover:text-gray-200"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewbox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </a>
                      <h4 class="text-xl text-white font-bold mb-3">
                        {course_title === '' ? 'Course Name' : course_title}
                      </h4>
                      <h4 class="text-xl text-white font-bold mb-1">
                        {course_prefix === '' ? 'Empty' : course_prefix}
                        {course_number}
                      </h4>
                      <h4 class="text-gray-300 mb-1">{course_term}</h4>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          {#if hoverID === i && open && browser}
            <div transition:blur|local={{ duration: 200 }} id="edit" class="relative z-10">
              <div
                class="absolute block rounded-md bg-gray-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="text-sm text-gray-900 dark:text-white">
                  <div
                    class="p-2 truncate font-bold hover:underline hover:bg-gray-700 w-24 cursor-pointer"
                  >
                    Edit
                  </div>
                  <div
                    on:click={() => handleHideCourse(id, $page.data.session.user.id)}
                    class="p-2 truncate font-bold hover:underline hover:bg-gray-700 hover:text-red-400 cursor-pointer"
                  >
                    Delete
                  </div>
                </div>
                <div
                  class="inline-block absolute top-0 right-0 m-2 text-gray-300 hover:text-gray-100 hover:scale-110 cursor-pointer"
                  on:click|stopPropagation={() => {
												open = false;
											}}
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          {/if}
        {/if}
      {/each}
    {/if}

    <!--No courses found-->
    {#if courses.length === 0}
      <div
        class="flex p-4 ml-6 mb-6 mt-6 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
        role="alert"
      >
        <svg
          aria-hidden="true"
          class="flex-shrink-0 inline w-5 h-5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">Not enrolled in any courses...</span>
        </div>
      </div>
    {/if}
  </div>

</div>