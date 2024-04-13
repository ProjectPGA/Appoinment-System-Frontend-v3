<template>
  <as-input
    :model-value="value"
    :checked="checked"
    type="checkbox"
    @change="handleChange"
  />
</template>
<script lang="ts" setup>
import AsInput from '@/library/components/atoms/as-input/AsInput.vue';

import { useField } from 'vee-validate';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { handleChange, checked } = useField(() => props.name, undefined, {
  type: 'checkbox',
  checkedValue: props.value,
});
</script>
