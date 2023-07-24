import { faker } from '@faker-js/faker';

import { UserData } from '@/models/user/UserData';
import { createRandomUser, randomUserParams } from './mockUser';

/**
 * The function creates random user data including access and refresh tokens.
 * @param {randomUserParams} [params] - The `params` parameter is an optional object that can be passed
 * to the `createRandomUserData` function. It is used to customize the random user data that is
 * generated.
 * @returns an object of type UserData.
 */
export function createRandomUserData(params?: randomUserParams): UserData {
  return {
    accessToken: faker.string.uuid(),
    refreshToken: faker.string.uuid(),
    user: createRandomUser(params),
  };
}
