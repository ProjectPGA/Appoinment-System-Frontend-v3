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

<template>
  <template v-if="props.quantity">
    <div class="as-notification" :class="{ 'is-small': $props.isSmall }">
      <span class="as-notification__quantity"> {{ notificationQuantity }}</span>
    </div>
  </template>
  <template v-else>
    <div class="as-notification-empty"></div>
  </template>
</template>
