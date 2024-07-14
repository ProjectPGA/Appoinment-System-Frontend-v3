import type { Meta, StoryObj } from '@storybook/vue3';

import AsNotification from '@/library/components/atoms/as-notification/AsNotification.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Atoms/AsNotification',
  component: AsNotification,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    isSmall: false,
    quantity: 12,
  }, // default value
} satisfies Meta<typeof AsNotification>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    isSmall: false,
  },
};
export const Small: Story = {
  args: {
    isSmall: true,
  },
};
