<template>
  <div
    class="as-nav-label"
    :class="[
      props.size ? `is-${props.size}` : '',
      props.state ? `is-${props.state}` : '',
    ]"
  >
    <div class="as-nav-label__left-section">
      <font-awesome-icon
        class="as-nav-label__left-icon"
        :icon="props.leftIconType + ' ' + props.leftIconName"
      />
      <span class="as-nav-label__text">{{ props.labelText }}</span>
    </div>
    <div class="as-nav-label__right-section">
      <AsNotification
        class="as-nav-label__notification-icon"
        :is-small="props.size === 'mobile'"
        :quantity="12"
      />
      <font-awesome-icon
        class="as-nav-label__right-icon"
        :icon="props.rightIconType + ' ' + $props.rightIconName"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AsNotification from '@/library/components/atoms/as-notification/AsNotification.vue';

import { IconType, IconName } from '@/models/icons/fontawesome/iconsDictionary';

import './as-nav-label.scss';

const props = withDefaults(
  defineProps<{
    /**
     * Label text
     */
    labelText: string;
    /**
     * Label left icon type (font-awesome)
     */
    leftIconType: IconType;
    /**
     * Label left icon name (font-awesome)
     */
    leftIconName: IconName;
    /**
     * Label right icon type (font-awesome)
     */
    rightIconType: IconType;
    /**
     * Label right icon name (font-awesome)
     */
    rightIconName: IconName;
    /**
     * Set disabled state
     */
    state?: '' | 'hover' | 'active' | 'disabled';
    /**
     * Set component size
     */
    size?: string;
  }>(),
  {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    state: '',
    size: '',
  }
);
</script>
