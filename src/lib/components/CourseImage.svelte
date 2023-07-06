<script lang="ts" xmlns="http://www.w3.org/1999/html">
  import { page } from "$app/stores";
  import { uploadCourseImage, loading } from "$lib/utilities/imageStorage.js";
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faSpinner } from '@fortawesome/free-solid-svg-icons';


  /** @type {import("./$types").PageData} */
  export let data;
  let { supabase } = data
  $: ({ supabase } = data)
  export let url;
  let size = 5;
  export let courseID;
  let uploading = false;
  export let files;
  let user = $page.data.session?.user;


  import { onMount } from 'svelte';
  import { Dashboard } from "@uppy/svelte";
  import Uppy from '@uppy/core';
  import Webcam from '@uppy/webcam';
  import XHRUpload from '@uppy/xhr-upload';

  // Don't forget the CSS: core and UI components + plugins you are using
  import '@uppy/core/dist/style.css';
  import '@uppy/dashboard/dist/style.css';
  import '@uppy/webcam/dist/style.css';
  import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";

  const SUPABASE_ANON_KEY = PUBLIC_SUPABASE_ANON_KEY;
  const SUPABASE_PROJECT_URL = PUBLIC_SUPABASE_URL;
  const STORAGE_BUCKET = 'courses';
  const supabaseUploadURL = `https://qtjsvddfdqkvkppijakb.supabase.co/storage/v1/upload`;
  const folderName = '123'
  let uppy;

  onMount(() => {
    // @ts-ignore
    uppy = new Uppy()
            .use(Webcam)
            .use(XHRUpload, {
              endpoint: supabaseUploadURL,
              retryDelays: [0, 3000, 5000, 10000, 20000],

              getResponseError (responseText, response){
                return new Error(JSON.parse(responseText).message)
              },
              headers: {
                authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                'x-upsert': 'true',
              },
              uploadDataDuringCreation: true,
              metadata: {
                bucketName: 'courses',
                objectName: 'test.png',
                contentType: 'image/png',
                cacheControl: 3600,
              },
              chunkSize: 6 * 1024 * 1024,
              onError: function (error) {
                console.log('Failed because: ' + error)
              },
              formData: true,
              fieldName: 'file',
              allowedMetaFields: ['bucketName', 'objectName', 'contentType', 'cacheControl'],

            })
    uppy.on('file-added', (file) => {
      file.meta = {
        ...file.meta,
        bucketName: STORAGE_BUCKET,
        objectName: folderName ? `${folderName}/${file.name}` : file.name,
        contentType: file.type,
      }
    })
    uppy.on('complete', (result) => {
      console.log('Upload complete! We’ve uploaded these files:', result.successful)
    })
    uppy.on('upload-error', (file, error, response) => {
      const { name } = file;
      console.log(`Failed in uploading ${name}`);
      if (response.status === 413) {
        console.log('Please check the file size');
      }
    });
  });
</script>


<main>

</main>
<div class="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
  <div class="w-full  px-4 mb-4 sm:mb-0">
    <span class="block text-sm font-medium text-gray-100">Course Icon</span>
    {#if uppy && false}
      <div class="justify-center text-center">
      <Dashboard {uppy} />
      </div>
    {/if}
    {#if url}

    {:else}
      <div class="avatar no-image" style="height: {size}em; width: {size}em;"></div>
    {/if}
  </div>
  <div class="w-full sm:w-2/3 px-3 mb-3 sm:mb-0">
    <div class="flex flex-wrap items-center -mx-3">
      <div class="">
      </div>

      <div for="single">
    <div class="w-full py-8 px-4 text-center border-dashed border border-gray-400 hover:border-white focus:border-blue-500 rounded-lg">
      <div class="relative group h-14 w-14 mx-auto mb-4">

        <input
          name="course_image"
          class="absolute top-0 left-0 h-40 w-40 opacity-0"
          type="file"
          id="course_image"
          accept="image/*"
          bind:files
          on:change={uploadCourseImage(files, courseID, user, supabase)}
          disabled={uploading}>

        <div class="flex items-center justify-center h-14 w-14 bg-blue-500 group-hover:bg-blue-600 rounded-full">
          {#if loading === false}
            <svg width="20" height="40" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.71 5.71002L9 3.41002V13C9 13.2652 9.10536 13.5196 9.29289 13.7071C9.48043 13.8947 9.73478 14 10 14C10.2652 14 10.5196 13.8947 10.7071 13.7071C10.8946 13.5196 11 13.2652 11 13V3.41002L13.29 5.71002C13.383 5.80375 13.4936 5.87814 13.6154 5.92891C13.7373 5.97968 13.868 6.00582 14 6.00582C14.132 6.00582 14.2627 5.97968 14.3846 5.92891C14.5064 5.87814 14.617 5.80375 14.71 5.71002C14.8037 5.61706 14.8781 5.50645 14.9289 5.3846C14.9797 5.26274 15.0058 5.13203 15.0058 5.00002C15.0058 4.86801 14.9797 4.7373 14.9289 4.61544C14.8781 4.49358 14.8037 4.38298 14.71 4.29002L10.71 0.290018C10.6149 0.198978 10.5028 0.127613 10.38 0.0800184C10.1365 -0.0199996 9.86346 -0.0199996 9.62 0.0800184C9.49725 0.127613 9.3851 0.198978 9.29 0.290018L5.29 4.29002C5.19676 4.38326 5.1228 4.49395 5.07234 4.61577C5.02188 4.73759 4.99591 4.86816 4.99591 5.00002C4.99591 5.13188 5.02188 5.26245 5.07234 5.38427C5.1228 5.50609 5.19676 5.61678 5.29 5.71002C5.38324 5.80326 5.49393 5.87722 5.61575 5.92768C5.73757 5.97814 5.86814 6.00411 6 6.00411C6.13186 6.00411 6.26243 5.97814 6.38425 5.92768C6.50607 5.87722 6.61676 5.80326 6.71 5.71002ZM19 10C18.7348 10 18.4804 10.1054 18.2929 10.2929C18.1054 10.4804 18 10.7348 18 11V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8947 17.2652 18 17 18H3C2.73478 18 2.48043 17.8947 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V11C2 10.7348 1.89464 10.4804 1.70711 10.2929C1.51957 10.1054 1.26522 10 1 10C0.734784 10 0.48043 10.1054 0.292893 10.2929C0.105357 10.4804 0 10.7348 0 11V17C0 17.7957 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7957 20 17V11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10Z"
                fill="#E8EDFF"></path>
            </svg>
          {:else if loading === true}
            <svg class="animate-spin h-4 w-4 mr-3 inline">
              <Fa icon={faSpinner} size="xs" />
            </svg>
          {/if}

        </div>
      </div>
    <p class="font-semibold leading-normal mb-1">
      <span class="text-blue-500">Click to upload a file</span>
      <span class="text-gray-300">or drag and drop</span>
      {uploading ? 'Uploading ...' : ''}
    </p>
      </div>
      </div>
    </div>
  </div>
</div>
