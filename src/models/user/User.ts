import { UserRoles } from './UserRoles';

export interface User {
  _id: string;
  email: string;
  name: string;
  surname: string;
  roles: UserRoles[];
  password: string;
  imageUrl: string;
}
