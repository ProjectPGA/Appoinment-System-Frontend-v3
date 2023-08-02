import { faker } from '@faker-js/faker';
import { LoginRequest } from '@/webservices/models/auth/LoginRequest';

export type RandomLoginRequestParams = {
  email?: string;
  password?: string;
};

/**
 * The function creates a random login request object with a randomly generated email and password.
 * @returns an object of type `LoginRequest` with randomly generated values for the `email` and
 * `password` properties.
 */
export function createRandomLoginRequest(
  params?: RandomLoginRequestParams
): LoginRequest {
  const {
    email = faker.internet.email(),
    password = faker.internet.password(),
  } = params || {};
  return {
    email,
    password,
  };
}
