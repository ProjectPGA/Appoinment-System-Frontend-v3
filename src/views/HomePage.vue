<template>
  <section class="text-center" data-cy="home-page-view">
    <h2 data-cy="home-page-title">{{ $t('common.title.reactiveTitle') }}</h2>
    <h3
      id="counterCount"
      class="typography is-heading is-medium custom-text-font"
      data-cy="home-page-counter"
    >
      {{ useCounter.count }}
    </h3>
    <div class="button-content">
      <increment-with-emmit
        extra-style="style-v-bind-example"
        label="Emmit example"
        @change="changeValue"
      ></increment-with-emmit>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useHead } from '@vueuse/head';

import { useCounterStore } from '@/stores/counter';

import IncrementWithEmmit from '@/components/IncrementWithEmmit.vue';

const useCounter = useCounterStore();

useHead({
  title: () => 'Inicio',
  meta: [{ name: 'description', content: () => 'Home description' }],
});

const changeValue = (value: number) => {
  console.log('value', value);
};
</script>

<style lang="scss" scoped>
//TODO: DELETE SCSS FROM THIS STYLE
.button-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-center {
  text-align: center;
}
</style>
