import { useAuthStore } from '../../src/stores/auth';
import * as AuthWebservice from '../../src/webservices/AuthWebservice';
import { setActivePinia, createPinia } from 'pinia';

import { UserData, UserRoles } from '../../src/models/user/UserData';

jest.mock('../../src/webservices/AuthWebservice');
jest.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

describe('login', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });
  it('should handle successful login', async () => {
    const authStore = useAuthStore();

    const mockResponse: UserData = {
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

    const loginServiceMock = jest.spyOn(AuthWebservice, 'loginService');
    loginServiceMock.mockResolvedValue(mockResponse);

    await authStore.login({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(authStore.isLogged).toBe(true);
    expect(authStore.userData).toEqual(mockResponse);
  });
});
