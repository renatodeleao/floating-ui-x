import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@src': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.js'),
      formats: ['es', 'esm', 'umd'],
      name: 'FloatingUIVueDOMInteractions',
      // the proper extensions will be added
      fileName: 'floating-ui-x-vue-interactions',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'vue',
        '@floating-ui/core',
        '@floating-ui/dom',
        'floating-ui-x-vue',
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          '@floating-ui/core': 'FloatingUICore',
          '@floating-ui/dom': 'FloatingUIDOM',
          'floating-ui-x-vue': 'FloatingUIVueDOM',
        },
      },
    },
  },
});
