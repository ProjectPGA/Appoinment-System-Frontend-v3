import { createTestingPinia } from '@pinia/testing';
import { setActivePinia, createPinia } from 'pinia';

import { useAuthStore } from './auth';
import { RequestStatus } from '@/models/auth/RequestStatus';
import { createRandomUser } from '@/utils/mocks/user/mockUser';
import * as AuthWebservice from '@/webservices/AuthWebservice';
import { createRandomUserData } from '@/utils/mocks/user/mockUserData';
import { LocalStorageAuthKeys } from '@/models/auth/LocalStorageAuthKeys';

jest.mock('@/webservices/AuthWebservice');
jest.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

const loginServiceMock = jest.spyOn(AuthWebservice, 'loginService');

const mockUserData = createRandomUserData();
const mockUserLoginValue = createRandomUser();

describe('01 Auth store: login', () => {
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

    loginServiceMock.mockResolvedValue(mockUserData);

    await authStore.login(mockUserLoginValue);

    expect(authStore.loginRequestStatus).toBe(RequestStatus.SUCCESS);
    expect(authStore.isLogged).toBe(true);
    expect(authStore.isLoading).toBe(false);
    expect(authStore.userData).toEqual(mockUserData);
    /* TODO: Add check to verify that 'setIsLogged' has been called,
      spy doesn't work and doesn't return when 'setIsLogged' is called inside the login function
    */
  });

  it('01 - 2 When receive null user value, should change store values to failure login', async () => {
    const authStore = useAuthStore();

    loginServiceMock.mockResolvedValue(
      createRandomUserData({ nullUser: true })
    );

    await authStore.login(mockUserLoginValue);

    expect(authStore.loginRequestStatus).toBe(RequestStatus.FAILURE);
    expect(authStore.isLogged).toBe(false);
    expect(authStore.isLoading).toBe(false);
    expect(authStore.userData).toBe(null);
    /* TODO: Add check to verify that 'setUserIsNotLogged' has been called,
      spy doesn't work and doesn't return when 'setUserIsNotLogged' is called inside the login function
    */
  });

  it('01 - 3 Should change store values to failure login', async () => {
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

describe('02 Auth store: setLoginInProgress', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  it('01 - 1 Should change store values to set login in progress', () => {
    const authStore = useAuthStore();

    authStore.setLoginInProgress();

    expect(authStore.loginRequestStatus).toBe(RequestStatus.IN_PROGRESS);
    expect(authStore.isLoading).toBe(true);
  });
});
describe('03 Auth store: setLoginFailed', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  it('01 - 1 Should change store values to set login failed', () => {
    const authStore = useAuthStore();

    authStore.setLoginFailed();

    expect(authStore.loginRequestStatus).toBe(RequestStatus.FAILURE);
    expect(authStore.isLoading).toBe(false);
    expect(authStore.isLogged).toBe(false);
    expect(authStore.userData).toBeNull();
  });
});
describe('03 Auth store: setUserNotIsLogged', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  it('01 - 1 Should change store values to set user not logged', () => {
    const authStore = useAuthStore();

    authStore.setUserNotisLogged();

    expect(authStore.loginRequestStatus).toBe(RequestStatus.PENDING);
    expect(authStore.isLoading).toBe(false);
    expect(authStore.isLogged).toBe(false);
    expect(authStore.userData).toBeNull();
  });
});

describe('03 Auth store: saveJWTTokens', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('01 - 1 Should change store values to set user not logged', () => {
    const authStore = useAuthStore();

    expect(window.localStorage.getItem(LocalStorageAuthKeys.ACCESS_TOKEN))
      .toBeNull;
    expect(window.localStorage.getItem(LocalStorageAuthKeys.REFRESH_TOKEN))
      .toBeNull;

    authStore.saveJWTTokens(mockUserData);

    expect(window.localStorage.getItem(LocalStorageAuthKeys.ACCESS_TOKEN)).toBe(
      mockUserData.accessToken
    );
    expect(
      window.localStorage.getItem(LocalStorageAuthKeys.REFRESH_TOKEN)
    ).toBe(mockUserData.refreshToken);
  });
});

describe('04 Auth store: setIsLogged', () => {
  afterEach(() => {
    jest.resetAllMocks();
    window.localStorage.clear();
  });
  it('04 - 01 Should change store values to set user is logged', () => {
    const pinia = createTestingPinia({
      // Example of other aproach to pinia testing
      stubActions: false,
    });
    const authStore = useAuthStore(pinia);
    authStore.setIsLogged(mockUserData);

    expect(authStore.isLogged).toBe(true);
    expect(authStore.isLoading).toBe(false);
    expect(authStore.loginRequestStatus).toBe(RequestStatus.SUCCESS);
    expect(authStore.userData).toStrictEqual(mockUserData);
    /* TODO: Add check to verify that 'saveJWTTokens' has been called,
      spy doesn't work and doesn't return when 'saveJWTTokens' is called inside the setIsLogged function
    */
    expect(window.localStorage.getItem(LocalStorageAuthKeys.ACCESS_TOKEN)).toBe(
      mockUserData.accessToken
    );
    expect(
      window.localStorage.getItem(LocalStorageAuthKeys.REFRESH_TOKEN)
    ).toBe(mockUserData.refreshToken);
  });
});
