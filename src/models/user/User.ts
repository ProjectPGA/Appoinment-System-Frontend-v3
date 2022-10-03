import { UserRoles } from './UserData';

export interface User {
  email: string;
  name: string;
  surname: string;
  roles: UserRoles[];
  password: string;
}
