<template>
  <div class="main-login">
    <button-translation />
    <div class="columns is-centered">
      <div class="column main-login__logo">
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
            :regex="emailRegEx"
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
          />
          <div class="columns is-vcentered main-login__button-section">
            <div class="column is-3 is-2-fullhd">
              <button
                class="button is-medium is-danger is-outlined"
                outlined
                size="is-medium"
                data-cy="submit"
                :disabled="!isValid"
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
import { Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';
import { RequestStatus } from '@/models/auth/RequestStatus';
import { useForm, useIsFormValid } from 'vee-validate';

import { FormRegEx } from '@/models/formUtils/FormRegEx';

import LogoApp from '@/components/Navigation/LogoApp.vue';
import ButtonTranslation from '@/components/common/ButtonTranslation.vue';
import ValidationInput from '@/components/FormUtils/ValidationInput.vue';

const { handleSubmit } = useForm({});

const isValid = useIsFormValid();
const { t } = useI18n();
const toast = useToast();

const authStore = useAuthStore();

const emailRegEx: FormRegEx = FormRegEx.EMAIL;

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const page: Ref<string> = ref('login-page');

function onInvalidSubmit(): void {
  toast.error(t('views.form.invalidSubmit'));
}

function loginFailure(): void {
  toast.error(t('views.form.loginFailure'));
}

async function startLogin(): Promise<void> {
  await authStore.login({
    email: email.value,
    password: password.value,
  });

  if (authStore.loginRequestStatus === RequestStatus.FAILURE) {
    loginFailure();
  }
}

const onSubmit = handleSubmit(() => {
  startLogin();
}, onInvalidSubmit);
</script>
<style lang="scss" scoped>
.main-login {
  &__logo {
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
    font-size: 1.25rem;
  }
}
</style>
