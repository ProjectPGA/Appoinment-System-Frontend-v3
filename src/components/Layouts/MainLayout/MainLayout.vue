<template>
  <div class="main-layout">
    <button-translation />
    <aside class="main-sidebar">
      <nav class="main-sidebar__nav">
        <h1 class="main-sidebar__title">
          <img
            src="/img/appointment-logo.svg"
            width="32"
            height="30"
            title="Appointment Logo"
            alt="Appointment Logo Image"
          />
          <span class="main-sidebar__title-text">{{
            $t('common.components.sidebar.title')
          }}</span>
        </h1>
        <ul class="main-sidebar__nav-container">
          <li>
            <router-link to="/appointments">
              <as-nav-label
                label-text="Appointments"
                :active="
                  router.currentRoute.value.name == RouteNames.APPOINTMENTS
                "
                :right-icon-name="IconName.ANGLE_RIGHT"
              />
            </router-link>
          </li>
          <li>
            <router-link to="/users">
              <as-nav-label
                label-text="Users"
                :active="router.currentRoute.value.name == RouteNames.USERS"
                :left-icon-name="IconName.USERS"
                :right-icon-name="IconName.ANGLE_RIGHT"
              />
            </router-link>
          </li>
          <li>
            <router-link to="/register-user">
              <as-nav-label
                label-text="To Register"
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
              label-text="Chat Bot"
              :left-icon-name="IconName.COMMENTS"
              :right-icon-name="IconName.ANGLE_RIGHT"
              disabled
            />
          </li>
        </ul>
        <div class="main-sidebar__footer">
          <ul class="main-sidebar__nav-footer">
            <li>
              <as-nav-label
                label-text="Configuration"
                :left-icon-name="IconName.GEAR"
                :right-icon-name="IconName.ANGLE_RIGHT"
              />
            </li>
            <li>
              <as-nav-label
                label-text="Log out"
                :left-icon-name="IconName.ARROW_RIGHT_FROM_BRACKET"
                :right-icon-name="IconName.ANGLE_RIGHT"
                @click="logout()"
              />
            </li>
          </ul>
          <div class="as-profile-card">
            <div class="as-profile-card__image"></div>
            <div class="as-profile-card__user-info">
              <p class="as-profile-card__user-name">
                {{
                  `${authStore.userAuthData?.name} ${authStore.userAuthData?.surname}`
                }}
              </p>
              <p class="as-profile-card__user-email">
                {{ authStore.userAuthData?.email }}
              </p>
            </div>
          </div>
        </div>
      </nav>
    </aside>
    <main class="main-layout__content">
      <slot></slot>
    </main>
  </div>
</template>
<script lang="ts" setup>
import AsNavLabel from '@/library/components/molecules/as-nav-label/AsNavLabel.vue';
import { IconName } from '@/models/icons/fontawesome/iconsDictionary';

import ButtonTranslation from '@/components/common/ButtonTranslation.vue';

import { useAuthStore } from '@/stores/auth';
import { RouterLink, useRouter } from 'vue-router';
import { RouteNames } from '@/models/routes/Routes';

const router = useRouter();

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
};
</script>
<style lang="scss" scoped>
.main-layout {
  display: flex;
  height: 100vh;

  &__content {
    overflow-y: auto;
  }
}

.main-sidebar {
  padding: 24px;
  box-shadow: 5px 0 18px 0 rgb(0 0 0 / 4%);

  &__title {
    @include font-sizing-selector('heading/small');

    grid-row-start: first-row;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px;

    @include mq-touch {
      justify-content: center;
    }
  }

  &__title-text {
    @include mq-touch {
      display: none;
    }
  }

  &__nav {
    display: grid;
    grid-template-rows: [first-row] max-content [second-row] max-content [third-row] auto [last-row] max-content;
    height: 100%;
  }

  &__nav-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    grid-row-start: second-row;
    margin-top: 24px;
  }

  &__nav-footer {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__footer {
    grid-row-start: last-row;
  }
}

.as-profile-card {
  padding: 12px 0;
  display: flex;
  align-items: center;
  gap: 16px;

  @include font-sizing-selector('body/small/regular');

  @include mq-touch {
    display: inline-block;
  }

  &__image {
    background-color: $colors-primary-60;
    width: 54px;
    height: 54px;
    border-radius: 54px;
  }

  &__user-name {
    margin-bottom: 4px;
    color: $colors-info-100;

    @include mq-touch {
      display: none;
    }
  }

  &__user-email {
    color: $colors-black-10;

    @include mq-touch {
      display: none;
    }
  }
}
</style>
