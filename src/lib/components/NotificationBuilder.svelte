<script lang="ts">
  import { Toast } from "flowbite-svelte";
  import { slide } from "svelte/transition";
  import { elasticOut } from "svelte/easing";
  import {onMount} from "svelte";
  import { blur } from 'svelte/transition';


  export let title = '';
  export let content = '';

  let show = true;
  let counter = 6;

  function trigger() {
    show = true;
    counter = 15;
    timeout();
  }

  function timeout() {
    if (--counter > 0)
      return setTimeout(timeout, 1000);
    show = false;
  }

  onMount(() => {
    trigger();
  });
</script>
<Toast transition={blur} bind:open={show}  params={{ delay: 50, duration: 1000 }}>
  <p class="text-blue-400 font-bold text-lg">{title}</p> <p class="text-gray-200">{content}</p>
</Toast>
