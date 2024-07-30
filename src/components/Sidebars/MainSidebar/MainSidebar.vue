<template>
  <main-sidebar-layout
    :title="$t('common.components.sidebar.title')"
    img-src="/img/appointment-logo.svg"
  >
    <template #nav-content-main>
      <ul class="main-sidebar__nav-container">
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
    <template #nav-content-footer>
      <ul class="main-sidebar__nav-container">
        <li>
          <as-nav-label
            :label-text="$t('common.components.sidebar.navItems.configuration')"
            :left-icon-name="IconName.GEAR"
            :right-icon-name="IconName.ANGLE_RIGHT"
          />
        </li>
        <li>
          <as-nav-label
            :label-text="$t('common.components.sidebar.navItems.logOut')"
            :left-icon-name="IconName.ARROW_RIGHT_FROM_BRACKET"
            :right-icon-name="IconName.ANGLE_RIGHT"
            @click="logout()"
          />
        </li>
        <li>
          <router-link :to="RoutePaths.MY_ACCOUNT">
            <as-profile-card
              :profile-image-url="authStore.userAuthData?.imageUrl"
              :profile-image-url-small="authStore.userAuthData?.imageUrlSmall"
              :user-name="authStore.userAuthData?.name"
              :user-surname="authStore.userAuthData?.surname"
              :user-email="authStore.userAuthData?.email"
              :active="router.currentRoute.value.name == RouteNames.MY_ACCOUNT"
            />
          </router-link>
        </li>
      </ul>
    </template>
  </main-sidebar-layout>
</template>
<script lang="ts" setup>
import AsNavLabel from '@/library/components/molecules/as-nav-label/AsNavLabel.vue';
import AsProfileCard from '@/library/components/molecules/as-profile-card/AsProfileCard.vue';
import { IconName } from '@/models/icons/fontawesome/iconsDictionary';

import MainSidebarLayout from '@/components/Layouts/MainSidebarLayout/MainSidebarLayout.vue';
import SidebarNavItem from './SidebarNavItem.vue';

import { useAuthStore } from '@/stores/auth';
import { RouterLink, useRouter } from 'vue-router';
import { RouteNames, RoutePaths } from '@/models/routes/Routes';

const router = useRouter();

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
};
</script>
<style lang="scss" scoped>
.main-sidebar {
  &__nav-container {
    display: flex;
    flex-direction: column;
    gap: $spacing-medium;

    @include mq-touch {
      align-items: center;
    }
  }
}
</style>
