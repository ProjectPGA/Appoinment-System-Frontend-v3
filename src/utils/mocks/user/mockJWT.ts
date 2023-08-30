import { faker } from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';

const payload = {
  userId: faker.string.uuid,
  iat: Math.floor(Date.now() / 1000) + 60,
};

const secret = faker.internet.password();

export function generateMockJWT() {
  return jwt.sign(payload, secret, { algorithm: 'HS256' });
}
