<template>
  <form class="main-login-form" data-cy="login-view">
    <button-translation />
    <div class="columns is-centered">
      <div class="column main-login-form_logo">
        <logo-app />
      </div>
    </div>
    <div class="columns is-centered is-mobile">
      <div class="column is-6-desktop is-10-mobile is-8-tablet container">
        <h1 class="main-login-form_title title">
          {{ $t('common.title.login') }}
        </h1>

        <EmailInput
          @input="onEmailInput"
          @check-email="onCheckEmail"
          @enter="onEnter"
          view="login"
        />

        <password-input
          @input="onPasswordInput"
          @check-password="onCheckPassword"
          @enter="onEnter"
          view="login"
        />

        <div class="columns is-vcentered main-login-form_button-section">
          <div class="column is-3 is-2-fullhd">
            <b-button
              @click="checkLogin()"
              outlined
              type="is-danger"
              size="is-medium"
              data-cy="submit"
              :disabled="isInvalidForm"
            >
              {{ $t('views.login.mailLoginForm.button') }}
            </b-button>
          </div>
          <!-- <div class="column">
            <p class="main-login-form_invitation" data-cy="invitation">
              {{ $t('views.login.mailLoginForm.noAccount') }}
              <span
                @click="enableRegisterProgress"
                class="main-login-form_invitation-link"
              >
                {{ $t('views.login.mailLoginForm.accessToInvitation') }}
              </span>
            </p> Link to input invitational code
          </div> -->
        </div>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';

import LogoApp from '../Navigation/LogoApp.vue';
import EmailInput from '../Login/EmailInput.vue';
// import PasswordInput from '@/components/Login/PasswordInput.vue';
// import ButtonTranslation from '@/components/common/ButtonTranslation.vue';
// import { string } from 'yargs';

const authStore = useAuthStore();

const email = ref<string>('');
const isEmailValid = ref<boolean>(true);

const password = ref<string>('');
const isPasswordValid = ref<boolean>(true);

function isInvalidForm(): boolean {
  return email.value === '' && password.value === ''
    ? true
    : !isEmailValid.value || !isPasswordValid.value
    ? true
    : false;
}

function onEnter(): void {
  if (!isInvalidForm) {
    checkLogin();
  }
}

function onEmailInput(emailParameter: string): void {
  email.value = emailParameter;
}

function onCheckEmail(isEmailValidParameter: boolean): void {
  isEmailValid.value = isEmailValidParameter;
}

function onPasswordInput(passwordParameter: string): void {
  password.value = passwordParameter;
}

function onCheckPassword(isPasswordValidParameter: boolean): void {
  isPasswordValid.value = isPasswordValidParameter;
}

function checkLogin() {
  authStore.login({
    email: email.value,
    password: password.value,
  });
}

// private enableRegisterProgress(): void {
//   this.authStore.actions.enableRegisterProcess();

//   this.$router.push('/invitation');
// } // Functionality to register user using invitational code
</script>

<style lang="scss" scoped>
.main-login-form {
  &_button-section {
    padding-top: 2.25rem;
  }

  &_invitation-link {
    cursor: pointer;
    color: $main-color !important;
    &:hover {
      text-decoration-line: underline;
    }
  }

  &_invitation {
    font-size: 1.25em;
  }
  &_logo {
    margin-top: 3.12rem;
    margin-bottom: 3.12rem;
  }
}
</style>
