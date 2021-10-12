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
  plugins: [
    createVuePlugin(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/**/*.ts']
    })
  ],
  server: {
    proxy: {
      '/fm-webser/api': {
        target: 'http://10.1.193.42:8081/'
      },
      '/hb-weber/usermng/genVerificationCode': {
        target: 'http://10.1.193.42:8081/'
      }
    }
  }
});
