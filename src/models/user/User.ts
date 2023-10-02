import { UserRoles } from './UserRoles';

export interface User {
  email: string;
  name: string;
  surname: string;
  roles: UserRoles[];
  password: string;
}
