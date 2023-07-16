import { faker } from '@faker-js/faker';
import { User } from '@/models/user/User';
import { UserRoles } from '@/models/user/UserData';

export function createRandomUser(): User {
  return {
    email: faker.internet.email(),
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    roles: [faker.helpers.enumValue(UserRoles)],
    password: faker.internet.password(),
  };
}
