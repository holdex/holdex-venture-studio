import rimraf from 'rimraf';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit(),
    {
      name: 'sourcemap-cleanup',
      apply: 'build',
      enforce: 'post',
      closeBundle: async () => {
        console.log('sourcemap-cleanup: deleting all .map files');
        rimraf('./.svelte-kit/**/*.map').catch((err: any) => {
          if (err) console.error(err);
        });
      },
    },
  ],
  server: {
    host: '127.0.0.1',
    port: 3000,
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
