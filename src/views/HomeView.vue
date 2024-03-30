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
        <span class="home-view__roles-badges">
          <AsBadge
            v-for="(items, index) in authStore.userAuthData?.roles"
            :key="index"
            :label="items"
            :class="{ 'is-success': items === 'ADMIN' }"
          />
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
import AsBadge from '@/library/atoms/as-badge/AsBadge.vue';

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
};
</script>

<style lang="scss" scoped>
.home-view {
  display: flex;

  &__data {
    margin-bottom: 12px;
  }

  &__roles-badges {
    display: inline-flex;
    gap: 8px;
  }
}
</style>
