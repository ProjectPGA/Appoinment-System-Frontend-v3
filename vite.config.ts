import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/vite-plugin-vue-i18n';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    vueI18n({
      runtimeOnly: false,
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      // compositionOnly: false,

      // you need to set i18n resource including paths !
      include: path.resolve(__dirname, './src/localization/locales/**/*'),
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "/src/styles/utilities.scss";
        `,
      },
    },
  },
});
