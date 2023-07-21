<script>
    const websiteURL = 'https://vscode.dev/';
    import WorkspaceEmbed from "$lib/embed/workspace/workspaceEmbed.svelte";
    const nonce = '5d26eb7f-3500-4abb-8387-8b9c88201ad9';
</script>

<style>
    .embed-container {
        width: 800px;
        height: 600px;
    }
</style>

<div class="embed-container">
    <WorkspaceEmbed
    url={websiteURL}
    nonce={nonce}/>
</div>
