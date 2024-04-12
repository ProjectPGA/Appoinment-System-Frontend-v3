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
    </div>
    <div>
      <h2 class="home-view__title">
        {{ $t('views.home.titles.createUserTitle') }}
      </h2>
      <as-card>
        <form class="create-user-form">
          <div class="create-user-form__inputs-container">
            <as-input
              :label="$t('views.home.createUser.name.label')"
              :placeholder="$t('views.home.createUser.name.placeholder')"
            />
            <as-input
              :label="$t('views.home.createUser.surname.label')"
              :placeholder="$t('views.home.createUser.surname.placeholder')"
            />
          </div>
          <div class="create-user-form__inputs-container">
            <as-input
              :label="$t('views.home.createUser.email.label')"
              :placeholder="$t('views.home.createUser.email.placeholder')"
            />
            <as-input
              :label="$t('views.home.createUser.roles.label')"
              :placeholder="$t('views.home.createUser.roles.placeholder')"
            />
          </div>
          <div class="create-user-form__inputs-container">
            <as-input
              type="password"
              :label="$t('views.home.createUser.password.label')"
              :placeholder="$t('views.home.createUser.password.placeholder')"
            />
            <as-input
              type="password"
              :label="$t('views.home.createUser.repeatPassword.label')"
              :placeholder="
                $t('views.home.createUser.repeatPassword.placeholder')
              "
            />
          </div>
          <as-button>
            {{ $t('views.home.createUser.enterButton') }}
          </as-button>
        </form>
      </as-card>
    </div>
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

import AsCard from '@/library/components/atoms/as-card/AsCard.vue';
import AsInput from '@/library/components/atoms/as-input/AsInput.vue';
import AsButton from '@/library/components/atoms/as-button/AsButton.vue';

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

    @include font-sizing-selector('heading/small');
  }

  &__button {
    margin-bottom: 12px;
  }
}

.create-user-form {
  &__inputs-container {
    display: flex;
    gap: 16px;
    margin-bottom: 10px;
  }
}
</style>
