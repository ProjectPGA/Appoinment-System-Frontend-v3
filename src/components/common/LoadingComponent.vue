<template>
  <section class="loading-container">
    <article class="loading-content">
      <img
        class="loading-content__image mb-5"
        src="@/assets/img/hipster.svg"
        :alt="$t('common.components.loading.altText')"
      />
      <progress class="progress is-small is-info" max="100"></progress>
    </article>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.loading-container {
  position: fixed;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  width: 100vw;
  height: 100vh;
  z-index: 50;
}

.loading-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__image {
    width: 200px;

    @include mobile {
      width: 150px;
    }
  }
}
</style>
