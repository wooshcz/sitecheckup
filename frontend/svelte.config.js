import adapter from "@sveltejs/adapter-node";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		csrf: {
			checkOrigin: false, // ⚠️ Disable CSRF protection (ONLY for development)
		},
	},
};

export default config;
