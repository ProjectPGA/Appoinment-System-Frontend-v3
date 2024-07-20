import type { Meta, StoryObj } from '@storybook/vue3';

import AsNavLabel from './AsNavLabel.vue';
import {
  getIconNameValues,
  getIconTypeValues,
} from '@/utils/functionUtils/fontAwesomeFunctions';
import { IconName, IconType } from '@/models/icons/fontawesome/iconsDictionary';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Molecules/AsNavLabel',
  component: AsNavLabel,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['', 'small', 'mobile'] },
    leftIconType: {
      control: 'select',
      options: getIconTypeValues(),
    },
    leftIconName: {
      control: 'select',
      options: getIconNameValues(),
    },
    rightIconType: {
      control: 'select',
      options: getIconTypeValues(),
    },
    rightIconName: {
      control: 'select',
      options: getIconNameValues(),
    },
    state: {
      control: 'select',
      options: ['', 'hover', 'active', 'disabled'],
    },
  },
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    state: '',
  }, // default value
} satisfies Meta<typeof AsNavLabel>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Normal: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    state: '',
  },
};
export const NormalActive: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    state: 'active',
  },
};
export const NormalHover: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    state: 'hover',
  },
};
export const Small: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    state: '',
    size: 'small',
  },
};
export const SmallActive: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    state: 'active',
    size: 'small',
  },
};
export const SmallHover: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    state: 'hover',
    size: 'small',
  },
};
export const Mobile: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    state: '',
    size: 'mobile',
  },
};
export const MobileActive: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    state: 'active',
    size: 'mobile',
  },
};
export const MobileHover: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    state: 'hover',
    size: 'mobile',
  },
};
