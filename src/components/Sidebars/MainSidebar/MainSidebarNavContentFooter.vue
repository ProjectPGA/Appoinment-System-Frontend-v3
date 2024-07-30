<template>
  <ul class="nav-container">
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
<script lang="ts" setup>
import { IconName } from '@/models/icons/fontawesome/iconsDictionary';
import { RoutePaths, RouteNames } from '@/models/routes/Routes';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

import AsNavLabel from '@/library/components/molecules/as-nav-label/AsNavLabel.vue';
import AsProfileCard from '@/library/components/molecules/as-profile-card/AsProfileCard.vue';

const router = useRouter();

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
};
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
