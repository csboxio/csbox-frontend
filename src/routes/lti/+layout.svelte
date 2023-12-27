<script lang="ts">
    import { page } from '$app/stores'
    import Transition from "$lib/fun/Transition.svelte";
    import {onMount} from "svelte";
    import {invalidateAll} from "$app/navigation";

    export let data

    let {supabase} = data
    $: ({supabase} = data)


</script>

<body class="dark:bg-gray-600">
<Transition url={$page.url}>
<slot/>
</Transition>
</body>
