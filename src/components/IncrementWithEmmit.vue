<template>
  <h1>{{ props.label }}</h1>
  <p>{{ $t('views.home.counter.counterTitle') }}{{ counter }}</p>
  <button
    id="incrementProductBtn"
    class="button is-danger"
    :class="props.extraStyle"
    label="Sum counter"
    @click="sumCounter()"
  >
    {{ $t('views.home.counter.sumButton') }}
  </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue';

import { vbindColorExampleInterface } from '@/models/components';

const props = defineProps<{
  label: string;
  extraStyle: string;
}>();

const emit = defineEmits<{
  (e: 'change', num: number): void;
}>();

const counter: Ref<number> = ref(0);

const sumCounter = (): void => {
  counter.value++;
  emit('change', counter.value);
};

const vbindColorExample: vbindColorExampleInterface = {
  backgroundColor: 'green',
};
</script>

<style lang="scss" scoped>
.style-v-bind-example {
  background-color: v-bind('vbindColorExample.backgroundColor') !important;
}
</style>
