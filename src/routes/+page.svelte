<script lang="ts">
    import { supabaseClient } from '$lib/supabaseClient'
    import { page } from '$app/stores'
    import Account from './Account.svelte'
    import Auth from './Auth.svelte'

    import type { ActionData } from './$types';
    import { applyAction, enhance, type SubmitFunction } from '$app/forms';
    import { invalidate } from '$app/navigation';
    export let form: ActionData;
    let loading = false;
    const handleSubmit: SubmitFunction = () => {
        loading = true;
        return async ({ result }) => {
            if (result.type === 'redirect') {
                await invalidate('supabase:auth');
            } else {
                await applyAction(result);
            }
            loading = false;
        };
    };
</script>


{#if !$page.data.session}
    <Auth />
{:else}
    <h1>Welcome {$page.data.session.user.email}</h1>
    <p>I am logged in!</p>

    <Account session={$page.data.session} />
{/if}