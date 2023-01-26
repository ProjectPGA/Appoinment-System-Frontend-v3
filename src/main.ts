import { createHead } from '@vueuse/head';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast, { PluginOptions } from 'vue-toastification';

import router from './routes/router';
import i18n from './localization';

import './styles/main.scss';
import App from './App.vue';

const toastOptions: PluginOptions = {
  transition: 'fade',
  timeout: 4000,
};

const pinia = createPinia();
const app = createApp(App);
const head = createHead();

app.use(pinia).use(head).use(i18n).use(router).use(Toast, toastOptions);

app.mount('#app');
