import { faker } from '@faker-js/faker';

import { UserData } from '@/models/user/UserData';
import { createRandomUser } from './mockUser';

/**
 * The function `createRandomUserData` generates random user data including access token, refresh
 * token, and user information.
 * @returns The function `createRandomUserData` returns an object of type `UserData`.
 */
export function createRandomUserData(): UserData {
  return {
    accessToken: faker.string.uuid(),
    refreshToken: faker.string.uuid(),
    user: createRandomUser(),
  };
}
