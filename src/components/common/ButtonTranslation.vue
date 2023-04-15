<template>
  <button
    class="button is-danger button-translations"
    @click="changeLanguage()"
  >
    <font-awesome-icon :icon="iconType.SOLID + ' ' + iconName.GLOBE" />
    <span class="button-translations__locale">{{ $i18n.locale }}</span>
  </button>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { Locales } from '@/localization/locales';
import { iconType, iconName } from '@/models/icons/fontawesome/iconsDictionary';

const i18n = useI18n();

/**
 * The `changeLanguage()` function is toggling between two language locales (Spanish and English) using
 * the `vue-i18n` library. It checks the current locale value and if it's equal to `Locales.ES`
 * (Spanish), it sets the locale value to `Locales.EN` (English), and vice versa. The `:click`
 * directive in the button element is calling this function when the button is clicked.
 */
function changeLanguage(): void {
  i18n.locale.value === Locales.ES
    ? (i18n.locale.value = Locales.EN)
    : (i18n.locale.value = Locales.ES);
}
</script>
<style lang="scss" scoped>
.button-translations {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 20;
  padding-left: 10px;
  padding-right: 10px;
  text-transform: uppercase;

  &__locale {
    margin-left: 8px;
  }
}
</style>
