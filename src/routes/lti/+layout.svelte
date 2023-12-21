<script lang="ts">
    import { page } from '$app/stores'
    import Transition from "$lib/fun/Transition.svelte";
</script>

<Transition url={$page.url}>
<slot/>
</Transition>
