import { User } from './User';

export interface UserAuthData {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}
