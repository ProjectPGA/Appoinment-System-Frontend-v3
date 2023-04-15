import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';

import { UserData } from '../models/user/UserData';

import { AuthTockens } from '../models/auth/AuthTockens';
import { RequestStatus } from '../models/auth/RequestStatus';

import { TokenResponse } from '../webservices/models/auth/TokenResponse';

import { LoginRequest } from '../webservices/models/auth/LoginRequest';
import { RegisterRequest } from '../webservices/models/auth/RegisterRequest';

import {
  loginService,
  logoutService,
  registerService,
  renewTokenService,
  checkUserTokenService,
  checkInvitationalCodeService,
} from '../webservices/AuthWebservice';

export const useAuthStore = defineStore('auth', () => {
  const userData = ref<UserData | null>(null);
  const isLogged = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const isRegisterProcess = ref<boolean>(false);
  const loginRequestStatus = ref<RequestStatus>(RequestStatus.IN_PROGRESS);

  const toast = useToast();
  const { t } = useI18n();

  // JTW Methods
  const saveJTWTokens = (authTockens: AuthTockens): void => {
    if (authTockens.accessToken !== null && authTockens.refreshToken !== null) {
      localStorage.setItem('accessToken', authTockens.accessToken);
      localStorage.setItem('refreshToken', authTockens.refreshToken);
    }
  };
  const saveJTWAccessToken = (accessToken: string | null): void => {
    if (accessToken !== null) {
      localStorage.setItem('accessToken', accessToken);
    }
  };

  // Common private Methods
  const setUserNotisLogged = (): void => {
    loginRequestStatus.value = RequestStatus.PENDING;
    isLoading.value = false;
    isLogged.value = false;
    userData.value = null;
  };
  const setLoginFailed = (): void => {
    loginRequestStatus.value = RequestStatus.FAILURE;
    isLoading.value = false;
    isLogged.value = false;
    userData.value = null;
  };
  const setLoginInProgress = (): void => {
    loginRequestStatus.value = RequestStatus.IN_PROGRESS;
    isLoading.value = true;
  };
  const setIsLogged = (user: UserData): void => {
    loginRequestStatus.value = RequestStatus.SUCCESS;
    isLoading.value = false;
    isLogged.value = true;
    userData.value = user;

    saveJTWTokens({
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    });
  };

  // GLOBAL METHODS

  // AUTH
  const login = async (loginData: LoginRequest): Promise<void> => {
    try {
      setLoginInProgress();

      const response: UserData = await loginService({
        email: loginData.email,
        password: loginData.password,
      });

      response.user ? setIsLogged(response) : setUserNotisLogged();
    } catch (error) {
      setLoginFailed();
      toast.error(t('common.notifications.error.loginFailure'));
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const refreshToken: string | null = localStorage.getItem('refreshToken');

      if (refreshToken) {
        await logoutService({ refreshToken });

        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');

        setUserNotisLogged();
      }
    } catch (error) {
      setUserNotisLogged();
    }
  };

  const register = async (registerData: RegisterRequest): Promise<void> => {
    try {
      setLoginInProgress();

      const response: UserData = await registerService(registerData);

      response.user ? setIsLogged(response) : setUserNotisLogged();
    } catch (error) {
      setUserNotisLogged();
    }
  };

  // TOKENS
  const renewToken = async (): Promise<void> => {
    try {
      const refreshToken: string | null = localStorage.getItem('refreshToken');

      if (refreshToken) {
        const response: TokenResponse = await renewTokenService({
          token: refreshToken,
        });

        response
          ? saveJTWAccessToken(response.accessToken)
          : setUserNotisLogged();
      } else {
        setUserNotisLogged();
      }
    } catch (exception) {
      // TODO. Show error
      setUserNotisLogged();
    }
  };

  const checkUserToken = async (): Promise<void> => {
    try {
      setLoginInProgress();

      const refreshToken: string | null = localStorage.getItem('refreshToken');

      if (refreshToken) {
        const response: UserData = await checkUserTokenService({
          token: refreshToken,
        });

        response ? setIsLogged(response) : setUserNotisLogged();
      } else {
        setUserNotisLogged();
      }
    } catch (exception) {
      // TODO. Show error
      setLoginFailed();
    }
  };

  // Invitational Code

  const checkInvitationalCode = async (
    invitationCode: string
  ): Promise<void> => {
    try {
      await checkInvitationalCodeService({ invitationCode });

      isRegisterProcess.value = true;
      isLoading.value = true;

      // TODO: Add router
      // router.push('/register');
    } catch (exception) {
      // TODO. Show error
      isRegisterProcess.value = false;
      isLoading.value = false;
    }
  };

  return {
    login,
    userData,
    isLogged,
    isLoading,
    setIsLogged,
    setLoginFailed,
    isRegisterProcess,
    loginRequestStatus,
    setUserNotisLogged,
    setLoginInProgress,
  };
});
