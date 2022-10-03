import { defineStore } from 'pinia';
import { ref } from 'vue';

import { UserData } from '../models/user/UserData';

import { LoginRequest } from '../webservices/models/auth/LoginRequest';

import { loginService } from '../webservices/AuthWebservice';

export const useAuthStore = defineStore('auth', () => {
  const userData = ref<UserData>();

  async function login(loginData: LoginRequest) {
    const response: UserData = await loginService({
      email: loginData.email,
      password: loginData.password,
    });

    userData.value = response;
  }

  return { userData, login };
});
