import { UserAuthData } from '@/models/user/UserAuthData';

export interface RegisterUserResponse {
  error: boolean;
  result?: UserAuthData;
  status?: number;
}
