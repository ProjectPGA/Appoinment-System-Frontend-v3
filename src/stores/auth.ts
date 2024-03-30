import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';

import { UserAuthData } from '@/models/user/UserAuthData';

import { RequestStatus } from '@/models/auth/RequestStatus';

import { LoginRequest } from '@/webservices/models/auth/LoginRequest';

import {
  loginService,
  logoutService,
  // registerService,
  // checkInvitationalCodeService,
} from '@/webservices/AuthWebservice';

export const useAuthStore = defineStore('auth', () => {
  const userAuthData = ref<UserAuthData | null>(null);
  const isLogged = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const isRegisterProcess = ref<boolean>(false);
  const loginRequestStatus = ref<RequestStatus>(RequestStatus.IN_PROGRESS);

  const toast = useToast();
  const { t } = useI18n();
  const router = useRouter();

  // Common private Methods

  /**
   * This function sets the user's login status to not logged in and clears their user data.
   */
  const setUserNotisLogged = (): void => {
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
  const setIsLogged = (user: UserAuthData): void => {
    loginRequestStatus.value = RequestStatus.SUCCESS;
    isLoading.value = false;
    isLogged.value = true;
    userAuthData.value = user;

    router.push({ name: 'home' });
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

      response ? setIsLogged(response) : setUserNotisLogged();
    } catch (error) {
      setLoginFailed();
      toast.error(t('common.notifications.error.loginFailure'));
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

      setUserNotisLogged();
      router.push({ name: 'Login' });
    } catch (error) {
      setUserNotisLogged();
    }
  };

  /**
   * This is an asynchronous function that registers a user and sets their login status based on the
   * response.
   * @param {RegisterRequest} registerData - `registerData` is an object of type `RegisterRequest` which
   * contains the data required for user registration. It may include fields such as `email`, `password`,
   * `firstName`, `lastName`, etc.
   */
  // const register = async (registerData: RegisterRequest): Promise<void> => {
  //   try {
  //     setLoginInProgress();

  //     const response: UserAuthData = await registerService(registerData);

  //     response.user ? setIsLogged(response) : setUserNotisLogged();
  //   } catch (error) {
  //     setUserNotisLogged();
  //   }
  // };

  // Invitational Code

  /**
   * This is a function that checks an invitation code and sets some values accordingly.
   * @param {string} invitationCode - The `invitationCode` parameter is a string that represents the
   * code that is being checked for validity. It is passed as an argument to the
   * `checkInvitationalCode` function.
   */
  // const checkInvitationalCode = async (
  //   invitationCode: string
  // ): Promise<void> => {
  //   try {
  //     await checkInvitationalCodeService({ invitationCode });

  //     isRegisterProcess.value = true;
  //     isLoading.value = true;

  //     // TODO: Add router
  //     // router.push('/register');
  //   } catch (exception) {
  //     // TODO. Show error
  //     isRegisterProcess.value = false;
  //     isLoading.value = false;
  //   }
  // };

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
    setUserNotisLogged,
    setLoginInProgress,
  };
});
