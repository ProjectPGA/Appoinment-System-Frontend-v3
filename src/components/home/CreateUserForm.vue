<template>
  <as-card>
    <form class="create-user-form" @submit="onSubmit">
      <div class="create-user-form__inputs-container">
        <as-input
          id="create-user-name"
          v-model="name"
          v-bind="nameAttrs"
          :subtag="errors.name"
          :is-invalid="!!errors.name"
          :label="$t('views.home.createUser.name.label')"
          :placeholder="$t('views.home.createUser.name.placeholder')"
        />
        <as-input
          id="create-user-surname"
          v-model="surname"
          v-bind="surnameAttrs"
          :subtag="errors.surname"
          :is-invalid="!!errors.surname"
          :label="$t('views.home.createUser.surname.label')"
          :placeholder="$t('views.home.createUser.surname.placeholder')"
        />
      </div>
      <div class="create-user-form__inputs-container">
        <as-input
          id="create-user-email"
          v-model="email"
          v-bind="emailAttrs"
          :subtag="errors.email"
          :is-invalid="!!errors.email"
          :label="$t('views.home.createUser.email.label')"
          :placeholder="$t('views.home.createUser.email.placeholder')"
        />
        <div>
          <p class="create-user-form__checkboxes-title">
            {{ $t('views.home.createUser.roles.title') }}
          </p>
          <as-checkbox
            checkbox-id="admin-role"
            name="roles"
            checked-value="ADMIN"
            :label="$t('views.home.createUser.roles.admin.label')"
          />
          <as-checkbox
            checkbox-id="user-role"
            name="roles"
            checked-value="USER"
            :label="$t('views.home.createUser.roles.user.label')"
          />
          <span class="create-user-form__invalid-input">
            {{ errors.roles }}
          </span>
        </div>
      </div>
      <div class="create-user-form__inputs-container">
        <as-input
          id="create-user-password"
          v-model="password"
          v-bind="passwordAttrs"
          type="password"
          :subtag="errors.password"
          :is-invalid="!!errors.password"
          :label="$t('views.home.createUser.password.label')"
          :placeholder="$t('views.home.createUser.password.placeholder')"
        />
        <as-input
          id="create-user-repeat-password"
          v-model="repeatPassword"
          v-bind="repeatPasswordAttrs"
          type="password"
          :subtag="errors.repeatPassword"
          :is-invalid="!!errors.repeatPassword"
          :label="$t('views.home.createUser.repeatPassword.label')"
          :placeholder="$t('views.home.createUser.repeatPassword.placeholder')"
        />
      </div>
      <as-button type="submit">
        {{ $t('views.home.createUser.enterButton') }}
      </as-button>
    </form>
  </as-card>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { useToast } from 'vue-toastification';
import * as yup from 'yup';

import { useAuthStore } from '@/stores/auth';
import { i18nGlobal } from '@/localization/i18n';

import { User } from '@/models/user/User';

import AsCard from '@/library/components/atoms/as-card/AsCard.vue';
import AsInput from '@/library/components/atoms/as-input/AsInput.vue';
import AsButton from '@/library/components/atoms/as-button/AsButton.vue';
import AsCheckbox from '@/library/components/atoms/as-checkbox/AsCheckbox.vue';

const toast = useToast();
const authStore = useAuthStore();
const { t } = i18nGlobal;

const { defineField, errors, handleSubmit, values, setFieldError, resetForm } =
  useForm({
    validationSchema: yup.object({
      name: yup.string().required(t('views.home.createUser.name.required')),
      surname: yup
        .string()
        .required(t('views.home.createUser.surname.required')),
      email: yup
        .string()
        .email()
        .required(t('views.home.createUser.email.required')),
      roles: yup
        .array()
        .of(yup.string())
        .min(1, t('views.home.createUser.roles.invalid'))
        .required(t('views.home.createUser.roles.invalid')),
      password: yup
        .string()
        .min(6, t('views.home.createUser.password.invalid'))
        .required(t('views.home.createUser.password.required')),
      repeatPassword: yup
        .string()
        .oneOf(
          [yup.ref('password')],
          t('views.home.createUser.repeatPassword.invalid')
        ),
    }),
  });

const [password, passwordAttrs] = defineField('password');
const [name, nameAttrs] = defineField('name');
const [surname, surnameAttrs] = defineField('surname');
const [email, emailAttrs] = defineField('email');
const [repeatPassword, repeatPasswordAttrs] = defineField('repeatPassword');

const registerUser = async () => {
  const userRegisterData: User = {
    name: name.value,
    surname: surname.value,
    email: email.value,
    roles: values.roles,
    password: password.value,
  };
  const response = await authStore.register(userRegisterData);

  if (response.error) {
    response.status === 422
      ? setFieldError('email', t('views.home.createUser.email.exist'))
      : toast.error(t('views.home.createUser.error'));
  }

  if (!response.error) {
    toast.success(t('views.home.createUser.success'));
    resetForm();
  }
};

const onSubmit = handleSubmit(registerUser);
</script>

<style lang="scss" scoped>
.create-user-form {
  &__inputs-container {
    display: flex;
    gap: 16px;
    margin-bottom: 10px;
  }

  &__checkboxes-title {
    margin-bottom: 4px;
  }

  &__invalid-input {
    @include font-sizing-selector('body/medium/regular');

    color: $main-color-fail;
  }
}
</style>
