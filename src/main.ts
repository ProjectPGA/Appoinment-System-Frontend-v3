import { createHead } from '@vueuse/head';
import { createApp } from 'vue';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { createPinia } from 'pinia';
import Toast, { PluginOptions } from 'vue-toastification';

import router from './routes/router';
import i18n from './localization';

import './styles/main.scss';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

const toastOptions: PluginOptions = {
  transition: 'fade',
  timeout: 4000,
};

const pinia = createPinia();
const app = createApp(App);
const head = createHead();

library.add(fas, far, fab);
pinia.use(
  createPersistedState({
    auto: true,
  })
);
app.use(pinia).use(head).use(i18n).use(router).use(Toast, toastOptions);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount('#app');
