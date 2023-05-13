import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [
		sveltekit()
	],
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
