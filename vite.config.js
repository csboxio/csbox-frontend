import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	ssr: {
		noExternal: ['svelte-lazyimage-cache', 'react-image-file-resizer.js'],
		external: ['quill']
	},
	define: {
		__PROJECT_PATH__: `"${process.cwd()}/"`,
	}

};

export default config;
