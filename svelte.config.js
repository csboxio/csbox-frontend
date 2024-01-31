//import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-cloudflare-workers';

import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],

	vitePlugin: {
		prebundleSvelteLibraries: false
	},
	kit: {
		adapter: adapter(),
		csrf: {
			checkOrigin: false,
		},
		optimizeDeps: {
			include: ['@stitches/core'],
		},
	}
};

export default config;
