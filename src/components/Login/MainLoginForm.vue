<template>
  <form @submit="onSubmit">
    <input
      type="email"
      v-bind="email"
      :data-cy="'input-email-' + page"
      :label="$t('common.inputs.emailInputLabel')"
      :placeholder="$t('common.inputs.emailInputLabel')"
    />
    <div>{{ errors.email }}</div>

    <input
      type="password"
      v-bind="password"
      :data-cy="'input-password-' + page"
      :label="$t('common.inputs.passwordInputLabel')"
      :placeholder="$t('common.inputs.passwordInputLabel')"
    />
    <div>{{ errors.password }}</div>

    <button outlined :data-cy="'submit-' + page">
      {{ $t('common.buttons.loginButton') }}
    </button>
    <div>
      <p data-cy="invitation">
        {{ $t('views.login.loginForm.noAccount') }}
        <span>
          {{ $t('views.login.loginForm.accessToInvitation') }}
        </span>
      </p>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

import { FormRegEx } from '@/models/formUtils/FormRegEx';
import { i18nGlobal } from '@/localization/i18n';

const { t } = i18nGlobal;
const toast = useToast();

const authStore = useAuthStore();

const emailRegEx: RegExp = new RegExp(FormRegEx.EMAIL);

const { errors, handleSubmit, defineInputBinds } = useForm({
  validationSchema: yup.object({
    email: yup
      .string()
      .required(t('common.notifications.error.invalidSubmit'))
      .matches(emailRegEx, t('common.notifications.error.invalidSubmit')),
    password: yup
      .string()
      .min(6, t('common.notifications.error.invalidSubmit'))
      .required(t('common.notifications.error.invalidSubmit')),
  }),
});

const email = defineInputBinds('email');
const password = defineInputBinds('password');
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
    email: email.value.value,
    password: password.value.value,
  });
}

// `const onSubmit` is a function that is created using the `handleSubmit` function provided by the
// `vee-validate` library. It takes two arguments: the first argument is a callback function that is
// executed when the form is submitted and passes validation, and the second argument is a callback
// function that is executed when the form is submitted but fails validation.
const onSubmit = handleSubmit(startLogin, onInvalidSubmit);
</script>
<style lang="scss" scoped>
// Styles
</style>
