<script lang="ts">
    let model;
    export let data;
    let course_data = data.courseData
    let one_clicked;
</script>

<div class="flex flex-row">
    <section class="p-1">
        <div class="container mx-12 my-5">
            <h4 class="text-xl font-bold text-white -mx-10 my-5">Modules</h4>
            <div class="flex flex-wrap -mx-10 -mb-6 text-white font-semibold">
                <div id="accordion-collapse" data-accordion="collapse">
                    <h2 id="accordion-collapse-heading-1">
                        <button on:click={one_clicked = true} type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-blue-600 rounded-t-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-gray-800 dark:border-blue-800 dark:text-gray-400 hover:bg-gray-100" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                            <span>Module</span>
                            <svg data-accordion-icon class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </h2>
                    <div id="accordion-collapse-body-1" class="{(one_clicked === false) ? '' : 'hidden'}" aria-labelledby="accordion-collapse-heading-1">
                        <div class="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                            <p class="mb-2 text-gray-500 dark:text-gray-400">First module csbox thing. First module csbox thing.</p>
                            <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</div>
