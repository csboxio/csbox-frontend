<script lang="ts">
	import { page } from '$app/stores';
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import * as url from "url";
	export let data

	let { supabase, session } = data
	$: ({ supabase, session } = data)

    let csbox_url;

    onMount(() => {
        csbox_url = window.origin

        console.log(csbox_url)

        function sendMessageToParent(message) {
            window.parent.postMessage(message, '*');
        }

        function sendMessageToAuthTab(message, tab) {
            tab.postMessage(message, csbox_url);
        }

        if (!session) {
            const authenticationTab = window.open(csbox_url, '_blank');
            window.addEventListener('message', (event) => {
                if (event.origin === csbox_url) {
                    const { type, token } = event.data;
                    if (type === 'authentication_token' && token) {
                        localStorage.setItem('authToken', token);
                        sendMessageToParent({ type: 'auth_token', token });
                        const access_token = token.access_token
                        const refresh_token = token.refresh_token

                        console.log(access_token, refresh_token)

                        const { data, error } = supabase.auth.setSession({
                            access_token,
                            refresh_token
                        })

                        console.log(data, error)

                        if (!error) {
                            const { data, error } = supabase.auth.refreshSession()
                            console.log(data, error)
                        }
                    }
                }
            });
            sendMessageToAuthTab({ type: 'auth_tab', tab: authenticationTab }, authenticationTab);
        }
    });

</script>

<body class="dark:bg-gray-600  bg-gray-100 antialiased bg-body text-body font-body">

    <div class="container mx-auto p-6">
        deep linking
        {session}
    </div>

    {#if !session}
        No session
        <button on:click={() => {window.open(csbox_url + '/lti/auth', '_blank');}}>Login</button>
    {/if}

</body>
