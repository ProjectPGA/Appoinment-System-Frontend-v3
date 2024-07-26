<template>
  <section class="register-user-view__section">
    <div>
      <h1 class="register-user-view__title">
        {{ $t('views.home.titles.createUserTitle') }}
      </h1>
      <as-card>
        <user-form />
      </as-card>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';

import UserForm from '@/components/home/UserForm.vue';

import AsCard from '@/library/components/atoms/as-card/AsCard.vue';

import { useUsersStore } from '@/stores/users';

const usersStore = useUsersStore();

onBeforeMount(() => {
  usersStore.getAllUsers();
});
</script>

<style lang="scss" scoped>
.register-user-view {
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
