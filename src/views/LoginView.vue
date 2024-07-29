<template>
  <button-translation />
  <section class="login-view">
    <as-card class="login-view__form">
      <h1 class="login-view__title">
        {{ $t('common.title.login') }}
      </h1>
      <main-login-form />
    </as-card>
  </section>
</template>

<script lang="ts" setup>
import MainLoginForm from '@/components/Login/MainLoginForm.vue';
import ButtonTranslation from '@/components/common/ButtonTranslation.vue';
import AsCard from '@/library/components/atoms/as-card/AsCard.vue';
</script>
<style lang="scss" scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  &__title {
    margin-bottom: 8px;

    @include font-sizing-selector('heading/small');
  }

  &__form {
    display: flex;
    align-items: center;
  }
}
</style>
