<template>
  <user-data
    v-for="(user, index) in authStore.users"
    :key="index"
    :user="user"
  />
</template>

<script lang="ts" setup>
import UserData from '@/components/common/UserData.vue';

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>
