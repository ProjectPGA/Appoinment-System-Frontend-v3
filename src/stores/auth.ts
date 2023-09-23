import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';

import { UserAuthData } from '@/models/user/UserAuthData';

import { AuthTockens } from '@/models/auth/AuthTockens';
import { RequestStatus } from '@/models/auth/RequestStatus';

// import { TokenResponse } from '@/webservices/models/auth/TokenResponse';

import { LoginRequest } from '@/webservices/models/auth/LoginRequest';
// import { RegisterRequest } from '@/webservices/models/auth/RegisterRequest';
import { LocalStorageAuthKeys } from '@/models/auth/LocalStorageAuthKeys';
import {
  loginService,
  // logoutService,
  // registerService,
  // renewTokenService,
  // checkUserTokenService,
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

  // JTW Methods
  /**
   * This function saves JWT access and refresh tokens to local storage if they are not null.
   * @param {AuthTockens} authTockens - `authTockens` is an object that contains two properties:
   * `accessToken` and `refreshToken`. These properties are of type `string | null`, which means they can
   * either be a string or null. The function `saveJWTTokens` takes this object as a parameter.
   */
  const saveJWTTokens = (authTockens: AuthTockens): void => {
    if (authTockens.accessToken !== null && authTockens.refreshToken !== null) {
      localStorage.setItem(
        LocalStorageAuthKeys.ACCESS_TOKEN,
        authTockens.accessToken
      );
      localStorage.setItem(
        LocalStorageAuthKeys.REFRESH_TOKEN,
        authTockens.refreshToken
      );
    }
  };
  /**
   * This function saves a JWT access token to local storage if it is not null.
   * @param {string | null} accessToken - The `accessToken` parameter is a string or null value that
   * represents a JSON Web Token (JWT) access token. It is used to authenticate and authorize a user's
   * access to protected resources on a web application.
   */
  // const saveJTWAccessToken = (accessToken: string | null): void => {
  //   if (accessToken !== null) {
  //     localStorage.setItem(LocalStorageAuthKeys.ACCESS_TOKEN, accessToken);
  //   }
  // };

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

    saveJWTTokens({
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    });
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

      const response: UserAuthData = await loginService({
        email: loginData.email,
        password: loginData.password,
      });

      response.user ? setIsLogged(response) : setUserNotisLogged();
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
  // const logout = async (): Promise<void> => {
  //   try {
  //     const refreshToken: string | null = localStorage.getItem(LocalStorageAuthKeys.REFRESH_TOKEN);

  //     if (refreshToken) {
  //       await logoutService({ refreshToken });

  //       localStorage.removeItem(LocalStorageAuthKeys.REFRESH_TOKEN);
  //       localStorage.removeItem(LocalStorageAuthKeys.ACCESS_TOKEN);

  //       setUserNotisLogged();
  //     }
  //   } catch (error) {
  //     setUserNotisLogged();
  //   }
  // };

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

  // TOKENS
  /**
   * This function renews the JWT access token using the refresh token stored in local storage.
   */
  // const renewToken = async (): Promise<void> => {
  //   try {
  //     const refreshToken: string | null = localStorage.getItem(LocalStorageAuthKeys.REFRESH_TOKEN);

  //     if (refreshToken) {
  //       const response: TokenResponse = await renewTokenService({
  //         token: refreshToken,
  //       });

  //       response
  //         ? saveJTWAccessToken(response.accessToken)
  //         : setUserNotisLogged();
  //     } else {
  //       setUserNotisLogged();
  //     }
  //   } catch (exception) {
  //     // TODO. Show error
  //     setUserNotisLogged();
  //   }
  // };

  /**
   * This function checks if a user's token is valid and logs them in if it is.
   */
  // const checkUserToken = async (): Promise<void> => {
  //   try {
  //     setLoginInProgress();

  //     const refreshToken: string | null = localStorage.getItem(LocalStorageAuthKeys.REFRESH_TOKEN);

  //     if (refreshToken) {
  //       const response: UserAuthData = await checkUserTokenService({
  //         token: refreshToken,
  //       });

  //       response ? setIsLogged(response) : setUserNotisLogged();
  //     } else {
  //       setUserNotisLogged();
  //     }
  //   } catch (exception) {
  //     // TODO. Show error
  //     setLoginFailed();
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
    login,
    userAuthData,
    isLogged,
    isLoading,
    setIsLogged,
    saveJWTTokens,
    setLoginFailed,
    isRegisterProcess,
    loginRequestStatus,
    setUserNotisLogged,
    setLoginInProgress,
  };
});
