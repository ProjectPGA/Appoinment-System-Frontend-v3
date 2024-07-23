<template>
  <button-translation />
  <section class="home-view__section">
    <div>
      <h1 class="home-view__title">
        {{ $t('views.home.titles.currentUserTitle') }}
      </h1>
      <user-data :user="authStore.userAuthData">
        <as-button
          :label="$t('common.buttons.logoutButton')"
          size="small"
          class="home-view__button"
          @click="logout()"
        />
        <as-button
          class="home-view__button"
          size="small"
          secondary
          :label="$t('common.buttons.getAllUsersButton')"
          @click="usersStore.getAllUsers"
        />
      </user-data>
    </div>
    <div>
      <h2 class="home-view__title">
        {{ $t('views.home.titles.createUserTitle') }}
      </h2>
      <as-card>
        <user-form />
      </as-card>
    </div>
  </section>
  <section class="home-view__section">
    <h2 class="home-view__title">{{ $t('views.home.titles.usersTitle') }}</h2>
    <all-users />
  </section>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';

import ButtonTranslation from '@/components/common/ButtonTranslation.vue';
import UserData from '@/components/common/UserData.vue';
import AllUsers from '@/components/home/AllUsers.vue';
import UserForm from '@/components/home/UserForm.vue';

import AsCard from '@/library/components/atoms/as-card/AsCard.vue';
import AsButton from '@/library/components/atoms/as-button/AsButton.vue';

import { useAuthStore } from '@/stores/auth';
import { useUsersStore } from '@/stores/users';

const authStore = useAuthStore();
const usersStore = useUsersStore();

const logout = () => {
  authStore.logout();
};
onBeforeMount(() => {
  usersStore.getAllUsers();
});
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

    @include font-sizing-selector('heading/small');
  }

  &__button {
    margin-bottom: 12px;
  }
}
</style>
