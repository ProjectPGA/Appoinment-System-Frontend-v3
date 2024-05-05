import { ref } from 'vue';
import { defineStore } from 'pinia';

import { UserAuthData } from '@/models/user/UserAuthData';

import {
  RegisterUserRequest,
  RegisterUserResponse,
} from '@/models/user/registerUser';

import axios from 'axios';

import {
  deleteUserService,
  getAllUsersService,
  registerService,
} from '@/webservices/users/UsersWebService';

export const useUsersStore = defineStore('users', () => {
  const userAuthData = ref<UserAuthData | null>(null);
  const users = ref<UserAuthData[] | null>([]);
  const isLoading = ref<boolean>(false);

  // Common private Methods
  // GLOBAL METHODS

  /**
   * The `register` function in TypeScript handles registration requests asynchronously, returning a
   * response object indicating success or failure.
   * @param {User} registerData - Is of type `User`. It contains the data
   * needed to register a user, such as username, email, password, etc.
   * @returns Returns a Promise that resolves to a `RegisterUserResponse`
   * object. The `RegisterUserResponse` object contains an `error` property indicating if an error
   * occurred during the registration process, and a `result` property that holds either the successful
   * result of the registration or the error response in case of failure.
   */
  const register = async (
    registerData: RegisterUserRequest
  ): Promise<RegisterUserResponse> => {
    try {
      const response: UserAuthData = await registerService(registerData);

      const successResult: RegisterUserResponse = {
        error: false,
        result: response,
      };

      return successResult;
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        const axiosErrorResult: RegisterUserResponse = {
          error: true,
          status: error.response?.status,
        };
        return axiosErrorResult;
      }

      const clientErrorResult: RegisterUserResponse = {
        error: true,
      };

      return clientErrorResult;
    }
  };

  /**
   * The function `getAllUsers` asynchronously fetches user authentication data and updates the `users`
   * value with the response.
   */
  const getAllUsers = async (): Promise<void> => {
    try {
      isLoading.value = true;

      const response: UserAuthData[] | null = await getAllUsersService();

      users.value = response;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * The function `deleteUser` is an asynchronous function that deletes a user by calling the
   * `deleteUserService` function with the provided `id`, handling any errors that may occur.
   * @param {string} id - The `id` parameter in the `deleteUser` function is a string that represents
   * the unique identifier of the user that you want to delete.
   */
  const deleteUser = async (id: UserAuthData['_id']): Promise<void> => {
    try {
      isLoading.value = true;
      await deleteUserService(id);
      await getAllUsers();
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    users,
    userAuthData,
    getAllUsers,
    deleteUser,
    isLoading,
    register,
  };
});
