<script lang="ts" setup>
import ButtonTranslation from '@/components/common/ButtonTranslation.vue';
</script>

<template>
  <div class="main-layout">
    <ButtonTranslation />
    <slot name="sidebar" />
    <main class="main-layout__content">
      <slot></slot>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import 'main-layout';
</style>
