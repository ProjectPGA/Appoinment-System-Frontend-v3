<template>
  <div>
    <label :for="dataCy">{{ label }}</label>
    <input
      :class="classes"
      :value="modelValue"
      :placeholder="placeholder"
      :type="type"
      :data-cy="dataCy"
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
    />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import './as-input.scss';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    /**
     * primary input
     */
    primary?: boolean;
    /**
     * secondary input
     */
    secondary?: boolean;
    /**
     * invalid input
     */
    isInvalid?: boolean;
    /**
     * size of the input
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * placeholder of the input
     */
    placeholder?: string;
    /**
     * type of the input
     */
    type?: string;
    /**
     * dataCy of the input
     */
    dataCy?: string;
    /**
     * label of the input
     */
    label?: string;
    /**
     * label of the input
     */
    modelValue?: string;
  }>(),
  {
    primary: false,
    secondary: false,
    isInvalid: false,
    size: 'medium',
    placeholder: '',
    type: 'text',
    dataCy: '',
    label: '',
    modelValue: '',
  }
);

const emit = defineEmits(['update:modelValue', 'change', 'blur', 'input']);

const classes = computed(() => ({
  'as-input': true,
  'is-primary': props.primary,
  'is-secondary': props.secondary,
  'is-invalid': props.isInvalid,
  [`is-${props.size || 'medium'}`]: true,
}));

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target?.value);
  emit('input');
};
const onChange = () => {
  emit('change');
};
const onBlur = () => {
  emit('blur');
};
</script>
