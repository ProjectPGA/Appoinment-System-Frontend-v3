<script lang="ts" setup>
import { computed, onBeforeMount } from 'vue';
import { RouterView } from 'vue-router';

import LoadingComponent from '@/components/common/LoadingComponent.vue';
import MainSidebar from '@/components/Sidebars/MainSidebar/MainSidebar.vue';
import MainLayout from './components/Layouts/MainLayout/MainLayout.vue';

import { useAuthStore } from '@/stores/auth';
import { setupAuthCookieListener } from './utils/functionUtils/authCookieFunctions';

const authStore = useAuthStore();

const { checkAuthentication } = setupAuthCookieListener();

onBeforeMount(() => {
  checkAuthentication();
});

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
