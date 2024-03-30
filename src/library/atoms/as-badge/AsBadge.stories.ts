import type { Meta, StoryObj } from '@storybook/vue3';

import AsBadge from './AsBadge.vue';
import { boolean } from 'yup';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'AsBadge',
  component: AsBadge,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'warning', 'success', 'error'],
    },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    highlight: boolean,
  },
  args: { type: 'info' }, // default value
} satisfies Meta<typeof AsBadge>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Info: Story = {
  args: {
    type: 'info',
    size: 'medium',
  },
};

export const InfoHightLight: Story = {
  args: {
    type: 'info',
    size: 'medium',
    highlight: true,
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    size: 'medium',
  },
};

export const SuccessHighLight: Story = {
  args: {
    type: 'success',
    size: 'medium',
    highlight: true,
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    size: 'medium',
  },
};

export const ErrorHighLight: Story = {
  args: {
    type: 'error',
    size: 'medium',
    highlight: true,
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    size: 'medium',
  },
};

export const WarningHighLight: Story = {
  args: {
    type: 'warning',
    size: 'medium',
    highlight: true,
  },
};
