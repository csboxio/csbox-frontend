<script lang="ts">
  import { blur } from 'svelte/transition'
  import { browser } from "$app/environment";
  import dayjs from "dayjs";
  import { applyAction, deserialize } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";

  export let data;

  let model;
  let loading;
  export let show_create_box;

  let modules
  $: modules = $page.data.modules


  function show_box() {
    show_create_box = true;
  }

  function close_box() {
    show_create_box = false;
  }

  let left = 600;
  let top = 200;


  function dragMe(node) {
    let moving = false;

    if (browser) {
      // Window scrolling Y changing saves state when close and open.
      top = top + window.scrollY
      node.style.position = 'absolute';
      node.style.top = `${top}px`;
      node.style.left = `${left}px`;
      node.style.cursor = 'move';
      node.style.userSelect = 'none';

      node.addEventListener('mousedown', () => {
        moving = true;
      });

      window.addEventListener('mousemove', (e) => {
        if (moving) {
          // devicePixelRatio fixes zoomed in browser movement.
          left += e.movementX;
          top += e.movementY;
          node.style.top = `${top}px`;
          node.style.left = `${left}px`;
        }
      });

      window.addEventListener('mouseup', () => {
        moving = false;
      });
    }
  }

  async function handleSubmit(event) {
    loading = true;
    const data = new FormData(this);


    const response = await fetch(this.action, {
      method: 'POST',
      body: data,
      headers: {
        'x-sveltekit-action': 'true',
        'cache-control': 'max-age=3600'
      }
    });

    const result = deserialize(await response.text());

    if (result.type === 'success') {
      // re-run all `load` functions, following the successful update
      close_box()
      await invalidateAll();
    }

    await applyAction(result);
  }

    let clicked_id;
    let open_modules = [];
    function show_module(num) {
      console.log(num, open_modules)
      if (open_modules[num] == false)
      {
        open_modules[num] == true
        console.log(num, open_modules)
      }

      else
        open_modules.splice(num, 1)
      console.log(num, open_modules)
    }


</script>

<div class="flex flex-row">
    <section class="p-1">
        <div class="container">
            <h4 class="text-xl font-bold text-white -mx-auto my-5">Modules</h4>
          <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
                  on:click={show_box}>
                <span class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
                  Create
              </span>
          </button>
            <div class="flex flex-col -mx-20 my-2 pl-14 -mb-6 text-white font-semibold ">
              {#each modules as {module_title}, i}
              <div transition:blur|local="{{duration: 200}}" class="mb-6 mx-6 cursor-pointer" >

                <!--Module-->
                <div id="accordionExample5">
                    <div
                      class="rounded-t-lg  border border-neutral-200 bg-gray-500  dark:border-neutral-600 dark:bg-neutral-800">
                        <h2 class="mb-0" id="headingOne5">

                            <button
                              class=" group relative flex w-full items-center rounded-t-[15px] border-0 bg-gray-500  py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-gray-600 [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                              on:click={() => {clicked_id === i ? clicked_id = undefined : clicked_id = i;}}
                              type="button">
                              <span
                                class=" -mr-1 h-5 shrink-0 rotate-[-180deg]">
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
                              {module_title}

                              <span
                                class="ml-auto">
                              <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                   xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                      clip-rule="evenodd"></path>
                              </svg>
                              </span>


                            </button>
                        </h2>
                        <div
                          id="collapseOne5"
                          class="!visible {clicked_id === i ? '' : 'hidden' }"
                        >
                            <div class="py-4 px-5">
                                <strong>Things go in here</strong>
                            </div>
                        </div>
                    </div>
                </div>
                <!--End of module-->


            </div>
                {/each}
        </div>
        </div>
    </section>
</div>

{#if show_create_box}
  <!-- Main modal -->
  <div use:dragMe class="z-1000 fixed top-1/2 left-1/2 ">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto ">
      <!-- Modal content -->
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-700 sm:p-5 ">
        <!-- Modal header -->
        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600 ">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Add Module
          </h3>
          <button type="button" on:click={close_box}
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="defaultModal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form method="POST" action="?/createModule" on:submit|preventDefault={handleSubmit}>
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label for="name"
                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Module Name</label>
              <input type="text" name="name" id="name"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     placeholder="Module Name" required="">
            </div>



          </div>
          <button type="submit"
                  class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"></path>
            </svg>
            Add new module
          </button>
        </form>
      </div>
    </div>
  </div>
{/if}
