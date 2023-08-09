//import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-cloudflare-workers';
import adapterStatic from '@sveltejs/adapter-static'
import adapterNode from '@sveltejs/adapter-node'

import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	vitePlugin: {
		prebundleSvelteLibraries: false
	},
	kit: {
		adapter: adapterNode(),
	}
};

export default config;
