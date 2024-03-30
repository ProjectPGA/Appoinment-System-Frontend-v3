import axios from 'axios';

import { apiPrefix, jsonHeaders } from './consts';

import { UserAuthData } from '@/models/user/UserAuthData';
import { LoginRequest } from './models/auth/LoginRequest';
// import { LogoutRequest } from './models/auth/LogoutRequest';
import { InvitationalCodeRequest } from './models/auth/InvitationalCodeRequest';
import { CheckMailRequest } from './models/auth/CheckMailRequest';
import { RegisterRequest } from './models/auth/RegisterRequest';

/* `const baseUrl: string = apiPrefix('/auth');` is defining a constant variable `baseUrl` with a
string value that is obtained by calling the `apiPrefix` function with the argument `'/auth'`. The
`apiPrefix` function is likely used to add a prefix to the base URL of the API endpoint, which can
be useful for managing different environments (e.g. development, staging, production) with different
base URLs. */
const baseUrl: string = apiPrefix('/auth');

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
    `${baseUrl}/login`,
    params,
    jsonHeaders
  );
  return response.data;
};

/**
 * This is a function that logs out a user by sending a POST request to a specified URL with
 * provided parameters and headers.
 */
export const logoutService: () => Promise<void> = async () => {
  await axios.get<void>(`${baseUrl}/logout`, {
    withCredentials: true,
  });
};

/**
 * This is a function that checks an invitational code by sending a POST request to a
 * specified URL and returns the response data.
 * @returns The function `checkInvitationalCodeService` is returning a Promise that resolves to an
 * object of type `InvitationalCodeRequest`.
 */
export const checkInvitationalCodeService: (
  params: InvitationalCodeRequest
) => Promise<InvitationalCodeRequest> = async params => {
  const response = await axios.post<InvitationalCodeRequest>(
    `${baseUrl}/invitation`,
    params,
    jsonHeaders
  );
  return response.data;
};

/**
 * This function deletes an invitational code using axios and returns the deleted code.
 * @returns The function `deleteInvitationalCodeService` returns a Promise that resolves to an
 * `InvitationalCodeRequest` object.
 */
export const deleteInvitationalCodeService: (
  params: InvitationalCodeRequest
) => Promise<InvitationalCodeRequest> = async params => {
  const headers = jsonHeaders.headers;

  const response = await axios.delete<InvitationalCodeRequest>(
    `${baseUrl}/invitation`,
    {
      headers,
      data: { invitationCode: params.invitationCode },
    }
  );
  return response.data;
};

/**
 * This function checks if an email already exists by making a POST request to a specified endpoint.
 * @returns The function `checkIfEmailAlreadyExistService` returns a Promise that resolves to a
 * `CheckMailRequest` object.
 */
export const checkIfEmailAlreadyExistService: (
  params: CheckMailRequest
) => Promise<CheckMailRequest> = async params => {
  const response = await axios.post<CheckMailRequest>(
    `${baseUrl}/checkmail`,
    params,
    jsonHeaders
  );
  return response.data;
};

/**
 * This is a function that sends a POST request to register a user and returns the user
 * data.
 * @returns The `registerService` function is returning a `Promise` that resolves to an object of type
 * `UserAuthData`. This object is obtained by making a POST request to the `/register` endpoint
 * with the `params` object as the request body and `jsonHeaders` as the request headers. The
 * `response.data` property is then returned as the result of the `Promise`.
 */
export const registerService: (
  params: RegisterRequest
) => Promise<UserAuthData> = async params => {
  const response = await axios.post<UserAuthData>(
    `${baseUrl}/register`,
    params,
    jsonHeaders
  );
  return response.data;
};
