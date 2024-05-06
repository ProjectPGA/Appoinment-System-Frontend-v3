<template>
  <label class="as-checkbox__label" :for="checkboxId">
    <input
      :id="checkboxId"
      class="as-checkbox__input"
      :checked="isChecked || checked"
      :value="checkedValue"
      :disabled="disabled"
      :indeterminate="isIndeterminate"
      :name="name"
      type="checkbox"
      @change="handleChange"
    />{{ label }}
    <span class="as-checkbox__mark"
      ><svg
        class="as-checkbox__mark-icon"
        width="12px"
        height="10px"
        viewbox="0 0 12 10"
      >
        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
      </svg>
      <svg
        class="as-checkbox__line-icon"
        width="12px"
        height="2px"
        viewBox="0 0 12 2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="1" y1="1" x2="11" y2="1" />
      </svg>
    </span>
  </label>
</template>
<script lang="ts" setup>
import './as-checkbox.scss';
import { useField } from 'vee-validate';

const props = withDefaults(
  defineProps<{
    /**
     * Name of the checkbox
     */
    name: string;
    /**
     * Value of the checkbox
     */
    checkedValue: string;
    /**
     * Id of the checkbox
     */
    checkboxId: string;
    /**
     * Label of the checkbox
     */
    label: string;
    /**
     * Disabled state
     */
    disabled?: boolean;
    /**
     * Checked state
     */
    isChecked?: boolean;
    /**
     * Indeterminate state
     */
    isIndeterminate?: boolean;
  }>(),
  { disabled: false, isChecked: false, isIndeterminate: false }
);
// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { handleChange, checked } = useField(() => props.name, undefined, {
  type: 'checkbox',
  checkedValue: props.checkedValue,
});
</script>
