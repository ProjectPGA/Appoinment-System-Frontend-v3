<script lang="ts" setup>
import AsNotification from '@/library/components/atoms/as-notification/AsNotification.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { IconType, IconName } from '@/models/icons/fontawesome/iconsDictionary';

import './as-nav-label.scss';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    /**
     * Label text
     */
    labelText: string;
    /**
     * Label left icon type (font-awesome)
     */
    leftIconType?: IconType;
    /**
     * Label left icon name (font-awesome)
     */
    leftIconName: IconName;
    /**
     * Label right icon type (font-awesome)
     */
    rightIconType?: IconType;
    /**
     * Label right icon name (font-awesome)
     */
    rightIconName: IconName;
    /**
     * Set component size
     */
    isSmall?: boolean;
    /**
     * Set if is mobile variant
     */
    isMobile?: boolean;
    /**
     * Set active state
     */
    active?: boolean;
    /**
     * Set hover state
     */
    hover?: boolean;
    /**
     * Set disabled state
     */
    disabled?: boolean;
    /**
     * Set notification quantity
     */
    notificationQuantity?: number;
  }>(),
  {
    labelText: 'Label',
    leftIconType: IconType.SOLID,
    leftIconName: IconName.CALENDAR_CHECK,
    rightIconType: IconType.SOLID,
    rightIconName: IconName.ANGLE_DOWN,
    notificationQuantity: 0,
  }
);

const navLabelClasses = computed(() => ({
  'is-mobile': props.isMobile,
  'is-small': props.isSmall,
  'is-active': props.active,
  'is-hover': props.hover,
  'is-disabled': props.disabled,
}));
</script>

<template>
  <div class="as-nav-label" :class="navLabelClasses">
    <div class="as-nav-label__left-section">
      <FontAwesomeIcon
        class="as-nav-label__left-icon"
        :icon="props.leftIconType + ' ' + props.leftIconName"
      />
      <span class="as-nav-label__text">{{ props.labelText }}</span>
    </div>
    <div class="as-nav-label__right-section">
      <AsNotification
        class="as-nav-label__notification-icon"
        :isSmall="props.isMobile || (props.isMobile && props.isSmall)"
        :quantity="props.notificationQuantity"
      />
      <FontAwesomeIcon
        class="as-nav-label__right-icon"
        :icon="props.rightIconType + ' ' + props.rightIconName"
      />
    </div>
  </div>
</template>
