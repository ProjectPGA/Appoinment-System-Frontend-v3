import Toast, { PluginOptions, POSITION } from 'vue-toastification';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { createHead } from '@vueuse/head';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import 'vue-toastification/dist/index.css';

import router from './routes/router';
import i18n from './localization';

import './styles/main.scss';
import App from './App.vue';

import { Timeout, Transition } from '@/models/VueToastOptions';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

const toastOptions: PluginOptions = {
  transition: Transition.BOUNCE,
  timeout: Timeout.DEFAULT,
  position: POSITION.BOTTOM_LEFT,
};

const pinia = createPinia();
const app = createApp(App);
const head = createHead();

import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

initializeFaro({
  url: 'https://faro-collector-prod-us-west-0.grafana.net/collect/9ec2a2c60392b9885f0d81aeaffe6237',
  app: {
    name: 'Appointment System',
    version: '1.0.0',
    environment: 'production',
  },

  instrumentations: [
    // Mandatory, overwriting the instrumentations array would cause the default instrumentations to be omitted
    ...getWebInstrumentations(),

    // Initialization of the tracing package.
    // This packages is optional because it increases the bundle size noticeably. Only add it if you want tracing data.
    new TracingInstrumentation(),
  ],
});

library.add(fas, far, fab);
pinia.use(
  createPersistedState({
    auto: true,
  })
);
app.use(pinia).use(head).use(i18n).use(router).use(Toast, toastOptions);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount('#app');
