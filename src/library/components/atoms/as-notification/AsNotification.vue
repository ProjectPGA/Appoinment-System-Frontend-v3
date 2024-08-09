<template>
  <div
    v-if="props.quantity"
    class="as-notification"
    :class="{ 'is-small': $props.isSmall }"
  >
    <span class="as-notification__quantity"> {{ notificationQuantity }}</span>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
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

const notificationQuantity = computed(() =>
  props.quantity && props.quantity >= 100 ? '+99' : props.quantity
);
</script>
