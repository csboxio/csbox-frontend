<script lang="ts">
	import { page } from '$app/stores';
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import * as url from "url";
    import {faExternalLink} from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa/src/fa.svelte';

	export let data

	let { session } = data
	$: ({ session } = data)

    let csbox_url;



</script>

<body class="dark:bg-gray-600  bg-gray-100 antialiased bg-body text-body font-body">

    {#if !session}
        <button class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type="button" on:click={() => {goto('/lti/auth');}}>
            Authorize
            <span class="inline-block align-middle ml-2">
                    <div>
                        <Fa icon={faExternalLink}/>
                    </div>
                </span>
        </button>
        {:else}
        SESSION
    {/if}
    {$page.data.session}
</body>
