import type { Meta, StoryObj } from '@storybook/vue3';

import AsInput from './AsInput.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Appointment System/AsInput',
  component: AsInput,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    onInput: { action: 'input' },
  },
  args: { primary: false, secondary: false }, // default value
} satisfies Meta<typeof AsInput>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    primary: true,
  },
};

export const Secondary: Story = {
  args: {
    secondary: true,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};
