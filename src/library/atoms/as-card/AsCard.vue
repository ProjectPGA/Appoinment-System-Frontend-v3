<template>
  <article class="as-card" :class="classes">
    <slot />
  </article>
</template>

<script lang="ts" setup>
import './as-card.scss';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    /**
     * invalid card
     */
    isExtended?: boolean;
    /**
     * size of the card
     */
    size?: 'small' | 'medium' | 'large';
  }>(),
  {
    isExtended: false,
    size: 'medium',
  }
);

const classes = computed(() => ({
  'is-extended': props.isExtended,
  [`is-${props.size || 'medium'}`]: true,
}));
</script>
