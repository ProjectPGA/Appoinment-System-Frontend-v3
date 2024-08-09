import type { Meta, StoryObj } from '@storybook/vue3';

import AsProfileCard from './AsProfileCard.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Molecules/AsProfileCard',
  component: AsProfileCard,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
  args: {
    profileImageUrl: '/img/default-profile-image.webp',
    profileImageUrlSmall: '/img/default-profile-image-40.webp',
    userName: 'OpenSlot',
    userSurname: 'Studio',
    userEmail: 'hola@openslotstudio.com',
    active: false,
  }, // default value
} satisfies Meta<typeof AsProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Normal: Story = {
  args: {},
};
