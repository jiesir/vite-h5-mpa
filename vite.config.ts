import { defineConfig } from 'vite'
import { resolve } from 'path';
import { createProxy } from './src/utils/proxy';
import { module } from './src/utils/modules';
import vue from '@vitejs/plugin-vue'
import { appInject } from './plugins/app-inject';
import { mock } from './plugins/mock-server';
import { mpa } from './plugins/mpa';
const input = {};
process.env.BUILD_INDEX = process.env.BUILD_INDEX ? process.env.BUILD_INDEX : "0";
module[process.env.BUILD_INDEX].list.forEach(ele => {
  input[ele] = resolve(__dirname, `${ele}.html`);
});

export default defineConfig({
  base: './',
  server: {
    host: 'localhost',
    port: 8888,
    open: '/DM/DM0/DM0001.html',
    proxy: createProxy(process.env.SERVER_PROXY)
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }, { find: '@components', replacement: resolve(__dirname, './static/es') }]
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/styles/utils/var.less";`
      }
    }
  },
  plugins: [vue(), appInject(), mock(), mpa()],
  optimizeDeps: {
    include: ["vue", "vuex", "axios", "vconsole"]
  },
  build: {
    target: 'es2015',
    outDir: `./dist/${module[process.env.BUILD_INDEX].path}`,
    cssCodeSplit: false,
    rollupOptions: {
      input: input
    }
  }
})
