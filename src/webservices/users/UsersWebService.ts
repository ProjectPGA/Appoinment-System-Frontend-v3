import axiosInstance from '../models/http';

import { getJsonHeaders } from '../utils';

import { UserAuthData } from '@/models/user/UserAuthData';
import { usersWebserviceBaseUrls } from '@/webservices/models/users/UsersWebServiceBaseUrls';
import { RegisterUserRequest } from '@/models/user/registerUser';
import { UpdateUserRequest } from '@/models/user/updateUser';

/**
 * The function getAllUsersService makes a GET request to retrieve all users from a specified API
 * endpoint.
 *
 * @param [raw=false] - The `raw` parameter in the `getAllUsersService` function is a boolean flag that
 * indicates whether the response data should be returned in its raw format or not. If `raw` is set to
 * `true`, the response data will be returned as is without any additional processing. If `raw`
 * @returns The `getAllUsersService` function returns a Promise that resolves to an array of
 * `UserAuthData` objects or `null`.
 */
export const getAllUsersService: (
  raw?: boolean
) => Promise<UserAuthData[] | null> = async (raw = false) => {
  const response = await axiosInstance.get<UserAuthData[]>(
    usersWebserviceBaseUrls.getAllUsers,
    {
      withCredentials: true,
      raw: raw,
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
 * @param [raw=false] - The `raw` parameter in the `registerService` function is a boolean flag that
 * indicates whether the request should be sent in raw format or not. If `raw` is set to `true`, the
 * request will be sent in raw format, otherwise it will not be sent in raw format.
 * @returns The `registerService` function is returning a Promise that resolves to a `UserAuthData`
 * object. This object is obtained from the response of a POST request made using `axiosInstance.post`
 * to the `usersWebserviceBaseUrls.register` endpoint with the provided `params` and headers obtained
 * from `getJsonHeaders(raw)`.
 */
export const registerService: (
  params: RegisterUserRequest,
  raw?: boolean
) => Promise<UserAuthData> = async (params, raw = false) => {
  const response = await axiosInstance.post<UserAuthData>(
    usersWebserviceBaseUrls.register,
    params,
    getJsonHeaders(raw)
  );
  return response.data;
};

/**
 * T
 */
/**
 * he function `deleteUserService` sends a DELETE request to a specific endpoint with the provided ID for
 * deletion.
 *
 * @param id - The `id` parameter is the unique identifier of the user that you want to delete from the
 * user service. It is of type `UserAuthData['_id']`, which typically refers to the `_id` field of a
 * user's authentication data.
 * @param [raw=false] - The `raw` parameter in the `deleteUserService` function is a boolean flag that
 * indicates whether to send the request with raw data or not. If `raw` is set to `true`, the request
 * will be sent with raw data. If `raw` is set to `false` or not
 */
export const deleteUserService: (
  id: UserAuthData['_id'],
  raw?: boolean
) => Promise<void> = async (id, raw = false) => {
  await axiosInstance.delete<void>(
    usersWebserviceBaseUrls.deleteUser + id,
    getJsonHeaders(raw)
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
 * @param [raw=false] - The `raw` parameter in the `updateUserService` function is a boolean flag that
 * indicates how the error handler should behave. If `raw` is set to `true` global error handling
 * will not check for error on global errors.
 *
 * @returns - The `updateUserService` function is returning a Promise that resolves to a `UserAuthData`
 * object. This object is obtained from the response of a PUT request made using `axiosInstance.put`
 * to the `usersWebserviceBaseUrls.updateUser` endpoint with the provided, `id`, `params` and headers obtained
 * from `getJsonHeaders(raw)`.
 */
export const updateUserService: (
  id: UserAuthData['_id'],
  params: UpdateUserRequest,
  raw?: boolean
) => Promise<UserAuthData> = async (id, params, raw = false) => {
  const response = await axiosInstance.put<UserAuthData>(
    usersWebserviceBaseUrls.updateUser + id,
    params,
    getJsonHeaders(raw)
  );
  return response.data;
};
