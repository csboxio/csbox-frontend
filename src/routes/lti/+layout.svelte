<script lang="ts">
    import { page } from '$app/stores'
    import Transition from "$lib/fun/Transition.svelte";
</script>

<body class="dark:bg-gray-600">
<Transition url={$page.url}>
<slot/>
</Transition>
</body>
