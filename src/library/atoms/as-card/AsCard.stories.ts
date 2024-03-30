import type { Meta, StoryObj } from '@storybook/vue3';

import AsCard from './AsCard.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Appointment System/AsCard',
  component: AsCard,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
  args: { isExtended: false }, // default value
} satisfies Meta<typeof AsCard>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Normal: Story = {
  args: {
    size: 'medium',
  },
};

export const Extended: Story = {
  args: {
    isExtended: true,
  },
};
