import { User } from './User';

// TODO: Rename the UserData interface to a more appropriate name and check the impact
export interface UserData {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export enum UserRoles {
  ADMIN = 'ADMIN',
  COMMON_USER = 'COMMON_USER',
}
