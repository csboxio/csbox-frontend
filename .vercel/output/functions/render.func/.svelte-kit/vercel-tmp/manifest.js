export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["elements/radial.svg","favicon.png","fonts/inter-v12-latin-500.eot","fonts/inter-v12-latin-500.svg","fonts/inter-v12-latin-500.ttf","fonts/inter-v12-latin-500.woff","fonts/inter-v12-latin-500.woff2","fonts/inter-v12-latin-700.eot","fonts/inter-v12-latin-700.svg","fonts/inter-v12-latin-700.ttf","fonts/inter-v12-latin-700.woff","fonts/inter-v12-latin-700.woff2","fonts/inter-v12-latin-regular.eot","fonts/inter-v12-latin-regular.svg","fonts/inter-v12-latin-regular.ttf","fonts/inter-v12-latin-regular.woff","fonts/inter-v12-latin-regular.woff2","fonts/outfit-v6-latin-500.eot","fonts/outfit-v6-latin-500.svg","fonts/outfit-v6-latin-500.ttf","fonts/outfit-v6-latin-500.woff","fonts/outfit-v6-latin-500.woff2","fonts/outfit-v6-latin-600.eot","fonts/outfit-v6-latin-600.svg","fonts/outfit-v6-latin-600.ttf","fonts/outfit-v6-latin-600.woff","fonts/outfit-v6-latin-600.woff2","fonts/outfit-v6-latin-700.eot","fonts/outfit-v6-latin-700.svg","fonts/outfit-v6-latin-700.ttf","fonts/outfit-v6-latin-700.woff","fonts/outfit-v6-latin-700.woff2","fonts/outfit-v6-latin-regular.eot","fonts/outfit-v6-latin-regular.svg","fonts/outfit-v6-latin-regular.ttf","fonts/outfit-v6-latin-regular.woff","fonts/outfit-v6-latin-regular.woff2","images/logo.png"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png",".eot":"application/vnd.ms-fontobject",".ttf":"font/ttf",".woff":"font/woff",".woff2":"font/woff2"},
	_: {
		entry: {"file":"_app/immutable/start-87dc68ef.js","imports":["_app/immutable/start-87dc68ef.js","_app/immutable/chunks/index-28f47c29.js","_app/immutable/chunks/singletons-3f3bf73b.js","_app/immutable/chunks/index-2bc87171.js","_app/immutable/chunks/browser-ponyfill-10e9505f.js","_app/immutable/chunks/supabaseClient-70197f8c.js","_app/immutable/chunks/config-89008b4d.js","_app/immutable/chunks/parse-b67c4dc9.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js'),
			() => import('../output/server/nodes/4.js'),
			() => import('../output/server/nodes/5.js'),
			() => import('../output/server/nodes/6.js'),
			() => import('../output/server/nodes/7.js'),
			() => import('../output/server/nodes/8.js'),
			() => import('../output/server/nodes/9.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/auth",
				pattern: /^\/api\/auth\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/auth/_server.ts.js')
			},
			{
				id: "/api/avatar",
				pattern: /^\/api\/avatar\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/avatar/_server.ts.js')
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/dashboard/courses",
				pattern: /^\/dashboard\/courses\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/dashboard/courses/create",
				pattern: /^\/dashboard\/courses\/create\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			},
			{
				id: "/dashboard/courses/[slug]",
				pattern: /^\/dashboard\/courses\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/dashboard/profile",
				pattern: /^\/dashboard\/profile\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 7 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 8 },
				endpoint: null
			},
			{
				id: "/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 9 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
