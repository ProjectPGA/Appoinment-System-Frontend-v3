<template>
  <label class="as-checkbox__label" :for="checkboxId"
    ><input
      :id="checkboxId"
      class="as-checkbox__input"
      :checked="checked"
      :value="checkedValue"
      :name="name"
      type="checkbox"
      @change="handleChange"
    />{{ label }}</label
  >
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
