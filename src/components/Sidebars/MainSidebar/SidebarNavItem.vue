<template>
  <router-link :to="props.to">
    <as-nav-label
      :label-text="props.labelText"
      :active="props.active"
      :left-icon-name="props.leftIconName"
      :right-icon-name="IconName.ANGLE_RIGHT"
      :disabled="props.disabled"
    />
  </router-link>
</template>
<script lang="ts" setup>
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
