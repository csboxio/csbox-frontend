<script lang="ts">
    let model;
    export let data;
    let course_data = data.courseData
    let one_clicked;

    let button_one = false;
    function test() {
        console.log('button clicked')
        button_one = !button_one
    }
</script>

<div class="flex flex-row">
    <section class="p-1">
        <div class="container mx-12 my-5">
            <h4 class="text-xl font-bold text-white -mx-10 my-5">Modules</h4>
            <div class="flex flex-wrap -mx-10 -mb-6 text-white font-semibold">

                <div id="accordionExample5">
                    <div
                      class="rounded-t-lg  border border-neutral-200 bg-gray-500  dark:border-neutral-600 dark:bg-neutral-800">
                        <h2 class="mb-0" id="headingOne5">
                            <button
                              class=" group relative flex w-full items-center rounded-t-[15px] border-0 bg-gray-500  py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-gray-600 [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                              on:click={test}
                              type="button">
                                Module 1
                                <span
                                  class=" ml-auto -mr-1 h-5 w-8 shrink-0 rotate-[-180deg]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
                            </button>
                        </h2>
                        <div
                          id="collapseOne5"
                          class="!visible {button_one ? '' : 'hidden' }"
                        >
                            <div class="py-4 px-5">
                                <strong>Things go in here</strong>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</div>
