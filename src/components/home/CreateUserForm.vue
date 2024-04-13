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
          <p>{{ $t('views.home.createUser.roles.label') }}</p>
          <label for="admin" class="create-user-form__checkbox-label"
            ><input-checkbox name="roles" value="ADMIN" /> Admin</label
          >
          <label for="user" class="create-user-form__checkbox-label"
            ><input-checkbox name="roles" value="USER" /> User</label
          >
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

import AsCard from '@/library/components/atoms/as-card/AsCard.vue';
import AsInput from '@/library/components/atoms/as-input/AsInput.vue';
import AsButton from '@/library/components/atoms/as-button/AsButton.vue';
import InputCheckbox from './InputCheckbox.vue';
import { RegisterRequest } from '@/webservices/models/auth/RegisterRequest';

const toast = useToast();
const authStore = useAuthStore();

const { defineField, errors, handleSubmit, values } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Name is required'),
    surname: yup.string().required('Surname is required'),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match'),
  }),
});

const [password, passwordAttrs] = defineField('password');
const [name, nameAttrs] = defineField('name');
const [surname, surnameAttrs] = defineField('surname');
const [email, emailAttrs] = defineField('email');
const [repeatPassword, repeatPasswordAttrs] = defineField('repeatPassword');

const registerUser = async () => {
  const userRegisterData: RegisterRequest = {
    name: name.value,
    surname: surname.value,
    email: email.value,
    roles: values.roles,
    password: password.value,
  };
  await authStore.register(userRegisterData);
  toast.success('Usuario creado con éxito');
};

const onInvalidSubmit = () => {
  console.error('hola');
};

const onSubmit = handleSubmit(registerUser, onInvalidSubmit);
</script>

<style lang="scss" scoped>
.create-user-form {
  &__inputs-container {
    display: flex;
    gap: 16px;
    margin-bottom: 10px;
  }

  &__checkbox-label {
    display: flex;
    align-items: center;
    gap: 4px;
    margin: 4px 0;
  }
}
</style>
