import path from 'path';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
const { createVuePlugin } = require('vite-plugin-vue2');

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue', '.json']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '@/styles/common/variables.scss';
          @import '@/styles/common/mixin.scss';`,
      }
    }
  },
  plugins: [
    createVuePlugin(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/**/*.ts']
    })
  ],
  server: {
    proxy: {
      '/hb-weber/usermng/genVerificationCode': {
        target: 'http://10.1.193.42:8081/',
      },
      '/hb-weber': {
        target: 'http://10.1.193.42:8081/',
      },
    }
  }
});
