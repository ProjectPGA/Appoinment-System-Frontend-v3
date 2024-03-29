<template>
  <article :class="classes">
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
  'as-card': true,
  'is-extended': props.isExtended,
  [`is-${props.size || 'medium'}`]: true,
}));
</script>
