import { UserAuthData } from '@/models/user/UserAuthData';
import { createRandomUser, RandomUserParams } from './mockUser';

/**
 * The function `createRandomUsersList` generates a list of random user authentication data based on
 * the provided parameters.
 * @param {RandomUserParams} [params] - The `params` parameter is an optional object that contains
 * configuration options for generating random user data. It is of type `RandomUserParams`.
 * @returns An array containing two randomly generated user authentication data objects is being
 * returned.
 */
export function createRandomUsersList(
  params?: RandomUserParams
): UserAuthData[] | null {
  return params?.nullUser
    ? null
    : [createRandomUser(params), createRandomUser(params)];
}
