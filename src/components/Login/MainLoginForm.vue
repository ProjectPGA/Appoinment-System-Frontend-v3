<template>
  <form class="login-form" @submit="onSubmit">
    <as-input
      id="email-input-login"
      v-model="email"
      v-bind="emailAttrs"
      class="login-form__input"
      type="email"
      is-extended
      :is-invalid="errors.email ? true : false"
      :subtag="errors.email"
      :data-cy="'input-email-' + page"
      :placeholder="$t('common.inputs.emailInputLabel')"
    />
    <as-input
      id="password-input-login"
      v-model="password"
      v-bind="passwordAttrs"
      class="login-form__input"
      type="password"
      is-extended
      :subtag="errors.password"
      :is-invalid="errors.password ? true : false"
      :data-cy="'input-password-' + page"
      :placeholder="$t('common.inputs.passwordInputLabel')"
    />
    <as-button
      :data-cy="'submit-' + page"
      :label="$t('common.buttons.loginButton')"
      size="medium"
      secondary
      @click="onSubmit"
    />
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

import AsButton from '@/library/components/atoms/as-button/AsButton.vue';
import AsInput from '@/library/components/atoms/as-input/AsInput.vue';

const { t } = i18nGlobal;
const toast = useToast();

const authStore = useAuthStore();

const emailRegEx: RegExp = new RegExp(FormRegEx.EMAIL);

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .required(t('common.notifications.error.invalidSubmit'))
      .matches(emailRegEx, t('common.notifications.error.invalidSubmit')),
    password: yup
      .string()
      .min(3, t('common.notifications.error.invalidSubmit'))
      .required(t('common.notifications.error.invalidSubmit')),
  }),
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
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
const onSubmit = handleSubmit(startLogin, onInvalidSubmit);
</script>

<style lang="scss" scoped>
.login-form {
  &__input {
    margin-bottom: 16px;
  }
}
</style>
