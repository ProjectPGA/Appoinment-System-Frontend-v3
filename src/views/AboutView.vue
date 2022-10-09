<template>
  <div class="container">
    <section class="section">
      <h1 class="title">{{ $t('common.title.about') }}</h1>
      <div v-if="!authStore.isLoading" class="user-data">
        {{ authStore.userData }}
      </div>
      <LoadingComponent v-else />
      <input v-model="email" type="text" class="input" />
      <input v-model="password" type="password" class="input" />
      <button
        class="button is-primary"
        @click="
          authStore.login({
            email: email,
            password: password,
          })
        "
      >
        Login
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import LoadingComponent from '../components/common/LoadingComponent.vue';

const email = ref<string>('test@test.com');
const password = ref<string>('Tests.15');

const authStore = useAuthStore();
</script>

<style lang="scss" scoped>
.user-data {
  padding: 1rem;
}
</style>
