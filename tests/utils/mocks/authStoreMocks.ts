import { UserData, UserRoles } from '../../../src/models/user/UserData';

export const mockLoginSuccessResponse: UserData = {
  accessToken: 'mock',
  refreshToken: 'mock',
  user: {
    email: 'test@test.com',
    password: '',
    name: 'test',
    surname: 'test',
    roles: [UserRoles.ADMIN],
  },
};

export const mockUserLoginValue = {
  email: 'test@example.com',
  password: 'password123',
};
