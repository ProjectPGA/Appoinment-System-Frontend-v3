<template>
  <ul class="nav-container">
    <li>
      <sidebar-nav-item
        :to="RoutePaths.APPOINTMENTS"
        :active="
          router.currentRoute.value.name == RouteNames.HOME ||
          router.currentRoute.value.name == RouteNames.APPOINTMENTS
        "
        :left-icon-name="IconName.CALENDAR_CHECK"
        :label-text="$t('common.components.sidebar.navItems.appointments')"
      />
    </li>
    <li>
      <sidebar-nav-item
        :to="RoutePaths.USERS"
        :active="router.currentRoute.value.name == RouteNames.USERS"
        :left-icon-name="IconName.USERS"
        :label-text="$t('common.components.sidebar.navItems.users')"
      />
    </li>
    <li>
      <sidebar-nav-item
        :to="RoutePaths.REGISTER_USER"
        :active="router.currentRoute.value.name == RouteNames.REGISTER_USER"
        :left-icon-name="IconName.USER_PLUS"
        :label-text="$t('common.components.sidebar.navItems.toRegister')"
      />
    </li>
    <li>
      <as-nav-label
        :label-text="$t('common.components.sidebar.navItems.chatBot')"
        :left-icon-name="IconName.COMMENTS"
        :right-icon-name="IconName.ANGLE_RIGHT"
        disabled
      />
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { IconName } from '@/models/icons/fontawesome/iconsDictionary';
import { RoutePaths, RouteNames } from '@/models/routes/Routes';
import { useRouter } from 'vue-router';

import AsNavLabel from '@/library/components/molecules/as-nav-label/AsNavLabel.vue';
import SidebarNavItem from './SidebarNavItem.vue';

const router = useRouter();
</script>
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
