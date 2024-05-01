import type { Meta, StoryObj } from '@storybook/vue3';

import AsCheckbox from './AsCheckbox.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Atoms/AsCheckbox',
  component: AsCheckbox,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    name: String,
    checkedValue: String,
    checkboxId: String,
    label: String,
    disabled: Boolean,
    isChecked: Boolean,
  },
  args: {
    name: 'example',
    checkedValue: 'example',
    checkboxId: 'example',
    label: 'Checkbox',
    disabled: false,
    isChecked: true,
    isIndeterminate: false,
  }, // default value
} satisfies Meta<typeof AsCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Normal: Story = {
  args: {
    name: 'test',
  },
};
