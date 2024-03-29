<template>
  <button type="button" :class="classes" @click="onClick">
    {{ label }}
    <slot />
  </button>
</template>

<script lang="ts" setup>
import './as-button.scss';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    /**
     * The label of the button
     */
    label?: string;
    /**
     * primary or secondary button
     */
    primary?: boolean;
    /**
     * secondary button
     */
    secondary?: boolean;
    /**
     * size of the button
     */
    size?: 'small' | 'medium' | 'large';
  }>(),
  { primary: false, secondary: false, label: '', size: 'medium' }
);

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const classes = computed(() => ({
  'as-button': true,
  'is-primary': props.primary,
  'is-secondary': props.secondary,
  [`is-${props.size || 'medium'}`]: true,
}));

const onClick = () => {
  emit('click');
};
</script>
