<script lang="ts" setup>
import AsCard from '@/library/components/atoms/as-card/AsCard.vue';
import AsBadge from '@/library/components/atoms/as-badge/AsBadge.vue';

import { UserRoles } from '@/models/user/UserRoles';

import { UserAuthData } from '@/models/user/UserAuthData';

const props = defineProps<{
  user: UserAuthData | null;
}>();
</script>

<template>
  <AsCard class="user-data">
    <p class="user-data__data">
      <span class="user-data__data-title">{{
        $t('views.home.userData.email')
      }}</span>
      {{ props.user?.email }}
    </p>
    <p class="user-data__data">
      <span class="user-data__data-title">{{
        $t('views.home.userData.name')
      }}</span>
      {{ props.user?.name }}
    </p>
    <p class="user-data__data">
      <span class="user-data__data-title">{{
        $t('views.home.userData.surname')
      }}</span>
      {{ props.user?.surname }}
    </p>
    <p class="user-data__data">
      <span class="user-data__data-title">{{
        $t('views.home.userData.roles')
      }}</span>
      <span class="user-data__roles-badges">
        <AsBadge
          v-for="(items, index) in props.user?.roles"
          :key="index"
          :label="items"
          :class="{ 'is-success': items === UserRoles.ADMIN }"
        />
      </span>
    </p>
    <slot />
  </AsCard>
</template>

<style lang="scss" scoped>
.user-data {
  display: flex;

  &__data {
    margin-bottom: 12px;
  }

  &__roles-badges {
    display: inline-flex;
    gap: 8px;
  }

  &__data-title {
    @include font-sizing-selector('body/large/semi');
  }
}
</style>
