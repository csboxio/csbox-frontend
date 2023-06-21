<script lang="ts">
  import {page} from "$app/stores";
  import { DarkMode } from "flowbite-svelte";
  import { navStore } from "../stores/stores.js";
  export const prerender = false;
  export const ssr = false;

  const navItems = [
    { url: '/d/', id: "d", svg: '<svg class="svelte-fa svelte-1cj2gr0 " style="height:1em;line-height:.75em;font-size:1.33333em;vertical-align:-.225em;transform-origin:center;overflow:visible" viewBox="0 0 512 512" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg"><g transform="translate(256 256)" transform-origin="128 0"><g transform="translate(0,0) scale(1,1)"><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-15.9-5.8-30.4-15.3-41.6l76.6-147.4c6.1-11.8 1.5-26.3-10.2-32.4s-26.2-1.5-32.4 10.2L262.1 288.3c-2-.2-4-.3-6.1-.3c-35.3 0-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64z" fill="currentColor" transform="translate(-256 -256)"></path></g></g></svg>' },
    { url: '/d/courses', id: "courses", svg: '<svg class="svelte-fa svelte-1cj2gr0" style="height:1em;line-height:.75em;font-size:1.33333em;vertical-align:-.225em;transform-origin:center;overflow:visible" viewBox="0 0 448 512" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg"><g transform="translate(224 256)" transform-origin="112 0"><g transform="translate(0,0) scale(1,1)"><path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" fill="currentColor" transform="translate(-224 -256)"></path></g></g></svg>' },
    { url: '/d/workspaces', id: "workspaces", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" aria-label="server" viewBox="0 0 512 512"><path d="M64 32C28.7 32 0 60.7 0 96v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM344 152c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zm96-24c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24zM64 288c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V352c0-35.3-28.7-64-64-64H64zM344 408c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zm104-24c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24z"></path></svg>' },
    { url: '#1', id: "1", svg: '<svg class="svelte-fa svelte-1cj2gr0" style="height:1em;line-height:.75em;font-size:1.33333em;vertical-align:-.225em;transform-origin:center;overflow:visible" viewBox="0 0 448 512" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg"><g transform="translate(224 256)" transform-origin="112 0"><g transform="translate(0,0) scale(1,1)"><path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z" fill="currentColor" transform="translate(-224 -256)"></path></g></g></svg>' },
    { url: '#2', id: "2", svg: '<svg class="svelte-fa svelte-1cj2gr0" style="height:1em;line-height:.75em;font-size:1.33333em;vertical-align:-.225em;transform-origin:center;overflow:visible" viewBox="0 0 512 512" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg"><g transform="translate(256 256)" transform-origin="128 0"><g transform="translate(0,0) scale(1,1)"><path d="M121 32C91.6 32 66 52 58.9 80.5L1.9 308.4C.6 313.5 0 318.7 0 323.9V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V323.9c0-5.2-.6-10.4-1.9-15.5l-57-227.9C446 52 420.4 32 391 32H121zm0 64H391l48 192H387.8c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7H195.8c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7H73L121 96z" fill="currentColor" transform="translate(-256 -256)"></path></g></g></svg>' },
    { url: '#3', id: "3", svg: '<svg class="svelte-fa svelte-1cj2gr0" style="height:1em;line-height:.75em;font-size:1.33333em;vertical-align:-.225em;transform-origin:center;overflow:visible" viewBox="0 0 512 512" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg"><g transform="translate(256 256)" transform-origin="128 0"><g transform="translate(0,0) scale(1,1)"><path d="M481.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-30.9 28.1c-7.7 7.1-11.4 17.5-10.9 27.9c.1 2.9 .2 5.8 .2 8.8s-.1 5.9-.2 8.8c-.5 10.5 3.1 20.9 10.9 27.9l30.9 28.1c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-39.7-12.6c-10-3.2-20.8-1.1-29.7 4.6c-4.9 3.1-9.9 6.1-15.1 8.7c-9.3 4.8-16.5 13.2-18.8 23.4l-8.9 40.7c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-8.9-40.7c-2.2-10.2-9.5-18.6-18.8-23.4c-5.2-2.7-10.2-5.6-15.1-8.7c-8.8-5.7-19.7-7.8-29.7-4.6L69.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l30.9-28.1c7.7-7.1 11.4-17.5 10.9-27.9c-.1-2.9-.2-5.8-.2-8.8s.1-5.9 .2-8.8c.5-10.5-3.1-20.9-10.9-27.9L8.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l39.7 12.6c10 3.2 20.8 1.1 29.7-4.6c4.9-3.1 9.9-6.1 15.1-8.7c9.3-4.8 16.5-13.2 18.8-23.4l8.9-40.7c2-9.1 9-16.3 18.2-17.8C213.3 1.2 227.5 0 242 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l8.9 40.7c2.2 10.2 9.4 18.6 18.8 23.4c5.2 2.7 10.2 5.6 15.1 8.7c8.8 5.7 19.7 7.7 29.7 4.6l39.7-12.6c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM242 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" fill="currentColor" transform="translate(-256 -256)"></path></g></g></svg>' }
  ];

  let selectedNav;



  function selectNav(route) {
    navStore.set(route);
  }


</script>

<div class="z-1 relative">
  <nav class="lg:hidden flex items-center justify-between p-8 bg-gray-700  mb-3">
    <div class="w-full xl:w-auto px-2 xl:mr-12">
      <div class="flex items-center justify-between">
        <a class="inline-flex items-center h-8" href="{'#'}">
          <img class="object-contain" src="" alt="">
        </a>
        <div class="xl:hidden">
          <button class="navbar-burger text-gray-400 hover:text-gray-300 focus:outline-none">
            <svg class="svelte-fa svelte-1cj2gr0" style="height:1em;line-height:.75em;font-size:1.33333em;vertical-align:-.225em;transform-origin:center;overflow:visible" viewBox="0 0 448 512" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg"><g transform="translate(224 256)" transform-origin="112 0"><g transform="translate(0,0) scale(1,1)"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" fill="currentColor" transform="translate(-224 -256)"></path></g></g></svg>
              <title>Mobile menu</title>
          </button>
        </div>
      </div>
    </div>
  </nav>
  <div class="hidden lg:block navbar-menu relative z-10">
    <div class="lg:hidden navbar-backdrop fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50"></div>
    <nav class="fixed top-0 left-0 bottom-0 max-w-max flex flex-col h-full py-6 px-4 dark:bg-gray-700 bg-white overflow-auto">
      <a class="inline-block mb-4" href={'#'}>
        <img class="object-contain h-7 my-2 mx-auto" src="/cloud.png" alt="">
      </a>
      <div class="mb-6">
        <ul>
          {#each navItems as item}
            <li>
            <li class:active={$navStore === item.id} on:click={() => $navStore = item.id}>

            <a  class="flex items-center justify-center w-12 h-12 rounded-xl hover:bg-gray-800 mb-2"
                 on:click={() => $navStore = item.id}
                 class:text-gray-400={$navStore !== item.id}
                 class:text-blue-500={$navStore === item.id}
                 href={item.url}
                 sveltekit:prefetch
              >
                {@html item.svg}
              </a>
            </li>
          {/each}
        </ul>
      </div>
      <div class="mt-auto">
        <DarkMode class="flex items-center justify-center w-12 h-12 text-lg">
          <svelte:fragment slot="lightIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6ZM5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z"/></svg>
          </svelte:fragment>
          <svelte:fragment slot="darkIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3Z"/></svg>
          </svelte:fragment>
        </DarkMode>
        <a class="flex items-center justify-center w-12 h-12 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-gray-800" href={'#'}>
          <svg width="20" height="22" viewbox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.71 11.7099C14.6904 10.9385 15.406 9.8808 15.7572 8.68382C16.1085 7.48684 16.0779 6.21015 15.6698 5.03135C15.2617 3.85255 14.4963 2.83027 13.4801 2.10674C12.4639 1.3832 11.2474 0.994385 10 0.994385C8.75255 0.994385 7.53611 1.3832 6.51993 2.10674C5.50374 2.83027 4.73834 3.85255 4.33021 5.03135C3.92208 6.21015 3.89151 7.48684 4.24276 8.68382C4.59401 9.8808 5.3096 10.9385 6.29 11.7099C4.61007 12.3829 3.14428 13.4992 2.04889 14.9398C0.953495 16.3804 0.26956 18.0912 0.0699967 19.8899C0.0555513 20.0212 0.0671132 20.1541 0.104022 20.2809C0.140931 20.4078 0.202464 20.5261 0.285108 20.6292C0.452016 20.8374 0.69478 20.9707 0.959997 20.9999C1.22521 21.0291 1.49116 20.9517 1.69932 20.7848C1.90749 20.6179 2.04082 20.3751 2.07 20.1099C2.28958 18.1551 3.22168 16.3497 4.68822 15.0387C6.15475 13.7277 8.0529 13.0029 10.02 13.0029C11.9871 13.0029 13.8852 13.7277 15.3518 15.0387C16.8183 16.3497 17.7504 18.1551 17.97 20.1099C17.9972 20.3556 18.1144 20.5825 18.2991 20.7469C18.4838 20.9113 18.7228 21.0014 18.97 20.9999H19.08C19.3421 20.9697 19.5817 20.8372 19.7466 20.6311C19.9114 20.4251 19.9881 20.1622 19.96 19.8999C19.7595 18.0961 19.0719 16.3809 17.9708 14.9381C16.8698 13.4953 15.3969 12.3794 13.71 11.7099ZM10 10.9999C9.20887 10.9999 8.43551 10.7653 7.77772 10.3258C7.11992 9.88623 6.60723 9.26152 6.30448 8.53061C6.00173 7.79971 5.92251 6.99544 6.07686 6.21952C6.2312 5.4436 6.61216 4.73086 7.17157 4.17145C7.73098 3.61204 8.44371 3.23108 9.21964 3.07674C9.99556 2.9224 10.7998 3.00161 11.5307 3.30436C12.2616 3.60711 12.8863 4.1198 13.3259 4.7776C13.7654 5.4354 14 6.20876 14 6.99988C14 8.06075 13.5786 9.07816 12.8284 9.82831C12.0783 10.5785 11.0609 10.9999 10 10.9999Z" fill="currentColor"></path>
          </svg>
        </a>
        <a class="flex items-center justify-center w-12 h-12 rounded-xl text-gray-400 hover:text-blue-500 bg-gray-800" href={'#'}>
          <svg width="20" height="20" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.59 11.0001L8.29 13.2901C8.19627 13.3831 8.12188 13.4937 8.07111 13.6155C8.02034 13.7374 7.9942 13.8681 7.9942 14.0001C7.9942 14.1321 8.02034 14.2628 8.07111 14.3847C8.12188 14.5065 8.19627 14.6171 8.29 14.7101C8.38296 14.8038 8.49356 14.8782 8.61542 14.929C8.73728 14.9798 8.86799 15.0059 9 15.0059C9.13201 15.0059 9.26272 14.9798 9.38458 14.929C9.50644 14.8782 9.61704 14.8038 9.71 14.7101L13.71 10.7101C13.801 10.615 13.8724 10.5029 13.92 10.3801C14.02 10.1366 14.02 9.86356 13.92 9.6201C13.8724 9.49735 13.801 9.3852 13.71 9.2901L9.71 5.2901C9.61676 5.19686 9.50607 5.1229 9.38425 5.07244C9.26243 5.02198 9.13186 4.99601 9 4.99601C8.86814 4.99601 8.73757 5.02198 8.61575 5.07244C8.49393 5.1229 8.38324 5.19686 8.29 5.2901C8.19676 5.38334 8.1228 5.49403 8.07234 5.61585C8.02188 5.73767 7.99591 5.86824 7.99591 6.0001C7.99591 6.13196 8.02188 6.26253 8.07234 6.38435C8.1228 6.50617 8.19676 6.61686 8.29 6.7101L10.59 9.0001H1C0.734784 9.0001 0.48043 9.10546 0.292893 9.29299C0.105357 9.48053 0 9.73488 0 10.0001C0 10.2653 0.105357 10.5197 0.292893 10.7072C0.48043 10.8947 0.734784 11.0001 1 11.0001H10.59ZM10 9.96937e-05C8.13109 -0.00824409 6.29724 0.507313 4.70647 1.48829C3.11569 2.46927 1.83165 3.87641 1 5.5501C0.880653 5.78879 0.861015 6.06512 0.945406 6.3183C1.0298 6.57147 1.21131 6.78075 1.45 6.9001C1.68869 7.01945 1.96502 7.03909 2.2182 6.95469C2.47137 6.8703 2.68065 6.68879 2.8 6.4501C3.43219 5.17342 4.39383 4.08872 5.58555 3.30809C6.77727 2.52746 8.15582 2.07922 9.57876 2.00969C11.0017 1.94017 12.4174 2.25188 13.6795 2.91261C14.9417 3.57334 16.0045 4.55913 16.7581 5.7681C17.5118 6.97706 17.9289 8.36535 17.9664 9.78948C18.0039 11.2136 17.6605 12.6219 16.9715 13.8689C16.2826 15.1159 15.2731 16.1563 14.0475 16.8825C12.8219 17.6088 11.4246 17.9946 10 18.0001C8.50888 18.0066 7.04615 17.5925 5.77969 16.8053C4.51323 16.0182 3.49435 14.89 2.84 13.5501C2.72065 13.3114 2.51137 13.1299 2.2582 13.0455C2.00502 12.9611 1.72869 12.9808 1.49 13.1001C1.25131 13.2194 1.0698 13.4287 0.985406 13.6819C0.901015 13.9351 0.920653 14.2114 1.04 14.4501C1.83283 16.0456 3.03752 17.4003 4.52947 18.3741C6.02142 19.348 7.74645 19.9055 9.52612 19.9891C11.3058 20.0727 13.0755 19.6793 14.6521 18.8496C16.2288 18.0199 17.5552 16.7841 18.4941 15.2699C19.433 13.7558 19.9503 12.0182 19.9925 10.2371C20.0347 8.45597 19.6003 6.69589 18.7342 5.13893C17.8682 3.58197 16.6018 2.28467 15.0663 1.38121C13.5307 0.477745 11.7816 0.000936146 10 9.96937e-05Z" fill="currentColor"></path>
          </svg>
        </a>
      </div>
    </nav>
  </div>
</div>