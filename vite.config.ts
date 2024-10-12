import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import VitePluginInjectPreload from 'vite-plugin-inject-preload';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    VueI18nPlugin({
      runtimeOnly: false,
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      // compositionOnly: false,

      // you need to set i18n resource including paths !
      include: path.resolve(__dirname, './localization/locales/**/*'),
    }),
    eslint(),
    VitePluginInjectPreload({
      files: [
        {
          match: /LibreFranklin-[A-Za-z0-9]+.woff2$/,
          attributes: {
            type: 'font/woff2',
            as: 'font',
            crossorigin: 'anonymous',
          },
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern"
        additionalData: `
          @import "/src/styles/utilities.scss";
        `,
      },
    },
  },
});
