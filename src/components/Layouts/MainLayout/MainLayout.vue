<template>
  <div class="main-layout">
    <button-translation />
    <slot name="sidebar" />
    <main class="main-layout__content">
      <slot></slot>
    </main>
  </div>
</template>
<script lang="ts" setup>
import ButtonTranslation from '@/components/common/ButtonTranslation.vue';
</script>
<style lang="scss" scoped>
@import 'main-layout';
</style>
