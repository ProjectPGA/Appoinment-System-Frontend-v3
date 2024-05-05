<template>
  <user-data
    v-for="(user, index) in usersStore.users"
    :key="index"
    :user="user"
  >
    <as-button
      :label="$t('common.buttons.deleteButton')"
      @click="usersStore.deleteUser(user._id)"
    >
    </as-button>
  </user-data>
</template>

<script lang="ts" setup>
import UserData from '@/components/common/UserData.vue';

import AsButton from '@/library/components/atoms/as-button/AsButton.vue';

import { useUsersStore } from '@/stores/users';

const usersStore = useUsersStore();
</script>
