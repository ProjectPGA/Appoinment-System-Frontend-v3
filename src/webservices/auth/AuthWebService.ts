import axiosInstance from '@/webservices/models/http';

import { getJsonHeaders } from '../utils';

import { UserAuthData } from '@/models/user/UserAuthData';
import { LoginRequest } from '@/webservices/models/auth/LoginRequest';
import { authWebserviceBaseUrls } from '@/webservices/models/auth/AuthWebServiceBaseUrls';

/**
 * The loginService function sends a POST request to a specified URL with login
 * parameters and returns user authentication data.
 *
 * @param params - The `params` parameter in the `loginService` function is of type `LoginRequest`,
 * which likely contains the necessary data for a user to log in, such as username and password.
 *
 * @param [throwGlobalErrors=false] - The `throwGlobalErrors` parameter in the `getAllUsersService`
 * function is a boolean flag that indicates whether global errors should be thrown or not during the
 * API request. If `throwGlobalErrors` is set to `true`, any global errors encountered during the
 * request will be thrown
 *
 * @returns The loginService function returns a Promise that resolves to either a UserAuthData object
 * or null.
 */
export const loginService: (
  params: LoginRequest,
  throwGlobalErrors?: boolean
) => Promise<UserAuthData | null> = async (
  params,
  throwGlobalErrors = false
) => {
  const response = await axiosInstance.post<UserAuthData>(
    authWebserviceBaseUrls.login,
    params,
    getJsonHeaders(throwGlobalErrors)
  );
  return response.data;
};

/**
 * The `logoutService` function in TypeScript logs out a user by making a request to the logout
 * endpoint with optional throwGlobalErrors data.
 *
 * @param [throwGlobalErrors=false] - The `throwGlobalErrors` parameter in the `getAllUsersService`
 * function is a boolean flag that indicates whether global errors should be thrown or not during the
 * API request. If `throwGlobalErrors` is set to `true`, any global errors encountered during the
 * request will be thrown
 */
export const logoutService: (
  throwGlobalErrors?: boolean
) => Promise<void> = async (throwGlobalErrors = false) => {
  await axiosInstance.get<void>(authWebserviceBaseUrls.logout, {
    withCredentials: true,
    throwGlobalErrors: throwGlobalErrors,
  });
};
