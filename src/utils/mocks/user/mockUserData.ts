import { faker } from '@faker-js/faker';

import { UserData } from '@/models/user/UserData';
import { createRandomUser } from './mockUser';

export function createRandomUserData(): UserData {
  return {
    accessToken: faker.string.uuid(),
    refreshToken: faker.string.uuid(),
    user: createRandomUser(),
  };
}
