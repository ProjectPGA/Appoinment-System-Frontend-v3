<template>
  <section class="appointments-view__section">
    <h1 class="appointments-view__title">
      {{ $t('views.appointments.title') }}
    </h1>
  </section>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.appointments-view {
  &__section {
    padding: 18px;
  }

  &__title {
    margin-bottom: 8px;

    @include font-sizing-selector('heading/small');
  }
}
</style>
