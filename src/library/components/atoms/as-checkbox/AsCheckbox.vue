<template>
  <label class="as-checkbox__label" :for="checkboxId">
    <input
      :id="checkboxId"
      class="as-checkbox__input"
      :checked="checked"
      :value="checkedValue"
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
    </span>
  </label>
</template>
<script lang="ts" setup>
import './as-checkbox.scss';
import { useField } from 'vee-validate';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  checkedValue: {
    type: String,
    required: true,
  },
  checkboxId: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { handleChange, checked } = useField(() => props.name, undefined, {
  type: 'checkbox',
  checkedValue: props.checkedValue,
});
</script>
