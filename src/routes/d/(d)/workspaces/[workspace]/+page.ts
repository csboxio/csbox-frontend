export async function load({ request }) {
    const url = 'http://vscode.dev/';
    const response = await fetch(url);
    return {
        props: {
            embeddedContent: await response.text(),
        },
        // Set CORS headers for this specific route
        headers: {
            'Access-Control-Allow-Origin': 'vscode.dev', // Replace with your actual domain
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    };
}