<script lang="ts" setup>
import { RouterLink } from 'vue-router';

import { IconName } from '@/models/icons/fontawesome/iconsDictionary';
import { RoutePaths, RouteNames } from '@/models/routes/Routes';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

import AsNavLabel from '@/library/components/molecules/as-nav-label/AsNavLabel.vue';
import AsProfileCard from '@/library/components/molecules/as-profile-card/AsProfileCard.vue';

const router = useRouter();

const authStore = useAuthStore();

const logout = async () => {
  try {
    await authStore.logout();
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>

<template>
  <ul class="nav-container">
    <li>
      <AsNavLabel
        :labelText="$t('common.components.sidebar.navItems.configuration')"
        :leftIconName="IconName.GEAR"
        :rightIconName="IconName.ANGLE_RIGHT"
      />
    </li>
    <li>
      <AsNavLabel
        :labelText="$t('common.components.sidebar.navItems.logOut')"
        :leftIconName="IconName.ARROW_RIGHT_FROM_BRACKET"
        :rightIconName="IconName.ANGLE_RIGHT"
        @click="logout()"
      />
    </li>
    <li>
      <RouterLink :to="RoutePaths.MY_ACCOUNT">
        <AsProfileCard
          :profileImageUrl="authStore.userAuthData?.imageUrl"
          :profileImageUrlSmall="authStore.userAuthData?.imageUrlSmall"
          :userName="authStore.userAuthData?.name"
          :userSurname="authStore.userAuthData?.surname"
          :userEmail="authStore.userAuthData?.email"
          :active="router.currentRoute.value.name == RouteNames.MY_ACCOUNT"
        />
      </RouterLink>
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
