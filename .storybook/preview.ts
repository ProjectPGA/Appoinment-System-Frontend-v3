import { setup } from '@storybook/vue3';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import type { Preview } from '@storybook/vue3';
import '../src/styles/main.scss';

import {
  MINIMAL_VIEWPORTS,
  INITIAL_VIEWPORTS,
} from '@storybook/addon-viewport';

setup(app => {
  library.add(far, fas, fab);
  app.component('FontAwesomeIcon', FontAwesomeIcon);
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        ...MINIMAL_VIEWPORTS,
        ...INITIAL_VIEWPORTS,
      },
    },
  },
};

export default preview;
