import type { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      plugins: [eslintPlugin()],
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `
              @import "../src/styles/utilities.scss";
            `,
          },
        },
      },
    });
  },
};
export default config;
