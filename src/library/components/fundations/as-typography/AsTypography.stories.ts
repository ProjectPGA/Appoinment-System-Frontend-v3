import type { Meta, StoryObj } from '@storybook/vue3';

import AsTypographyTemplate from './template/AsTypographyTemplate.vue';

const meta: Meta<typeof AsTypographyTemplate> = {
  title: 'Fundations/Typography',
  component: AsTypographyTemplate,
  argTypes: {
    category: {
      control: 'select',
      options: ['heading', 'body', 'button'],
    },
    size: {
      control: 'select',
      options: ['extralarge', 'large', 'medium', 'small'],
    },
    weight: {
      control: 'select',
      options: ['regular', 'semi', 'bold'],
    },
  },
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof AsTypographyTemplate>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Typography: Story = {
  render: args => ({
    components: { AsTypographyTemplate },
    setup() {
      return { args };
    },
    template: '<AsTypographyTemplate v-bind="args" />',
  }),
  args: {
    category: 'body',
    size: 'large',
    weight: 'regular',
  },
};
