<template>
  <button-translation />
  <section class="home-view__section">
    <h1 class="home-view__title">
      {{ $t('views.home.titles.currentUserTitle') }}
    </h1>
    <user-data :user="authStore.userAuthData">
      <as-button
        :label="$t('common.buttons.logoutButton')"
        size="medium"
        class="home-view__button"
        @click="logout()"
      />
      <as-button
        class="home-view__button"
        secondary
        label="Get all users"
        @click="authStore.getAllUsers"
      />
    </user-data>
  </section>
  <section class="home-view__section">
    <h2 class="home-view__title">{{ $t('views.home.titles.usersTitle') }}</h2>
    <all-users />
  </section>
</template>

<script lang="ts" setup>
import ButtonTranslation from '@/components/common/ButtonTranslation.vue';
import UserData from '@/components/common/UserData.vue';
import AllUsers from '@/components/home/AllUsers.vue';

import AsButton from '@/library/atoms/as-button/AsButton.vue';

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
};
</script>

<style lang="scss" scoped>
.home-view {
  &__section {
    display: flex;
    flex-wrap: wrap;
    padding: 18px;
  }

  &__title {
    width: 100%;
  }

  &__button {
    margin-bottom: 12px;
  }
}
</style>
