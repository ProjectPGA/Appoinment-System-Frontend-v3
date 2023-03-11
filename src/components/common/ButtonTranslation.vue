<template>
  <button
    class="button is-danger button-translations"
    @click="changeLanguage()"
  >
    <font-awesome-icon icon="fa-globe" />
    <span class="button-translations__locale">{{ $i18n.locale }}</span>
  </button>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { Locales } from '@/localization/locales';

const i18n = useI18n();

function changeLanguage() {
  i18n.locale.value === Locales.ES
    ? (i18n.locale.value = Locales.EN)
    : (i18n.locale.value = Locales.ES);
}
</script>
<style lang="scss" scoped>
.button-translations {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 1000;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  text-transform: uppercase;

  &__locale {
    margin-left: 8px;
  }
}
</style>
