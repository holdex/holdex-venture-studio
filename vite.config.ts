import rimraf from 'rimraf'
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import viteRollbar from './src/builder/rollbar';

const rollbarConfig = {
	accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
	version: '1.0',
	baseUrl: process.env.PUB_APP_URL,
	ignoreUploadErrors: true,
	silent: true
};

export default defineConfig({
	plugins: [
		sveltekit(),
		viteRollbar(rollbarConfig),
		{
			name: 'sourcemap-cleanup',
			apply: 'build',
			enforce: 'post',
			async closeBundle() {
				console.log('sourcemap-cleanup: deleting all .map files')
				rimraf('./.svelte-kit/**/*.map').catch((err: any) => {
					if (err) console.error(err)
				})
			},
		},
	],
	server: {
		port: 3000
	},
	build: {
		sourcemap: true,
	},
	optimizeDeps: {
		esbuildOptions: {
			define: {},
		},
	},
});
