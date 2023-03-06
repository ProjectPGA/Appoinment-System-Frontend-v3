<template>
  <div class="main-login">
    <select
      id="languageChangeSelect"
      v-model="$i18n.locale"
      class="button-translations"
    >
      <option
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ locale }}
      </option>
    </select>
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
            input-classes="is-medium"
            regex="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
          />
          <div class="columns is-vcentered main-login__button-section">
            <div class="column is-3 is-2-fullhd">
              <button
                class="button is-medium is-danger is-outlined"
                outlined
                size="is-medium"
                data-cy="submit"
                :disabled="!isValid && isDirty"
                @click="login()"
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
import ValidationInput from '../ValidationInput.vue';

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

.button-translations {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 1000;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  text-transform: uppercase;

  //   ::v-deep > span {
  //     display: flex;
  //   }

  &_icon {
    margin-left: 0 !important;
  }

  &_language {
    line-height: 22px;
  }
}
</style>
