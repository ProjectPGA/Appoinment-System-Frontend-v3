<template>
  <div class="main-login">
    <button-translation />
    <section class="p-3">
      <div class="columns is-centered">
        <div class="column main-login__logo">
          <logo-app />
        </div>
      </div>
      <div class="columns is-centered is-mobile">
        <div
          class="column container is-10-mobile is-10-tablet is-8-desktop is-6-widescreen"
        >
          <h1 class="main-login__title title is-size-2-tablet">
            {{ $t('common.title.login') }}
          </h1>
          <main-login-form />
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import LogoApp from '@/components/Navigation/LogoApp.vue';
import MainLoginForm from '@/components/Login/MainLoginForm.vue';
import ButtonTranslation from '@/components/common/ButtonTranslation.vue';
</script>
<style lang="scss" scoped>
.main-login {
  &__title {
    font-weight: 500;
  }

  &__logo {
    margin-block: 49.92px;

    @include mobile {
      margin-block: 25px;
    }
  }
}
</style>
