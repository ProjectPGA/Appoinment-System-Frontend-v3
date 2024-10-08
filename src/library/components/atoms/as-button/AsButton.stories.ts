import type { Meta, StoryObj } from '@storybook/vue3';

import AsButton from './AsButton.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Atoms/AsButton',
  component: AsButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    onClick: { action: 'clicked' },
  },
  args: { secondary: false }, // default value
} satisfies Meta<typeof AsButton>;

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
    label: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    secondary: true,
    label: 'Secondary',
  },
};

export const Large: Story = {
  args: {
    primary: true,
    label: 'Large',
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    primary: true,
    label: 'Small',
    size: 'small',
  },
};
