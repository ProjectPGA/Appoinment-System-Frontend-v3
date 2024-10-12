import { User } from './User';

export interface UserAuthData extends User {
  updatedAt: Date;
}
