<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useForm } from 'vee-validate';
// import useToast from 'vue-toastification';

import * as yup from 'yup';

import { useUsersStore } from '@/stores/users';
import { i18nGlobal } from '@/localization/i18n';

import { UserRoles } from '@/models/user/UserRoles';

import AsInput from '@/library/components/atoms/as-input/AsInput.vue';
import AsButton from '@/library/components/atoms/as-button/AsButton.vue';
import AsCheckbox from '@/library/components/atoms/as-checkbox/AsCheckbox.vue';
import { RegisterUserRequest } from '@/models/user/registerUser';
import { UpdateUserRequest } from '@/models/user/updateUser';

interface Props {
  userId?: string;
  isUpdate?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'userUpdated'): void;
}>();

// const toast = useToast();
const usersStore = useUsersStore();
const { t } = i18nGlobal;

const { defineField, errors, handleSubmit, values, setFieldError, resetForm } =
  useForm({
    validationSchema: yup.object().shape({
      name: yup.string().required(t('views.home.userForm.name.required')),
      surname: yup.string().required(t('views.home.userForm.surname.required')),
      email: yup
        .string()
        .email(t('views.home.userForm.email.invalid'))
        .required(t('views.home.userForm.email.required')),
      roles: yup
        .array()
        .of(yup.string())
        .min(1, t('views.home.userForm.roles.invalid'))
        .required(t('views.home.userForm.roles.invalid')),
      password: yup
        .string()
        .min(6, t('views.home.userForm.password.invalid'))
        .required(t('views.home.userForm.password.required')),
      repeatPassword: yup
        .string()
        .oneOf(
          [yup.ref('password')],
          t('views.home.userForm.repeatPassword.invalid')
        ),
    }),
  });

const [password, passwordAttrs] = defineField('password');
const [name, nameAttrs] = defineField('name');
const [surname, surnameAttrs] = defineField('surname');
const [email, emailAttrs] = defineField('email');
const [repeatPassword, repeatPasswordAttrs] = defineField('repeatPassword');

// The `sendUserData` function is responsible for handling the submission of user data either for
// updating an existing user or creating a new user. Here's a breakdown of what the function does:
const sendUserData = async (): Promise<void> => {
  let response = null;

  if (props.isUpdate) {
    const userUpdateData = {
      name: name.value,
      surname: surname.value,
      email: email.value,
      roles: values.roles,
      password: password.value,
      updatedAt: new Date(),
    };

    if (props.userId) {
      response = await usersStore.updateUser(props.userId, userUpdateData);
      emit('userUpdated');
    } else {
      console.error('sendUserData - Error: userId is not available');
    }
  } else {
    const userRegisterData: RegisterUserRequest = {
      name: name.value,
      surname: surname.value,
      email: email.value,
      roles: values.roles,
      password: password.value,
    };
    response = await usersStore.register(userRegisterData);
  }
  if (!response) {
    return;
  }
  if (response.error) {
    if (response.status === 422) {
      setFieldError('email', t('views.home.userForm.email.exist'));
    } else {
      if (props.isUpdate) {
        // toast.error(t('views.home.userForm.errorUpdate'));
      } else {
        // toast.error(t('views.home.userForm.errorCreate'));
      }
    }
  }

  if (!response.error) {
    if (props.isUpdate) {
      // toast.success(t('views.home.userForm.successUpdate'));
    } else {
      // toast.success(t('views.home.userForm.successCreate'));
    }
    resetForm();
  }
};

// The `const onSubmit = handleSubmit(sendUserData);` line is defining a function called `onSubmit`
// that is responsible for handling the form submission. It uses the `handleSubmit` function provided
// by VeeValidate to wrap the `sendUserData` function.
const onSubmit = handleSubmit(sendUserData);

onBeforeMount(() => {
  if (!props.userId || !usersStore.users || !usersStore.users.length) {
    return;
  }
  if (!usersStore.users.length) {
    return;
  }
  const user = usersStore.users.find(user => user._id === props.userId);
  if (user) {
    name.value = user.name;
    surname.value = user.surname;
    email.value = user.email;
  }
});
</script>

<template>
  <form class="update-user-form" @submit="onSubmit">
    <div class="update-user-form__inputs-container">
      <AsInput
        :id="`${props.isUpdate ? 'update' : 'create'}-user-name`"
        v-model="name"
        v-bind="nameAttrs"
        :subtag="errors.name"
        :isInvalid="!!errors.name"
        :label="$t('views.home.userForm.name.label')"
        :placeholder="$t('views.home.userForm.name.placeholder')"
      />
      <AsInput
        :id="`${props.isUpdate ? 'update' : 'create'}-user-surname`"
        v-model="surname"
        v-bind="surnameAttrs"
        :subtag="errors.surname"
        :isInvalid="!!errors.surname"
        :label="$t('views.home.userForm.surname.label')"
        :placeholder="$t('views.home.userForm.surname.placeholder')"
      />
    </div>
    <div class="update-user-form__inputs-container">
      <AsInput
        :id="`${props.isUpdate ? 'update' : 'create'}-user-email`"
        v-model="email"
        v-bind="emailAttrs"
        :subtag="errors.email"
        :isInvalid="!!errors.email"
        :label="$t('views.home.userForm.email.label')"
        :placeholder="$t('views.home.userForm.email.placeholder')"
      />
      <div>
        <p class="update-user-form__checkboxes-title">
          {{ $t('views.home.userForm.roles.title') }}
        </p>
        <div class="update-user-form__checkboxes-container">
          <AsCheckbox
            :checkboxId="`${props.isUpdate ? 'update' : 'create'}-admin-role`"
            name="roles"
            :checkedValue="UserRoles.ADMIN"
            :label="$t('views.home.userForm.roles.admin.label')"
          />
          <AsCheckbox
            :checkboxId="`${props.isUpdate ? 'update' : 'create'}-user-role`"
            name="roles"
            :checkedValue="UserRoles.USER"
            :label="$t('views.home.userForm.roles.user.label')"
          />
        </div>
        <span class="update-user-form__invalid-input">
          {{ errors.roles }}
        </span>
      </div>
    </div>
    <div class="update-user-form__inputs-container">
      <AsInput
        :id="`${props.isUpdate ? 'update' : 'create'}-user-password`"
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        :subtag="errors.password"
        :isInvalid="!!errors.password"
        :label="$t('views.home.userForm.password.label')"
        :placeholder="$t('views.home.userForm.password.placeholder')"
      />
      <AsInput
        :id="`${props.isUpdate ? 'update' : 'create'}-user-repeat-password`"
        v-model="repeatPassword"
        v-bind="repeatPasswordAttrs"
        type="password"
        :subtag="errors.repeatPassword"
        :isInvalid="!!errors.repeatPassword"
        :label="$t('views.home.userForm.repeatPassword.label')"
        :placeholder="$t('views.home.userForm.repeatPassword.placeholder')"
      />
    </div>
    <AsButton type="submit" primary>
      <span v-if="!isUpdate">
        {{ $t('views.home.userForm.enterButtonCreate') }}
      </span>
      <span v-if="isUpdate">
        {{ $t('views.home.userForm.enterButtonUpdate') }}
      </span>
    </AsButton>
  </form>
</template>

<style lang="scss" scoped>
.update-user-form {
  &__inputs-container {
    display: flex;
    gap: 16px;
    margin-bottom: 10px;
  }

  &__checkboxes-container {
    display: flex;
    gap: 4px;
    flex-direction: column;
    align-items: flex-start;
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
