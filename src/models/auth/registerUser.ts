import { UserAuthData } from '@/models/user/UserAuthData';
import { User } from '../user/User';

export interface RegisterUserResponse {
  error: boolean;
  result?: UserAuthData;
  status?: number;
}

export interface RegisterUserRequest extends Omit<User, '_id'> {}
