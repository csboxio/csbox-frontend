<script lang="ts">
	import { page } from '$app/stores';
	import Auth from "$lib/components/Auth/Auth.svelte";
	import {browser} from "$app/environment";
	import {onMount} from "svelte";

	export let data

	let { supabase } = data
	$: ({ supabase } = data)


	onMount(() => {
		const csboxIframe = document.createElement('iframe');
		csboxIframe.src = 'https://csbox.io/auth';
		csboxIframe.addEventListener('load', () => {
			try {
				// Access the session cookie from the iframe
				const sessionCookie = csboxIframe.contentDocument.cookie;

				// Send the cookie to the parent window
				window.parent.postMessage(sessionCookie, '*');
			} catch (error) {
				console.error('Error accessing iframe content:', error);
			}
		});

		document.body.appendChild(csboxIframe);

		// Listen for the 'message' event to handle authentication
		window.addEventListener('message', (event) => {
			// Verify the sender is trusted (optional)
			// if (event.origin !== 'https://csbox.io') return;

			const receivedCookie = event.data;
			supabase.auth.setAuth({ token: receivedCookie });
		});
	});
</script>



