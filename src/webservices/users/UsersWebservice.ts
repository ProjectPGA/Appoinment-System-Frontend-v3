import axios from 'axios';

import { jsonHeaders } from '../consts';

import { UserAuthData } from '@/models/user/UserAuthData';
import { usersWebserviceBaseUrls } from '@/webservices/models/users/UsersWebServiceBaseUrls';
import { RegisterUserRequest } from '@/models/auth/registerUser';

/**
 * The function getAllUsersService makes a GET request to retrieve all users from a specified API
 * endpoint.
 */
export const getAllUsersService: () => Promise<
  UserAuthData[] | null
> = async () => {
  const response = await axios.get<UserAuthData[]>(
    usersWebserviceBaseUrls.getAllUsers,
    {
      withCredentials: true,
    }
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
  params: RegisterUserRequest
) => Promise<UserAuthData> = async params => {
  const response = await axios.post<UserAuthData>(
    usersWebserviceBaseUrls.register,
    params,
    jsonHeaders
  );
  return response.data;
};

/**
 * The function `deleteUserService` sends a DELETE request to a specific endpoint with the provided ID for
 * deletion.
 */
export const deleteUserService: (
  id: UserAuthData['_id']
) => Promise<void> = async id => {
  await axios.delete<void>(
    usersWebserviceBaseUrls.deleteUser + id,
    jsonHeaders
  );
};
