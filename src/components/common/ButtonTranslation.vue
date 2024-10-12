<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { changeLanguage } from '@/utils/functionUtils/localizationFunctions';
import { IconType, IconName } from '@/models/icons/fontawesome/iconsDictionary';

import AsButton from '@/library/components/atoms/as-button/AsButton.vue';
</script>

<template>
  <AsButton
    class="button-translations"
    primary
    size="small"
    @click="changeLanguage()"
  >
    <FontAwesomeIcon :icon="IconType.SOLID + ' ' + IconName.GLOBE" />
    <span class="button-translations__locale">{{ $i18n.locale }}</span>
  </AsButton>
</template>

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
