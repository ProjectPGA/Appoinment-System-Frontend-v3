import { faker } from '@faker-js/faker';
import { LoginRequest } from '@/webservices/models/auth/LoginRequest';

export type randomLoginRequestParams = {
  email?: string;
  password?: string;
};

/**
 * The function creates a random login request object with a randomly generated email and password.
 * @returns an object of type `LoginRequest` with randomly generated values for the `email` and
 * `password` properties.
 */
export function createRandomLoginRequest(
  params?: randomLoginRequestParams
): LoginRequest {
  return {
    email: params?.email ? params.email : faker.internet.email(),
    password: params?.password ? params.password : faker.internet.password(),
  };
}
