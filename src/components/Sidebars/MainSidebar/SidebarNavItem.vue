<script lang="ts" setup>
import { RouterLink } from 'vue-router';

import { RoutePaths } from '@/models/routes/Routes';
import { IconName } from '@/models/icons/fontawesome/iconsDictionary';

import AsNavLabel from '@/library/components/molecules/as-nav-label/AsNavLabel.vue';

const props = defineProps<{
  to: RoutePaths;
  labelText: string;
  active: boolean;
  leftIconName: IconName;
  disabled?: boolean;
}>();
</script>

<template>
  <RouterLink :to="props.to">
    <AsNavLabel
      :labelText="props.labelText"
      :active="props.active"
      :leftIconName="props.leftIconName"
      :rightIconName="IconName.ANGLE_RIGHT"
      :disabled="props.disabled"
    />
  </RouterLink>
</template>
