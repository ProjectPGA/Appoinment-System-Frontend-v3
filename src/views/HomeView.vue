<template>
  <div>
    <button-translation />
    <section>
      <div>
        <div>
          <logo-app />
        </div>
      </div>
      <div>
        <p>
          email:
          {{ authStore?.userAuthData?.user?.email }}
        </p>
        <p>
          name:
          {{ authStore.userAuthData?.user?.name }}
        </p>
        <p>
          surname:
          {{ authStore?.userAuthData?.user?.surname }}
        </p>
        <p>
          roles:
          <span
            v-for="(items, index) in authStore?.userAuthData?.user?.roles"
            :key="index"
          >
            {{ items }}-
          </span>
        </p>
        <as-button label="Cerrar sesion" size="medium" @click="logout()" />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import LogoApp from '@/components/Navigation/LogoApp.vue';
import ButtonTranslation from '@/components/common/ButtonTranslation.vue';
import AsButton from '@/library/atoms/as-button/AsButton.vue';

import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const logout = () => {
  authStore.setLoginFailed();
  router.push({ name: 'Login' });
};
</script>
