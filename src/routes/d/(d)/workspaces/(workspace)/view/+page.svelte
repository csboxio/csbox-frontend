<script lang="ts">
    import {page} from "$app/stores";
    import ViewWorkspaces from "$lib/workspaces/blocks/ViewWorkspaces.svelte";

    /** @type {import('./$types').PageData | null} */
    export let data

    let {supabase, session} = data
    $: ({supabase, session} = data)

    let active_workspaces;
    $: active_workspaces = data.active_workspaces;

    let healthcheck;
    $: healthcheck = $page.data.health_check

    let ide;
    $: ide = $page.data.ide;

</script>

<!-- View Workspaces Block -->
<ViewWorkspaces bind:active_workspaces={active_workspaces}
                bind:healthcheck={healthcheck}
                bind:ide={ide} />

