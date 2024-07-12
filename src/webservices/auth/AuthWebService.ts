import axiosInstance from '@/webservices/models/http';

import { getRequestConfig } from '@/webservices/utils';

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
 * @returns The loginService function returns a Promise that resolves to either a UserAuthData object
 * or null.
 */
export const loginService: (
  params: LoginRequest
) => Promise<UserAuthData | null> = async params => {
  const response = await axiosInstance.post<UserAuthData>(
    authWebserviceBaseUrls.login,
    params,
    getRequestConfig()
  );
  return response.data;
};

/**
 * The `logoutService` function in TypeScript logs out a user by making a request to the logout
 * endpoint.
 *
 */
export const logoutService: () => Promise<void> = async () => {
  await axiosInstance.get<void>(authWebserviceBaseUrls.logout, {
    withCredentials: true,
  });
};
