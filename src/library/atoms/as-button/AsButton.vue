<template>
  <button type="button" :class="classes" @click="onClick">
    {{ label }}
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
    label: string;
    /**
     * primary or secondary button
     */
    primary?: boolean;
    /**
     * size of the button
     */
    size?: 'small' | 'medium' | 'large';
  }>(),
  { primary: false, size: 'medium' }
);

const emit = defineEmits<{
  (e: 'click', id: number): void;
}>();

const classes = computed(() => ({
  'as-button': true,
  'is-primary': props.primary,
  'is-secondary': !props.primary,
  [`is-${props.size || 'medium'}`]: true,
}));

const onClick = () => {
  emit('click', 1);
};
</script>
