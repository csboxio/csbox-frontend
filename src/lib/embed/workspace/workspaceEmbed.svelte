<!-- src/routes/workspaceEmbed.svelte -->
<script>
    import {onMount} from "svelte";

    export let url = '';
    export let nonce = '';

    let contentContainer;

    // Fetch the website content using the server route
    async function fetchEmbeddedWebsite() {
        try {
            const response = await fetch(`${(url)}`);
            const responseBody = await response.text();
            contentContainer.innerHTML = responseBody;
        } catch (error) {
            console.error('Error fetching embedded website:', error);
            contentContainer.innerHTML = 'Error fetching embedded website';
        }
    }

    onMount(() => {
        fetchEmbeddedWebsite();
    });
</script>

<style>
    .embedded-content {
        width: 100%;
        height: 100%;
        border: none;
    }
</style>

<iframe class="embedded-iframe" src="{url}" sandbox="allow-scripts allow-same-origin"></iframe>
