<template>
  <div class="main-layout">
    <button-translation />
    <aside class="main-sidebar">
      <h1 class="main-sidebar__title">
        <img
          src="/img/appointment-logo.svg"
          width="32"
          height="30"
          :title="$t('common.components.sidebar.titleImgAlt')"
          :alt="$t('common.components.sidebar.titleImgTitle')"
        />
        <span class="main-sidebar__title-text">{{
          $t('common.components.sidebar.title')
        }}</span>
      </h1>
      <nav class="main-sidebar__main-nav">
        <ul class="main-sidebar__nav-container">
          <li>
            <router-link :to="RoutePaths.APPOINTMENTS">
              <as-nav-label
                :label-text="
                  $t('common.components.sidebar.navItems.appointments')
                "
                :active="
                  router.currentRoute.value.name == RouteNames.HOME ||
                  router.currentRoute.value.name == RouteNames.APPOINTMENTS
                "
                :right-icon-name="IconName.ANGLE_RIGHT"
              />
            </router-link>
          </li>
          <li>
            <router-link :to="RoutePaths.USERS">
              <as-nav-label
                :label-text="$t('common.components.sidebar.navItems.users')"
                :active="router.currentRoute.value.name == RouteNames.USERS"
                :left-icon-name="IconName.USERS"
                :right-icon-name="IconName.ANGLE_RIGHT"
              />
            </router-link>
          </li>
          <li>
            <router-link :to="RoutePaths.REGISTER_USER">
              <as-nav-label
                :label-text="
                  $t('common.components.sidebar.navItems.toRegister')
                "
                :active="
                  router.currentRoute.value.name == RouteNames.REGISTER_USER
                "
                :left-icon-name="IconName.USER_PLUS"
                :right-icon-name="IconName.ANGLE_RIGHT"
              />
            </router-link>
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
      </nav>
      <nav class="main-sidebar__footer">
        <ul class="main-sidebar__nav-container">
          <li>
            <as-nav-label
              :label-text="
                $t('common.components.sidebar.navItems.configuration')
              "
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
                :active="
                  router.currentRoute.value.name == RouteNames.MY_ACCOUNT
                "
              />
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="main-layout__content">
      <slot></slot>
    </main>
  </div>
</template>
<script lang="ts" setup>
import AsNavLabel from '@/library/components/molecules/as-nav-label/AsNavLabel.vue';
import AsProfileCard from '@/library/components/molecules/as-profile-card/AsProfileCard.vue';
import { IconName } from '@/models/icons/fontawesome/iconsDictionary';

import ButtonTranslation from '@/components/common/ButtonTranslation.vue';

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
@import 'main-layout';
</style>
