import { User } from './User';

// TODO: Rename the UserAuthData interface to a more appropriate name and check the impact
export interface UserAuthData {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}
