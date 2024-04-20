import { createTestingPinia } from '@pinia/testing';
import { setActivePinia, createPinia } from 'pinia';

import { useAuthStore } from './auth';
import { RequestStatus } from '@/models/auth/RequestStatus';
import { createRandomUser } from '@/utils/mocks/user/mockUser';
import * as AuthWebservice from '@/webservices/AuthWebservice';
import { createRandomUserAuthData } from '@/utils/mocks/user/mockUserAuthData';
import { createRandomUsersList } from '@/utils/mocks/user/mockUsers';
import { RegisterUserResponse } from '@/models/auth/registerUser';

jest.mock('@/webservices/AuthWebservice');
jest.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));
jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const loginServiceMock = jest.spyOn(AuthWebservice, 'loginService');
const logoutServiceMock = jest.spyOn(AuthWebservice, 'logoutService');
const deleteUserServiceMock = jest.spyOn(AuthWebservice, 'deleteUserService');
const getAllUsersServiceMock = jest.spyOn(AuthWebservice, 'getAllUsersService');
const registerServiceMock = jest.spyOn(AuthWebservice, 'registerService');

const mockUserAuthData = createRandomUserAuthData();
const userMock = createRandomUser();
const mockUsers = createRandomUsersList();

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

    loginServiceMock.mockResolvedValue(mockUserAuthData);

    await authStore.login(userMock);

    expect(authStore.loginRequestStatus).toBe(RequestStatus.SUCCESS);
    expect(authStore.isLogged).toBe(true);
    expect(authStore.isLoading).toBe(false);
    expect(authStore.userAuthData).toEqual(mockUserAuthData);
    /* TODO: Add check to verify that 'setIsLogged' has been called,
      spy doesn't work and doesn't return when 'setIsLogged' is called inside the login function
    */
  });

  it('01 - 2 When receive null user value, should change store values to failure login', async () => {
    const authStore = useAuthStore();

    loginServiceMock.mockResolvedValue(
      createRandomUserAuthData({ nullUser: true })
    );

    await authStore.login(userMock);

    expect(authStore.loginRequestStatus).toBe(RequestStatus.PENDING);
    expect(authStore.isLogged).toBe(false);
    expect(authStore.isLoading).toBe(false);
    expect(authStore.userAuthData).toBe(null);
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

    await authStore.login(userMock);

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
    expect(authStore.loginRequestStatus).toBe(RequestStatus.FAILURE);
    expect(authStore.isLogged).toBe(false);
    expect(authStore.isLoading).toBe(false);
    expect(authStore.userAuthData).toBeNull();
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
    expect(authStore.userAuthData).toBeNull();
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
    expect(authStore.userAuthData).toBeNull();
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
    authStore.setIsLogged(mockUserAuthData!);

    expect(authStore.isLogged).toBe(true);
    expect(authStore.isLoading).toBe(false);
    expect(authStore.loginRequestStatus).toBe(RequestStatus.SUCCESS);
    expect(authStore.userAuthData).toStrictEqual(mockUserAuthData);
  });
});

describe('05 Auth store: getAllUsers', () => {
  afterEach(() => {
    jest.resetAllMocks();
    window.localStorage.clear();
  });
  it('05 - 01 Should get all user data', async () => {
    const pinia = createTestingPinia({
      // Example of other aproach to pinia testing
      stubActions: false,
    });
    const authStore = useAuthStore(pinia);

    getAllUsersServiceMock.mockResolvedValue(mockUsers);

    await authStore.getAllUsers();

    expect(authStore.users).toStrictEqual(mockUsers);
  });
  it('05 - 02 Should get all user data error', async () => {
    const pinia = createTestingPinia({
      // Example of other aproach to pinia testing
      stubActions: false,
    });
    const authStore = useAuthStore(pinia);

    getAllUsersServiceMock.mockRejectedValue(new Error('Login Failed'));
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await authStore.getAllUsers();

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
    expect(authStore.users).toStrictEqual([]);
  });
  it('05 - 03 Should get all user data null', async () => {
    const pinia = createTestingPinia({
      // Example of other aproach to pinia testing
      stubActions: false,
    });
    const authStore = useAuthStore(pinia);

    getAllUsersServiceMock.mockRejectedValue(
      createRandomUsersList({ nullUser: true })
    );

    await authStore.getAllUsers();

    expect(authStore.users).toStrictEqual([]);
  });
});

