<template>
  <main-layout v-if="authStore.isLogged">
    <RouterView />
  </main-layout>
  <RouterView v-else />
  <loading-component v-if="isLoading" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import LoadingComponent from '@/components/common/LoadingComponent.vue';
import MainLayout from './components/Layouts/MainLayout/MainLayout.vue';

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const isLoading = computed(() => authStore.isLoading);
</script>
