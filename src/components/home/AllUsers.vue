<template>
  <user-data v-for="(user, index) in authStore.users" :key="index" :user="user">
    <as-button
      :label="$t('common.buttons.deleteButton')"
      @click="authStore.deleteUser(user._id)"
    >
    </as-button>
  </user-data>
</template>

<script lang="ts" setup>
import UserData from '@/components/common/UserData.vue';

import AsButton from '@/library/components/atoms/as-button/AsButton.vue';

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>
