<script lang="ts" setup>
import { computed } from 'vue';
import { RouterView } from 'vue-router';

import LoadingComponent from '@/components/common/LoadingComponent.vue';
import MainSidebar from '@/components/Sidebars/MainSidebar/MainSidebar.vue';
import MainLayout from './components/Layouts/MainLayout/MainLayout.vue';

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const isLoading = computed(() => authStore.isLoading);
</script>

<template>
  <MainLayout v-if="authStore.isLogged">
    <template #sidebar>
      <MainSidebar />
    </template>
    <RouterView />
  </MainLayout>
  <RouterView v-else />
  <LoadingComponent v-if="isLoading" />
</template>
