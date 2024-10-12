<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import AllUsers from '@/components/home/AllUsers.vue';

import { useUsersStore } from '@/stores/users';

const usersStore = useUsersStore();
onBeforeMount(() => {
  usersStore.getAllUsers();
});
</script>

<template>
  <section class="users-view__section">
    <h1 class="users-view__title">
      {{ $t('views.home.titles.usersTitle') }}
    </h1>
    <AllUsers />
  </section>
</template>

<style lang="scss" scoped>
.users-view {
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
