import { UserAuthData } from '@/models/user/UserAuthData';
import { createRandomUser, RandomUserParams } from './mockUser';

export function createRandomUsers(
  params?: RandomUserParams
): UserAuthData[] | null {
  return params?.nullUser
    ? null
    : [createRandomUser(params), createRandomUser(params)];
}
