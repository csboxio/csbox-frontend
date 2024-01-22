<script lang="ts">
    import { page } from '$app/stores'
    import Transition from "$lib/fun/Transition.svelte";
    import {onMount} from "svelte";
    import {invalidateAll} from "$app/navigation";
    import LTIK_AUTH_ERROR from "$lib/lti/LTIK_AUTH_ERROR.svelte";

    export let data

    let {supabase} = data
    $: ({supabase} = data)

    // TODO deeplinking invalid or expired LTIK show this.
    export let error
    error = false

</script>

<body class="dark:bg-gray-600">
<Transition url={$page.url}>
    <LTIK_AUTH_ERROR bind:error={error}>
<slot/>
    </LTIK_AUTH_ERROR>
</Transition>
</body>
