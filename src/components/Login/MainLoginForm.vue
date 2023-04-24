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
    />
    <div class="columns is-vcentered main-login-form__button-section">
      <div class="column is-3">
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

import ValidationInput from '@/components/common/ValidationInput.vue';

const { t } = useI18n();
const toast = useToast();

const { handleSubmit } = useForm();
const isValid = useIsFormValid();
const authStore = useAuthStore();

const emailRegEx: FormRegEx = FormRegEx.EMAIL;

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const page: Ref<string> = ref('login-page');

// The `onInvalidSubmit()` function is called when the form is submitted and is invalid, meaning that
// one or more of the form inputs do not meet the validation requirements set by `vee-validate`. The
// function displays an error toast message using the `vue-toastification` library, informing the user
// that the form submission was invalid.
function onInvalidSubmit(): void {
  toast.error(t('common.notifications.error.invalidSubmit'));
}

/**
 * The `startLogin()` function is an asynchronous function that awaits the `authStore.login()` method,
 * which is responsible for authenticating the user with the provided email and password. The `email`
 * and `password` values are obtained from the `email` and `password` refs, respectively. The function
 * @returns {Promise<void>} indicating that it does not return any value
 */
async function startLogin(): Promise<void> {
  await authStore.login({
    email: email.value,
    password: password.value,
  });
}

// `const onSubmit` is a function that is created using the `handleSubmit` function provided by the
// `vee-validate` library. It takes two arguments: the first argument is a callback function that is
// executed when the form is submitted and passes validation, and the second argument is a callback
// function that is executed when the form is submitted but fails validation.
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
