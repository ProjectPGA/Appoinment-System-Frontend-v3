import axiosInstance from '@/webservices/models/http';

import { getRequestConfig } from '@/webservices/utils';

import { UserAuthData } from '@/models/user/UserAuthData';
import { usersWebserviceBaseUrls } from '@/webservices/models/users/UsersWebServiceBaseUrls';
import { RegisterUserRequest } from '@/models/user/registerUser';
import { UpdateUserRequest } from '@/models/user/updateUser';

/**
 * The function getAllUsersService makes a GET request to retrieve all users from a specified API
 * endpoint.
 *
 * @returns The `getAllUsersService` function returns a Promise that resolves to an array of
 * `UserAuthData` objects or `null`.
 */
export const getAllUsersService: () => Promise<
  UserAuthData[] | null
> = async () => {
  const response = await axiosInstance.get<UserAuthData[]>(
    usersWebserviceBaseUrls.getAllUsers,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

/**
 * The `registerService` function sends a POST request to a user registration endpoint and returns the
 * user authentication data.
 *
 * @param params - The `params` parameter in the `registerService` function is of type
 * `RegisterUserRequest`, which likely contains the data needed to register a user.
 *
 * @returns The `registerService` function is returning a Promise that resolves to a `UserAuthData`
 * object. This object is obtained from the response of a POST request made using `axiosInstance.post`
 * to the `usersWebserviceBaseUrls.register` endpoint with the provided `params` and headers obtained
 * from `getRequestConfig()`.
 */
export const registerService: (
  params: RegisterUserRequest
) => Promise<UserAuthData> = async params => {
  const response = await axiosInstance.post<UserAuthData>(
    usersWebserviceBaseUrls.register,
    params,
    getRequestConfig()
  );
  return response.data;
};

/**
 * he function `deleteUserService` sends a DELETE request to a specific endpoint with the provided ID for
 * deletion.
 *
 * @param id - The `id` parameter is the unique identifier of the user that you want to delete from the
 * user service. It is of type `UserAuthData['_id']`, which typically refers to the `_id` field of a
 * user's authentication data.
 */
export const deleteUserService: (
  id: UserAuthData['_id']
) => Promise<void> = async id => {
  await axiosInstance.delete<void>(
    usersWebserviceBaseUrls.deleteUser + id,
    getRequestConfig()
  );
};

/**
 * The function `deleteUserService` sends a DELETE request to a specific endpoint with the provided ID for
 * deletion.
 *
 * @param id - The `id` parameter is the unique identifier of the user that you want to delete from the
 * user service. It is of type `UserAuthData['_id']`, which typically refers to the `_id` field of a
 * user's authentication data.
 * @param params - params of the request
 *
 * @returns - The `updateUserService` function is returning a Promise that resolves to a `UserAuthData`
 * object. This object is obtained from the response of a PUT request made using `axiosInstance.put`
 * to the `usersWebserviceBaseUrls.updateUser` endpoint with the provided, `id`, `params` and headers obtained
 * from `getRequestConfig()`.
 */
export const updateUserService: (
  id: UserAuthData['_id'],
  params: UpdateUserRequest
) => Promise<UserAuthData> = async (id, params) => {
  const response = await axiosInstance.put<UserAuthData>(
    usersWebserviceBaseUrls.updateUser + id,
    params,
    getRequestConfig()
  );
  return response.data;
};
