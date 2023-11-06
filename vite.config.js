import { sveltekit } from '@sveltejs/kit/vite';
import { esbuildCommonjs, viteCommonjs } from "@originjs/vite-plugin-commonjs";
import postcss from "postcss";


const config = {
	plugins: [
		sveltekit(),
		viteCommonjs(),
		postcss()
	],
	esbuildOptions:{
		plugins:[
			esbuildCommonjs(['sswr'])
		]
	},
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	ssr: {
		noExternal: ['svelte-lazyimage-cache', 'react-image-file-resizer.js', 'svelte-awesome-icons', '@event-calendar'],
		external: ['quill']
	},
	define: {
		__PROJECT_PATH__: `"${process.cwd()}/"`,
	},
};

export default config;
