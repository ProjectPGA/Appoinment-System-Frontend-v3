import { createTestingPinia } from '@pinia/testing';

import { useUsersStore } from './users';
import { createRandomUser } from '@/utils/mocks/user/mockUser';
import * as UsersWebservice from '@/webservices/users/UsersWebservice';
import { createRandomUsersList } from '@/utils/mocks/user/mockUsers';
import { RegisterUserResponse } from '@/models/user/registerUser';

jest.mock('@/webservices/users/UsersWebservice');
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

const deleteUserServiceMock = jest.spyOn(UsersWebservice, 'deleteUserService');
const getAllUsersServiceMock = jest.spyOn(
  UsersWebservice,
  'getAllUsersService'
);
const registerServiceMock = jest.spyOn(UsersWebservice, 'registerService');

const userMock = createRandomUser();
const mockUsers = createRandomUsersList();

describe('01 Users store: getAllUsers', () => {
  afterEach(() => {
    jest.resetAllMocks();
    window.localStorage.clear();
  });
  it('01 - 01 Should get all user data', async () => {
    const pinia = createTestingPinia({
      // Example of other aproach to pinia testing
      stubActions: false,
    });
    const usersStore = useUsersStore(pinia);

    getAllUsersServiceMock.mockResolvedValue(mockUsers);

    await usersStore.getAllUsers();

    expect(usersStore.users).toStrictEqual(mockUsers);
  });
  it('01 - 02 Should get all user data error', async () => {
    const pinia = createTestingPinia({
      // Example of other aproach to pinia testing
      stubActions: false,
    });
    const usersStore = useUsersStore(pinia);

    getAllUsersServiceMock.mockRejectedValue(new Error('Login Failed'));
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await usersStore.getAllUsers();

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
    expect(usersStore.users).toStrictEqual([]);
  });
  it('01 - 03 Should get all user data null', async () => {
    const pinia = createTestingPinia({
      // Example of other aproach to pinia testing
      stubActions: false,
    });
    const usersStore = useUsersStore(pinia);

    getAllUsersServiceMock.mockRejectedValue(
      createRandomUsersList({ nullUser: true })
    );

    await usersStore.getAllUsers();

    expect(usersStore.users).toStrictEqual([]);
  });
});

describe('02 Users store: register', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('02 - 01 Should register', async () => {
    const pinia = createTestingPinia({
      // Example of other aproach to pinia testing
      stubActions: false,
    });
    const usersStore = useUsersStore(pinia);
    const mockUser = createRandomUser();

    registerServiceMock.mockResolvedValue(mockUser);

    const expectedResponse = {
      error: false,
      result: mockUser,
    };

    const response: RegisterUserResponse = await usersStore.register(mockUser);

    expect(response).toStrictEqual(expectedResponse);
  });

  it('02 - 02 Should handle network error', async () => {
    const pinia = createTestingPinia({
      // Example of other aproach to pinia testing
      stubActions: false,
    });
    const usersStore = useUsersStore(pinia);

    registerServiceMock.mockRejectedValue(new Error('Network error'));

    const expectedResponse = {
      error: true,
    };

    const response: RegisterUserResponse = await usersStore.register(userMock);

    expect(response).toStrictEqual(expectedResponse);
  });

  it('02 - 03 Should handle 500 Internal Server Error', async () => {
    const pinia = createTestingPinia({
      // Example of other aproach to pinia testing
      stubActions: false,
    });
    const usersStore = useUsersStore(pinia);

    registerServiceMock.mockRejectedValue({
      isAxiosError: true,
      response: { status: 500 },
    });

    const expectedResponse = {
      error: true,
      status: 500,
    };

    const response: RegisterUserResponse = await usersStore.register(userMock);

    expect(response).toStrictEqual(expectedResponse);
  });
});

describe('03 Users store: delete User', () => {
  afterEach(() => {
    jest.resetAllMocks();
    window.localStorage.clear();
  });
  it('03 - 01 Should delete a user', async () => {
    const pinia = createTestingPinia({
      // Example of other aproach to pinia testing
      stubActions: false,
    });
    const usersStore = useUsersStore(pinia);

    getAllUsersServiceMock.mockResolvedValue(mockUsers);

    await usersStore.getAllUsers();

    expect(usersStore.users).toStrictEqual(mockUsers);

    deleteUserServiceMock.mockResolvedValue(undefined);

    await usersStore.deleteUser(mockUsers![0]._id);

    expect(usersStore.users).not.toContain(mockUsers![0]._id);
  });

  it('03 - 02 fail delete a user', async () => {
    const pinia = createTestingPinia({
      // Example of other aproach to pinia testing
      stubActions: false,
    });
    const usersStore = useUsersStore(pinia);

    getAllUsersServiceMock.mockResolvedValue(mockUsers);

    await usersStore.getAllUsers();

    expect(usersStore.users).toStrictEqual(mockUsers);

    deleteUserServiceMock.mockRejectedValue(new Error('Login Failed'));
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await usersStore.deleteUser(mockUsers![0]._id);

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
  });
});
