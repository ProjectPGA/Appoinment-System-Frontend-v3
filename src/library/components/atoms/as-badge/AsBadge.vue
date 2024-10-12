<script lang="ts" setup>
import './as-badge.scss';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    /**
     * The label of the badge
     */
    label?: string;
    /**
     * The type of the badge
     */
    type?: 'info' | 'warning' | 'success' | 'error';
    /**
     * Set if is highlight type
     */
    highlight?: boolean;
    /**
     * size of the badge
     */
    size?: 'small' | 'medium';
  }>(),
  { label: '', type: 'info', size: 'medium' }
);

const classes = computed(() => ({
  [`is-${props.type || 'info'}`]: true,
  [`is-${props.size || 'medium'}`]: true,
  'is-highlight': props.highlight,
}));
</script>

<template>
  <span class="as-badge" :class="classes">
    {{ label }}
    <slot />
  </span>
</template>
