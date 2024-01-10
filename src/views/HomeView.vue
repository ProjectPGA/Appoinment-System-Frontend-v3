<template>
  <section class="home-view">
    <h2 class="home-view__title is-client">Cliente</h2>
    <h2 class="home-view__title is-professional">Profesional</h2>
  </section>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.home-view {
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    300deg,
    $main-color-dark 0%,
    $main-color-dark 50%,
    $main-color-light 50%,
    $main-color-light 100%
  );

  &__title {
    font-size: 5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-left: 15px;

    &.is-client {
      color: $main-color-dark;
    }

    &.is-professional {
      color: $main-color-light;
      position: absolute;
      right: 15px;
      bottom: 5px;
    }
  }
}
</style>
