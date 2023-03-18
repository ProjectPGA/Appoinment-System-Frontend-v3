<template>
  <div class="main-login">
    <button-translation />
    <div class="columns is-centered">
      <div class="column main-login__logo">
        <logo-app />
      </div>
    </div>
    <div class="columns is-centered is-mobile">
      <div class="column is-6-desktop is-10-mobile is-8-tablet container">
        <h1 class="main-login__title title">
          {{ $t('common.title.login') }}
        </h1>
        <main-login-form />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import LogoApp from '@/components/Navigation/LogoApp.vue';
import MainLoginForm from '@/components/Login/MainLoginForm.vue';
import ButtonTranslation from '@/components/common/ButtonTranslation.vue';
</script>
<style lang="scss" scoped>
.main-login {
  &__logo {
    margin-top: 49.92px;
    margin-bottom: 49.92px;
  }
}
</style>
