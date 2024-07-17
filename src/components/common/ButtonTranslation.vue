<template>
  <as-button
    class="button-translations"
    size="medium"
    @click="changeLanguage()"
  >
    <font-awesome-icon :icon="IconType.SOLID + ' ' + IconName.GLOBE" />
    <span class="button-translations__locale">{{ $i18n.locale }}</span>
  </as-button>
</template>
<script lang="ts" setup>
import { changeLanguage } from '@/utils/functionUtils/localizationFunctions';
import { IconType, IconName } from '@/models/icons/fontawesome/iconsDictionary';

import AsButton from '@/library/components/atoms/as-button/AsButton.vue';
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
    margin-left: 4px;
  }
}
</style>
