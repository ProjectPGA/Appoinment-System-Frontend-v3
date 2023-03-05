<template>
  <div class="main-login">
    <select
      id="languageChangeSelect"
      v-model="$i18n.locale"
      class="button-translations"
    >
      <option
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ locale }}
      </option>
    </select>
    <div class="columns is-centered">
      <div class="column main-login_logo">
        <logo-app />
      </div>
    </div>
    <div class="columns is-centered is-mobile">
      <div class="column is-6-desktop is-10-mobile is-8-tablet container">
        <h1 class="main-login_title title">
          {{ $t('common.title.login') }}
        </h1>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import LogoApp from '../Navigation/LogoApp.vue';
</script>
<style lang="scss" scoped>
.main-login {
  &_logo {
    margin-top: 49.92px;
    margin-bottom: 49.92px;
  }
}

.button-translations {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 1000;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  text-transform: uppercase;

  //   ::v-deep > span {
  //     display: flex;
  //   }

  &_icon {
    margin-left: 0 !important;
  }

  &_language {
    line-height: 22px;
  }
}
</style>
