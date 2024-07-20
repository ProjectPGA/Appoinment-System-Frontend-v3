<template>
  <div
    v-if="props.quantity"
    class="as-notification"
    :class="{ 'is-small': $props.isSmall }"
  >
    <span v-show="!isSmall">{{ props.quantity }}</span>
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
