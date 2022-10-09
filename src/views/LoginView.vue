<template>
  <MainLoginForm />
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';

import MainLoginForm from '../components/Login/MainLoginForm.vue';

const authStore = useAuthStore();

// private mounted(): void {
//   this.authStore.actions.disableRegisterProcess();
// } Review the functionality that does it.
</script>

<style lang="scss" scoped>
.custom-margin {
  margin-top: 3%;
}
</style>
