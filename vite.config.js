import { sveltekit } from '@sveltejs/kit/vite';
import { esbuildCommonjs, viteCommonjs } from "@originjs/vite-plugin-commonjs";


const config = {
	plugins: [
		sveltekit(),
		viteCommonjs()
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
		noExternal: ['svelte-lazyimage-cache', 'react-image-file-resizer.js', 'svelte-awesome-icons'],
		external: ['quill']
	},
	define: {
		__PROJECT_PATH__: `"${process.cwd()}/"`,
	}

};

export default config;
