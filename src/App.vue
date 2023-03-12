<template>
  <!-- <header class="page-header">
    <img
      src="./assets/vue.svg"
      class="logo"
      alt="Vite logo"
      width="66px"
      height="64px"
      data-cy="logo-app"
    />
    <p class="custom-text-font">{{ $t('common.title.vue') }}</p>
    <nav id="navbar">
      <ul
        class="nav-container flex justify-center typography is-body is-large-semi custom-text-font"
      >
        <li class="nav-list flex-row">
          <RouterLink class="link link" :to="{ name: 'Home' }">
            {{ $t('common.title.home') }}
          </RouterLink>
        </li>

        <li class="nav-list flex-row">
          <RouterLink id="formLink" class="link link" :to="{ name: 'Form' }">
            {{ $t('common.title.form') }}
          </RouterLink>
        </li>
      </ul>
      <select id="languageChangeSelect" v-model="$i18n.locale">
        <option
          v-for="locale in $i18n.availableLocales"
          :key="`locale-${locale}`"
          :value="locale"
        >
          {{ locale }}
        </option>
      </select>
    </nav>
  </header>
  <main id="app-body">
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </main> -->
  <RouterView />
  <loading-component v-if="isLoading" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import LoadingComponent from './components/Utils/LoadingComponent.vue';

import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();

const isLoading = computed(() => authStore.isLoading);
</script>

<style lang="scss" scoped>
// App styles
</style>
