<script lang="ts" setup>
import UserData from '@/components/common/UserData.vue';

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <section class="my-account-view__section">
    <div>
      <h1 class="my-account-view__title">
        {{ $t('views.myAccount.title') }}
      </h1>
      <UserData :user="authStore.userAuthData" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.my-account-view {
  &__section {
    display: flex;
    flex-wrap: wrap;
    padding: 18px;
  }

  &__title {
    width: 100%;

    @include font-sizing-selector('heading/small');
  }
}
</style>
