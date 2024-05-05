import axios from 'axios';

import { jsonHeaders } from '../consts';

import { UserAuthData } from '@/models/user/UserAuthData';
import { LoginRequest } from '../models/auth/LoginRequest';
import { authWebserviceBaseUrls } from '../models/auth/AuthWebServiceBaseUrls';

/**
 * This is a function that sends a login request to a server and returns user data.
 * @returns The `loginService` function is returning a Promise that resolves to an object of type
 * `UserAuthData`. This object is obtained by making a POST request to the `/login` endpoint with
 * the `params` object as the request body and `jsonHeaders` as the request headers. The
 * `response.data` property is then returned as the result of the Promise.
 */
export const loginService: (
  params: LoginRequest
) => Promise<UserAuthData | null> = async params => {
  const response = await axios.post<UserAuthData>(
    authWebserviceBaseUrls.login,
    params,
    jsonHeaders
  );
  return response.data;
};

/**
 * This function sends a request to the server to log out the user.
 * @returns The function `logoutService` returns a Promise that resolves to `void`. It sends a GET
 */
export const logoutService: () => Promise<void> = async () => {
  await axios.get<void>(authWebserviceBaseUrls.logout, {
    withCredentials: true,
  });
};
