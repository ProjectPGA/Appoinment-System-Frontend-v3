<template>
  <div class="main-login">
    <button
      class="button is-danger button-translations"
      @click="changeLanguage()"
    >
      <font-awesome-icon icon="fa-globe" />
      <span class="button-translations__locale">{{ $i18n.locale }}</span>
    </button>
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
import { useI18n } from 'vue-i18n';

import LogoApp from '../Navigation/LogoApp.vue';
import ValidationInput from '@/components/ValidationInput.vue';

const { handleSubmit } = useForm();
const isDirty = useIsFormDirty();
const isValid = useIsFormValid();
const toast = useToast();
const i18n = useI18n();

const authStore = useAuthStore();

const email = ref<string>('');
const password = ref<string>('');
const page = ref<string>('login-page');

function onInvalidSubmit() {
  toast.error('Rellene los campos correctamente');
}

function changeLanguage() {
  i18n.locale.value === 'es'
    ? (i18n.locale.value = 'en')
    : (i18n.locale.value = 'es');
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

.button-translations {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 1000;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  text-transform: uppercase;

  &__locale {
    margin-left: 8px;
  }
}
</style>
