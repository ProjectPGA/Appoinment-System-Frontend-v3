import { UserAuthData } from '@/models/user/UserAuthData';
import { User } from './User';

export interface UpdateUserResponse {
  error: boolean;
  result?: UserAuthData;
  status?: number;
}

export interface UpdateUserRequest extends Omit<User, '_id'> {
  updatedAt: Date;
}
