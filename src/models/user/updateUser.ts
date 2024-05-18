import { UserAuthData } from '@/models/user/UserAuthData';
import { User } from './User';

export interface UpdateUserResponse {
  error?: boolean;
  result?: UserAuthData;
  status?: string;
}

export interface UpdateUserRequest extends Omit<User, '_id'> {}
