<script lang="ts" setup>
import { IconName } from '@/models/icons/fontawesome/iconsDictionary';
import { RoutePaths, RouteNames } from '@/models/routes/Routes';
import { useRouter } from 'vue-router';

import AsNavLabel from '@/library/components/molecules/as-nav-label/AsNavLabel.vue';
import SidebarNavItem from './SidebarNavItem.vue';

const router = useRouter();
</script>

<template>
  <ul class="nav-container">
    <li>
      <SidebarNavItem
        :to="RoutePaths.APPOINTMENTS"
        :active="
          router.currentRoute.value.name == RouteNames.HOME ||
          router.currentRoute.value.name == RouteNames.APPOINTMENTS
        "
        :leftIconName="IconName.CALENDAR_CHECK"
        :labelText="$t('common.components.sidebar.navItems.appointments')"
      />
    </li>
    <li>
      <SidebarNavItem
        :to="RoutePaths.USERS"
        :active="router.currentRoute.value.name == RouteNames.USERS"
        :leftIconName="IconName.USERS"
        :labelText="$t('common.components.sidebar.navItems.users')"
      />
    </li>
    <li>
      <SidebarNavItem
        :to="RoutePaths.REGISTER_USER"
        :active="router.currentRoute.value.name == RouteNames.REGISTER_USER"
        :leftIconName="IconName.USER_PLUS"
        :labelText="$t('common.components.sidebar.navItems.toRegister')"
      />
    </li>
    <li>
      <AsNavLabel
        :labelText="$t('common.components.sidebar.navItems.chatBot')"
        :leftIconName="IconName.COMMENTS"
        :rightIconName="IconName.ANGLE_RIGHT"
        disabled
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.nav-container {
  display: flex;
  flex-direction: column;
  gap: $spacing-medium;

  @include mq-touch {
    align-items: center;
  }
}
</style>
