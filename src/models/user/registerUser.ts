import { UserAuthData } from '@/models/user/UserAuthData';
import { User } from './User';

export interface RegisterUserResponse {
  error: boolean;
  result?: UserAuthData;
  status?: string;
}

export interface RegisterUserRequest extends Omit<User, '_id'> {}
