<template>
  <RouterView />
  <loading-component v-if="isLoading" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import LoadingComponent from '@/components/common/LoadingComponent.vue';

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const isLoading = computed(() => authStore.isLoading);
</script>

<style lang="scss" scoped>
// App styles
</style>
