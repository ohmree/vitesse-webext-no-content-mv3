import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers';
import autoImport from 'unplugin-auto-import/vite';
// @ts-expect-error: this has no types.
import openInEditor from 'launch-editor-middleware';
import webExtension from 'vite-plugin-web-extension';
import { isDev, port, r } from './scripts/utils';
import manifest from './scripts/manifest';

const browser: string = process.env.TARGET_BROWSER ?? 'chrome';

export default defineConfig(({ command }) => ({
  root: r('src'),
  envDir: r('.'),
  resolve: {
    alias: {
      '~/': `${r('src')}/`,
    },
  },
  define: {
    __DEV__: isDev,
  },
  base: command === 'serve' ? `http://localhost:${port}/` : '/',
  server: {
    port,
    hmr: {
      host: 'localhost',
    },
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),

    autoImport({
      imports: [
        'vue',
        {
          'webextension-polyfill': [['*', 'browser']],
        },
      ],
      dts: r('src/auto-imports.d.ts'),
    }),

    // https://github.com/antfu/unplugin-vue-components
    components({
      dirs: [r('src/components')],
      // generate `components.d.ts` for ts support with Volar
      dts: true,
      resolvers: [
        // auto import icons
        IconsResolver({
          prefix: false,
          enabledCollections: 'prime',
        }),
        PrimeVueResolver({
          prefix: 'P',
          importIcons: true,
          importStyle: true,
        }),
        // Auto import ECharts.
        name => {
          if (name === 'VChart') {
            return { path: 'vue-echarts' };
          }
        },
      ],
    }),

    // https://github.com/antfu/unplugin-icons
    icons(),

    // TODO: figure out if we need this.
    // rewrite assets to use relative path
    // {
    //   name: 'assets-rewrite',
    //   enforce: 'post',
    //   apply: 'build',
    //   transformIndexHtml(html, { path }) {
    //     return html.replace(
    //       /"\/assets\//g,
    //       `"${relative(dirname(path), '/assets')}/`,
    //     );
    //   },
    // },

    // enable vue devtools open-in-editor
    {
      name: 'open-in-editor',
      enforce: 'pre',
      apply: 'serve',
      configureServer(server) {
        return () => {
          server.middlewares.use('/__open-in-editor', openInEditor());
        };
      },
    },
    isDev ||
      webExtension({
        assets: 'assets',
        browser,
        manifest,
      }),
  ],
  optimizeDeps: {
    include: ['vue', '@vueuse/core', 'webextension-polyfill'],
    exclude: ['vue-demi'],
  },
  build: {
    outDir: r('dist'),
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
  },
}));
