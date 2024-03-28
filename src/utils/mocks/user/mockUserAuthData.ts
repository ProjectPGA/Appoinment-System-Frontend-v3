import { UserAuthData } from '@/models/user/UserAuthData';
import { createRandomUser, RandomUserParams } from './mockUser';

/**
 * The function creates random user data including access and refresh tokens.
 * @param {RandomUserParams} [params] - The `params` parameter is an optional object that can be passed
 * to the `createRandomUserAuthData` function. It is used to customize the random user data that is
 * generated.
 * @returns an object of type UserAuthData.
 */
export function createRandomUserAuthData(
  params?: RandomUserParams
): UserAuthData | null {
  return params?.nullUser ? null : createRandomUser(params);
}
