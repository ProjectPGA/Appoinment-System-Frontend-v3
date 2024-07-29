<template>
  <div
    v-if="props.quantity"
    class="as-notification"
    :class="{ 'is-small': $props.isSmall }"
  >
    <span class="as-notification__quantity">
      {{
        // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
        props.quantity >= 100 ? '+99' : props.quantity
      }}</span
    >
  </div>
</template>
<script lang="ts" setup>
import './as-notification.scss';

const props = defineProps<{
  /**
   * size of the notification
   */
  isSmall?: boolean;
  /**
   * Quantity to show
   */
  quantity?: number;
}>();
</script>
