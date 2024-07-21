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
  },
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    notificationQuantity: 12,
    isSmall: false,
    isMobile: false,
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
    notificationQuantity: 12,
  },
};
export const NormalActive: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    active: true,
    notificationQuantity: 12,
  },
};
export const NormalHover: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    hover: true,
    notificationQuantity: 12,
  },
};
export const NormalDisabled: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    disabled: true,
    notificationQuantity: 12,
  },
};
export const Small: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    isSmall: true,
    notificationQuantity: 12,
  },
};
export const SmallActive: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    active: true,
    isSmall: true,
    notificationQuantity: 12,
  },
};
export const SmallHover: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    hover: true,
    isSmall: true,
    notificationQuantity: 12,
  },
};
export const SmallDisabled: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    isSmall: true,
    disabled: true,
    notificationQuantity: 12,
  },
};
export const Mobile: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    isMobile: true,
    notificationQuantity: 12,
  },
};
export const MobileActive: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    active: true,
    isMobile: true,
    notificationQuantity: 12,
  },
};
export const MobileHover: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    hover: true,
    isMobile: true,
    notificationQuantity: 12,
  },
};
export const MobileDisabled: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    isMobile: true,
    disabled: true,
    notificationQuantity: 12,
  },
};
export const MobileSmall: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    isMobile: true,
    isSmall: true,
    notificationQuantity: 12,
  },
};
export const MobileSmallActive: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    active: true,
    isMobile: true,
    isSmall: true,
    notificationQuantity: 12,
  },
};
export const MobileSmallHover: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    hover: true,
    isMobile: true,
    isSmall: true,
    notificationQuantity: 12,
  },
};
export const MobileSmallDisabled: Story = {
  args: {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    isMobile: true,
    isSmall: true,
    disabled: true,
    notificationQuantity: 12,
  },
};
