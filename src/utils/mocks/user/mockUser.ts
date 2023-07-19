import { faker } from '@faker-js/faker';
import { User } from '@/models/user/User';
import { UserRoles } from '@/models/user/UserData';

/**
 * The function creates a random user object with generated values for email, name, surname, roles, and
 * password.
 * @returns an object of type User.
 */
export function createRandomUser(): User {
  return {
    email: faker.internet.email(),
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    roles: [faker.helpers.enumValue(UserRoles)],
    password: faker.internet.password(),
  };
}
