import { useAuthStore } from './auth';
import * as AuthWebservice from '@/webservices/AuthWebservice';
import { setActivePinia, createPinia } from 'pinia';
import { RequestStatus } from '@/models/auth/RequestStatus';

import { createRandomUserData } from '@/utils/mocks/user/mockUserData';
import { createRandomUser } from '@/utils/mocks/user/mockUser';

jest.mock('@/webservices/AuthWebservice');
jest.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

const loginServiceMock = jest.spyOn(AuthWebservice, 'loginService');

const mockLoginSuccessResponse = createRandomUserData();
const mockUserLoginValue = createRandomUser();

describe('01 Auth store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  it('01 - 1 Should change store values to success login', async () => {
    const authStore = useAuthStore();

    loginServiceMock.mockResolvedValue(mockLoginSuccessResponse);

    await authStore.login(mockUserLoginValue);

    expect(authStore.loginRequestStatus).toBe(RequestStatus.SUCCESS);
    expect(authStore.isLogged).toBe(true);
    expect(authStore.isLoading).toBe(false);
    expect(authStore.userData).toEqual(mockLoginSuccessResponse);
  });

  it('01 - 2 Should change store values to failure login', async () => {
    const authStore = useAuthStore();

    loginServiceMock.mockRejectedValue(new Error('Login Failed'));
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await authStore.login(mockUserLoginValue);

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
    expect(authStore.loginRequestStatus).toBe(RequestStatus.FAILURE);
    expect(authStore.isLogged).toBe(false);
    expect(authStore.isLoading).toBe(false);
    expect(authStore.userData).toBeNull();
  });
});
