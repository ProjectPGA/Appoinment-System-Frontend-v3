import http from '@/webservices/models/http';

import { jsonHeaders } from '@/webservices/consts';

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
 * @param [raw=false] - The `raw` parameter in the `loginService` function is a boolean flag that
 * indicates how the error handler should behave. If `raw` is set to `true` global error handling
 * will not check for error on global errors.
 *
 * @returns The loginService function returns a Promise that resolves to either a UserAuthData object
 * or null.
 */
export const loginService: (
  params: LoginRequest,
  raw?: boolean
) => Promise<UserAuthData | null> = async (params, raw = false) => {
  const jsonHeadersRequest = {
    ...jsonHeaders,
    raw: raw,
  };
  const response = await http.post<UserAuthData>(
    authWebserviceBaseUrls.login,
    params,
    jsonHeadersRequest
  );
  return response.data;
};

/**
 * The `logoutService` function in TypeScript logs out a user by making a request to the logout
 * endpoint with optional raw data.
 * @param [raw=false] - The `raw` parameter in the `logoutService` function is a boolean parameter that
 * indicates how the error handler should behave. If `raw` is set to `true` global error handling
 * will not check for error on global errors.
 */
export const logoutService: (raw?: boolean) => Promise<void> = async (
  raw = false
) => {
  await http.get<void>(authWebserviceBaseUrls.logout, {
    withCredentials: true,
    raw: raw,
  });
};
