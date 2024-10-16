import { ref } from 'vue';
// import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
// import useToast from 'vue-toastification';

import { UserAuthData } from '@/models/user/UserAuthData';

import { RequestStatus } from '@/models/auth/RequestStatus';

import { LoginRequest } from '@/webservices/models/auth/LoginRequest';

import { loginService, logoutService } from '@/webservices/auth/AuthWebService';
import { RouteNames } from '@/models/routes/Routes';

export const useAuthStore = defineStore('auth', () => {
  const userAuthData = ref<UserAuthData | null>(null);
  const isLogged = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const isRegisterProcess = ref<boolean>(false);
  const loginRequestStatus = ref<RequestStatus>(RequestStatus.IN_PROGRESS);

  // const toast = useToast();
  // const { t } = useI18n();
  const router = useRouter();

  // Common private Methods

  /**
   * This function sets the user's login status to not logged in and clears their user data.
   */
  const setUserNotIsLogged = (): void => {
    loginRequestStatus.value = RequestStatus.PENDING;
    isLoading.value = false;
    isLogged.value = false;
    userAuthData.value = null;
  };

  /**
   * The function sets the login request status to failure, stops loading, and resets user data and
   * login status.
   */
  const setLoginFailed = (): void => {
    loginRequestStatus.value = RequestStatus.FAILURE;
    isLoading.value = false;
    isLogged.value = false;
    userAuthData.value = null;
  };

  /**
   * The function sets the login request status to "in progress" and sets the isLoading value to true.
   */
  const setLoginInProgress = (): void => {
    loginRequestStatus.value = RequestStatus.IN_PROGRESS;
    isLoading.value = true;
  };

  /**
   * The function sets the user as logged in and saves their JWT tokens.
   * @param {UserAuthData} user - UserAuthData, which is likely an interface or type defining the shape of user
   * data, such as an object with properties like name, email, and access tokens.
   */
  const setIsLogged = async (user: UserAuthData): Promise<void> => {
    loginRequestStatus.value = RequestStatus.SUCCESS;
    isLoading.value = false;
    isLogged.value = true;
    userAuthData.value = user;

    await router.push({ name: RouteNames.HOME });
  };

  // GLOBAL METHODS

  // AUTH
  /**
   * This is an asynchronous function that attempts to log in a user with provided login data and
   * displays an error message if the login fails.
   * @param {LoginRequest} loginData - `loginData` is an object of type `LoginRequest` which contains
   * the email and password entered by the user during the login process. This object is passed as an
   * argument to the `login` function.
   */
  const login = async (loginData: LoginRequest): Promise<void> => {
    try {
      setLoginInProgress();

      const response: UserAuthData | null = await loginService({
        email: loginData.email,
        password: loginData.password,
      });

      if (response) {
        await setIsLogged(response);
      } else {
        setUserNotIsLogged();
      }
    } catch (error) {
      setLoginFailed();
      // toast.error(t('common.notifications.error.loginFailure'));
      console.error(error);
    }
  };

  /**
   * This function logs out the user by removing their refresh token and access token from local
   * storage and setting the user as not logged in.
   */
  const logout = async (): Promise<void> => {
    try {
      await logoutService();

      setUserNotIsLogged();
      await router.push({ name: 'Login' });
    } catch (error) {
      console.error(error);
      setUserNotIsLogged();
    }
  };

  return {
    logout,
    login,
    userAuthData,
    isLogged,
    isLoading,
    setIsLogged,
    setLoginFailed,
    isRegisterProcess,
    loginRequestStatus,
    setUserNotIsLogged,
    setLoginInProgress,
  };
});
