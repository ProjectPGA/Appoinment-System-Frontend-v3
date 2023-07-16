import { useAuthStore } from '../../src/stores/auth';
import * as AuthWebservice from '../../src/webservices/AuthWebservice';
import { setActivePinia, createPinia } from 'pinia';
import { RequestStatus } from '../../src/models/auth/RequestStatus';
import {
  mockLoginSuccessResponse,
  mockUserLoginValue,
} from '../utils/mocks/authStoreMocks';

jest.mock('../../src/webservices/AuthWebservice');
jest.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

describe('Auth store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });
  it('Should change store values to success login', async () => {
    const authStore = useAuthStore();

    const loginServiceMock = jest.spyOn(AuthWebservice, 'loginService');
    loginServiceMock.mockResolvedValue(mockLoginSuccessResponse);

    await authStore.login(mockUserLoginValue);

    expect(authStore.loginRequestStatus).toBe(RequestStatus.SUCCESS);
    expect(authStore.isLogged).toBe(true);
    expect(authStore.isLoading).toBe(false);
    expect(authStore.userData).toEqual(mockLoginSuccessResponse);
  });

  it('Should change store values to failure login', async () => {
    const authStore = useAuthStore();

    const loginServiceMock = jest.spyOn(AuthWebservice, 'loginService');

    loginServiceMock.mockRejectedValue('');

    await authStore.login(mockUserLoginValue);

    expect(authStore.loginRequestStatus).toBe(RequestStatus.FAILURE);
    expect(authStore.isLogged).toBe(false);
    expect(authStore.isLoading).toBe(false);
    expect(authStore.userData).toBeNull();
  });
});
