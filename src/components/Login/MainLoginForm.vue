<template>
  <form class="main-login-form" @submit="onSubmit">
    <validation-input
      v-model="email"
      :cy="'-' + page"
      name="email"
      required
      type="text"
      :label="$t('common.inputs.emailInputLabel')"
      :placeholder="$t('common.inputs.emailInputLabel')"
      input-classes="is-medium-tablet"
      :regex="emailRegEx"
    />
    <validation-input
      v-model="password"
      :cy="'-' + page"
      name="password"
      required
      type="password"
      :label="$t('common.inputs.passwordInputLabel')"
      :placeholder="$t('common.inputs.passwordInputLabel')"
      input-classes="is-medium-tablet"
    />
    <div class="columns is-vcentered main-login-form__button-section">
      <div class="column is-3 is-2-fullhd">
        <button
          class="button is-medium is-danger is-outlined is-size-6-mobile"
          outlined
          size="is-medium"
          data-cy="submit"
          :disabled="!isValid"
        >
          {{ $t('common.buttons.loginButton') }}
        </button>
      </div>
      <div class="column">
        <p class="main-login-form__invitation" data-cy="invitation">
          {{ $t('views.login.loginForm.noAccount') }}
          <span class="main-login-form__invitation-link">
            {{ $t('views.login.loginForm.accessToInvitation') }}
          </span>
        </p>
      </div>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';
import { useForm, useIsFormValid } from 'vee-validate';

import { FormRegEx } from '@/models/formUtils/FormRegEx';

import ValidationInput from '@/components/FormUtils/ValidationInput.vue';

const { t } = useI18n();
const toast = useToast();

const { handleSubmit } = useForm();
const isValid = useIsFormValid();
const authStore = useAuthStore();

const emailRegEx: FormRegEx = FormRegEx.EMAIL;

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const page: Ref<string> = ref('login-page');

function onInvalidSubmit(): void {
  toast.error(t('common.notifications.invalidSubmit'));
}

async function startLogin(): Promise<void> {
  await authStore.login({
    email: email.value,
    password: password.value,
  });
}

const onSubmit = handleSubmit(() => {
  startLogin();
}, onInvalidSubmit);
</script>
<style lang="scss" scoped>
.main-login-form {
  &__button-section {
    padding-top: 36px;

    @include mobile {
      padding-top: 12px;
    }
  }

  &__invitation-link {
    cursor: pointer;
    color: $main-color !important;

    &:hover {
      text-decoration-line: underline;
    }
  }

  &__invitation {
    font-size: $size-5;

    @include mobile {
      font-size: $size-6;
    }
  }
}
</style>
