<template>
  <div class="main-login">
    <button-translation />
    <div class="columns is-centered">
      <div class="column main-login_logo">
        <logo-app />
      </div>
    </div>
    <div class="columns is-centered is-mobile">
      <div class="column is-6-desktop is-10-mobile is-8-tablet container">
        <h1 class="main-login_title title">
          {{ $t('common.title.login') }}
        </h1>
        <form class="main-login__form" @submit="onSubmit">
          <validation-input
            v-model="email"
            :cy="'-' + page"
            name="email"
            required
            type="text"
            :label="$t('views.form.emailInputLabel')"
            :placeholder="$t('views.form.emailInputLabel')"
            input-classes="is-medium"
            regex="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
          />
          <validation-input
            v-model="password"
            :cy="'-' + page"
            name="password"
            required
            type="password"
            :label="$t('views.form.passwordInputLabel')"
            :placeholder="$t('views.form.passwordInputLabel')"
            input-classes="is-medium is-password"
          />
          <div class="columns is-vcentered main-login__button-section">
            <div class="column is-3 is-2-fullhd">
              <button
                class="button is-medium is-danger is-outlined"
                outlined
                size="is-medium"
                data-cy="submit"
                :disabled="!isValid && isDirty"
              >
                {{ $t('views.login.loginForm.button') }}
              </button>
            </div>
            <div class="column">
              <p class="main-login__invitation" data-cy="invitation">
                {{ $t('views.login.loginForm.noAccount') }}
                <span class="main-login__invitation-link">
                  {{ $t('views.login.loginForm.accessToInvitation') }}
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useForm, useIsFormDirty, useIsFormValid } from 'vee-validate';
import { useToast } from 'vue-toastification';

import LogoApp from '../Navigation/LogoApp.vue';
import ButtonTranslation from '../common/ButtonTranslation.vue';
import ValidationInput from '@/components/ValidationInput.vue';

const { handleSubmit } = useForm();
const isDirty = useIsFormDirty();
const isValid = useIsFormValid();
const toast = useToast();

const authStore = useAuthStore();

const email = ref<string>('');
const password = ref<string>('');
const page = ref<string>('login-page');

function onInvalidSubmit() {
  toast.error('Rellene los campos correctamente');
}

const onSubmit = handleSubmit(() => {
  authStore.login({
    email: email.value,
    password: password.value,
  });
}, onInvalidSubmit);
</script>
<style lang="scss" scoped>
.main-login {
  &_logo {
    margin-top: 49.92px;
    margin-bottom: 49.92px;
  }

  &__button-section {
    padding-top: 36px;
  }

  &__invitation-link {
    cursor: pointer;
    color: $main-color !important;

    &:hover {
      text-decoration-line: underline;
    }
  }

  &__invitation {
    font-size: 1.25em;
  }
}
</style>
