<script lang="ts">
    export let data
    let { supabase, session, claim } = data
    $: ({ supabase, session, claim } = data)
</script>

{session}
{claim}