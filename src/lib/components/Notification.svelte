<script lang="ts">
  import { Toast } from "flowbite-svelte";
  import { slide } from "svelte/transition";
  import { elasticOut } from "svelte/easing";

  export let title = '';
  export let content = '';
</script>
<Toast position="bottom-right" transition={slide} params={{ delay: 20, duration: 1000 }}>
  <p class="text-blue-400 font-bold">{title}</p> <p class="text-gray-200">{content}</p>
</Toast>
