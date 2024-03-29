<template>
  <button-translation />
  <section class="home-view">
    <AsCard>
      <p class="home-view__data">
        <strong>{{ $t('views.home.userData.email') }}</strong>
        {{ authStore.userAuthData?.email }}
      </p>
      <p class="home-view__data">
        <strong>{{ $t('views.home.userData.name') }}</strong>
        {{ authStore.userAuthData?.name }}
      </p>
      <p class="home-view__data">
        <strong>{{ $t('views.home.userData.surname') }}</strong>
        {{ authStore.userAuthData?.surname }}
      </p>
      <p class="home-view__data">
        <strong>{{ $t('views.home.userData.roles') }}</strong>
        <span
          v-for="(items, index) in authStore.userAuthData?.roles"
          :key="index"
        >
          {{ items + '/' }}
        </span>
      </p>
      <as-button
        :label="$t('common.buttons.logoutButton')"
        size="medium"
        @click="logout()"
      />
    </AsCard>
  </section>
</template>

<script lang="ts" setup>
import ButtonTranslation from '@/components/common/ButtonTranslation.vue';
import AsButton from '@/library/atoms/as-button/AsButton.vue';
import AsCard from '@/library/atoms/as-card/AsCard.vue';

import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const logout = () => {
  authStore.setLoginFailed();
  router.push({ name: 'Login' });
};
</script>

<style lang="scss" scoped>
.home-view {
  display: flex;

  &__data {
    margin-bottom: 12px;
  }
}
</style>
