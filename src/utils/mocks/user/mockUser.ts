import { faker } from '@faker-js/faker';
import { User } from '@/models/user/User';
import { UserRoles } from '@/models/user/UserData';

export type RandomUserParams = {
  email?: string;
  name?: string;
  surname?: string;
  roles?: UserRoles[];
  password?: string;
  nullUser?: boolean;
};

/**
 * The function creates a random user object with generated values for email, name, surname, roles, and
 * password.
 * @param {RandomUserParams} [params] - The `params` parameter is an optional object that can be passed
 * to the `createRandomUser` function. It allows you to customize the properties of the generated user.
 * @returns an object of type User.
 */
export function createRandomUser(params?: RandomUserParams): User {
  const {
    email = faker.internet.email(),
    name = faker.person.firstName(),
    surname = faker.person.lastName(),
    roles = [faker.helpers.enumValue(UserRoles)],
    password = faker.internet.password(),
  } = params || {};

  return {
    email,
    name,
    surname,
    roles,
    password,
  };
}