describe('06 Auth store: logout', () => {
  afterEach(() => {
    jest.resetAllMocks();
    window.localStorage.clear();
  });
  it('06 - 01 Should logout', async () => {
    const pinia = createTestingPinia({
      // Example of other aproach to pinia testing
      stubActions: false,
    });
    const authStore = useAuthStore(pinia);

    logoutServiceMock.mockResolvedValue(undefined);

    await authStore.logout();

    expect(authStore.loginRequestStatus).toBe(RequestStatus.PENDING);
    expect(authStore.isLogged).toBe(false);
    expect(authStore.isLoading).toBe(false);
    expect(authStore.userAuthData).toBeNull();
  });
  it('06 - 02 Should logout fail', async () => {
    const pinia = createTestingPinia({
      // Example of other aproach to pinia testing
      stubActions: false,
    });
    const authStore = useAuthStore(pinia);

    logoutServiceMock.mockRejectedValue(new Error('Login Failed'));

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await authStore.logout();

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
    expect(authStore.loginRequestStatus).toBe(RequestStatus.PENDING);
    expect(authStore.isLogged).toBe(false);
    expect(authStore.isLoading).toBe(false);
    expect(authStore.userAuthData).toBeNull();
  });
});

describe('07 Auth store: register', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('06 - 01 Should register', async () => {
    const pinia = createTestingPinia({
      // Example of other aproach to pinia testing
      stubActions: false,
    });
    const authStore = useAuthStore(pinia);
    const mockUser = createRandomUser();

    registerServiceMock.mockResolvedValue(mockUser);

    const expectedResponse = {
      error: false,
      result: mockUser,
    };

    const response: RegisterUserResponse = await authStore.register(mockUser);

    expect(response).toStrictEqual(expectedResponse);
  });

  it('06 - 01 Should handle network error', async () => {
    const pinia = createTestingPinia({
      // Example of other aproach to pinia testing
      stubActions: false,
    });
    const authStore = useAuthStore(pinia);

    registerServiceMock.mockRejectedValue(new Error('Network error'));

    const expectedResponse = {
      error: true,
    };

    const response: RegisterUserResponse = await authStore.register(userMock);

    expect(response).toStrictEqual(expectedResponse);
  });

  it('06 - 01 Should handle 500 Internal Server Error', async () => {
    const pinia = createTestingPinia({
      // Example of other aproach to pinia testing
      stubActions: false,
    });
    const authStore = useAuthStore(pinia);

    registerServiceMock.mockRejectedValue({
      isAxiosError: true,
      response: { status: 500 },
    });

    const expectedResponse = {
      error: true,
      status: 500,
    };

    const response: RegisterUserResponse = await authStore.register(userMock);

    expect(response).toStrictEqual(expectedResponse);
  });
});

describe('07 Auth store: delete User', () => {
  afterEach(() => {
    jest.resetAllMocks();
    window.localStorage.clear();
  });
  it('07 - 01 Should delete a user', async () => {
    const pinia = createTestingPinia({
      // Example of other aproach to pinia testing
      stubActions: false,
    });
    const authStore = useAuthStore(pinia);

    getAllUsersServiceMock.mockResolvedValue(mockUsers);

    await authStore.getAllUsers();

    expect(authStore.users).toStrictEqual(mockUsers);

    deleteUserServiceMock.mockResolvedValue(undefined);

    await authStore.deleteUser(mockUsers![0]._id);

    expect(authStore.users).not.toContain(mockUsers![0]._id);
  });

  it('07 - 02 fail delete a user', async () => {
    const pinia = createTestingPinia({
      // Example of other aproach to pinia testing
      stubActions: false,
    });
    const authStore = useAuthStore(pinia);

    getAllUsersServiceMock.mockResolvedValue(mockUsers);

    await authStore.getAllUsers();

    expect(authStore.users).toStrictEqual(mockUsers);

    deleteUserServiceMock.mockRejectedValue(new Error('Login Failed'));
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await authStore.deleteUser(mockUsers![0]._id);

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
  });
});
