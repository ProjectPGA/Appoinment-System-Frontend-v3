import { faker } from '@faker-js/faker';
import { User } from '@/models/user/User';
import { UserRoles } from '@/models/user/UserData';

export type randomUserParams = {
  email?: string;
  name?: string;
  surname?: string;
  roles?: UserRoles[];
  password: string;
};

/**
 * The function creates a random user object with generated values for email, name, surname, roles, and
 * password.
 * @param {randomUserParams} [params] - The `params` parameter is an optional object that can be passed
 * to the `createRandomUser` function. It allows you to customize the properties of the generated user.
 * @returns an object of type User.
 */
export function createRandomUser(params?: randomUserParams): User {
  return {
    email: params?.email ? params?.email : faker.internet.email(),
    name: params?.name ? params.name : faker.person.firstName(),
    surname: params?.surname ? params.surname : faker.person.lastName(),
    roles: params?.roles ? params?.roles : [faker.helpers.enumValue(UserRoles)],
    password: params?.password ? params.password : faker.internet.password(),
  };
}
