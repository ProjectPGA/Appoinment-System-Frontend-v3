import axiosInstance from '../models/http';
import MockAdapter from 'axios-mock-adapter';

import { User } from '@/models/user/User';
import { getJsonHeaders } from '../utils';
import { UserAuthData } from '@/models/user/UserAuthData';
import * as UsersWebservice from './UsersWebService';
import { createRandomUser } from '@/utils/mocks/user/mockUser';
import { createRandomUserAuthData } from '@/utils/mocks/user/mockUserAuthData';
import { usersWebserviceBaseUrls } from '@/webservices/models/users/UsersWebServiceBaseUrls';

import { faker } from '@faker-js/faker';

// Global constants
const axiosPostSpy = jest.spyOn(axiosInstance, 'post');
const axiosGetSpy = jest.spyOn(axiosInstance, 'get');
const axiosPutSpy = jest.spyOn(axiosInstance, 'put');

const axiosMock: MockAdapter = new MockAdapter(axiosInstance);

// Primitive global constants
const errorMessage401: string = 'Request failed with status code 401';

beforeEach(() => {
  axiosMock.reset();
  jest.clearAllMocks();
});

describe('01 UsersWebservice: Check register service', () => {
  const registerUserMock: User = createRandomUser();

  const axiosMockPost: MockAdapter.RequestHandler = axiosMock.onPost(
    usersWebserviceBaseUrls.register,
    registerUserMock
  );

  const checkToBeCalledWith: (raw?: boolean) => void = (raw = false) => {
    expect(axiosPostSpy).toHaveBeenCalledWith(
      usersWebserviceBaseUrls.register,
      registerUserMock,
      getJsonHeaders(raw)
    );
  };

  it('01 - 1 Should succeed register service request', async () => {
    const successResponseData: UserAuthData | null =
      createRandomUserAuthData(registerUserMock);

    axiosMockPost.reply(200, successResponseData);

    const response: UserAuthData =
      await UsersWebservice.registerService(registerUserMock);

    expect(response).toEqual(successResponseData);

    checkToBeCalledWith();
  });

  it('01 - 2 Should fail register service request', async () => {
    axiosMockPost.reply(401);

    await expect(
      UsersWebservice.registerService(registerUserMock, true)
    ).rejects.toThrowError(errorMessage401);

    checkToBeCalledWith(true);
  });
});

describe('02 UsersWebservice: Check get All users service', () => {
  const axiosMockGet: MockAdapter.RequestHandler = axiosMock.onGet(
    usersWebserviceBaseUrls.getAllUsers,
    { withCredentials: true }
  );

  const checkToBeCalledWith: (raw?: boolean) => void = (raw = false) => {
    expect(axiosGetSpy).toHaveBeenCalledWith(
      usersWebserviceBaseUrls.getAllUsers,
      {
        withCredentials: true,
        raw: raw,
      }
    );
  };

  it('02 - 1 Should succeed on get all users request', async () => {
    axiosMockGet.reply(200);
    await UsersWebservice.getAllUsersService();
    checkToBeCalledWith();
  });

  it('02 - 2 Should fail on get all users request', async () => {
    axiosMockGet.reply(401);
    await expect(UsersWebservice.getAllUsersService(true)).rejects.toThrow(
      errorMessage401
    );
    checkToBeCalledWith(true);
  });
});

describe('03 UsersWebservice: Delete user service', () => {
  const id = faker.string.fromCharacters('abcdef1234567890', 24);

  const axiosMockDelete: MockAdapter.RequestHandler = axiosMock.onAny(
    usersWebserviceBaseUrls.deleteUser + id,
    {
      withCredentials: true,
    }
  );

  const axiosDeleteSpy = jest.spyOn(axiosInstance, 'delete');

  const checkToBeCalledWith: (raw?: boolean) => void = (raw = false) => {
    expect(axiosDeleteSpy).toHaveBeenCalledWith(
      usersWebserviceBaseUrls.deleteUser + id,
      getJsonHeaders(raw)
    );
  };

  it('03 - 1 Should succeed on delete user request', async () => {
    axiosMockDelete.reply(200);
    await UsersWebservice.deleteUserService(id);
    checkToBeCalledWith();
  });

  it('03 - 2 Should fail on delete user request', async () => {
    axiosMockDelete.reply(401);
    await expect(UsersWebservice.deleteUserService(id, true)).rejects.toThrow(
      errorMessage401
    );
    checkToBeCalledWith(true);
  });
});

describe('04 UsersWebservice: Check update service', () => {
  const updateUserMock: User = createRandomUser();

  const axiosMockPut: MockAdapter.RequestHandler = axiosMock.onPut(
    usersWebserviceBaseUrls.updateUser + updateUserMock._id,
    updateUserMock
  );

  const checkToBeCalledWith: (raw?: boolean) => void = (raw = false) => {
    expect(axiosPutSpy).toHaveBeenCalledWith(
      usersWebserviceBaseUrls.updateUser + updateUserMock._id,
      updateUserMock,
      getJsonHeaders(raw)
    );
  };

  it('04 - 1 Should succeed update service request', async () => {
    const successResponseData: UserAuthData | null =
      createRandomUserAuthData(updateUserMock);

    axiosMockPut.reply(200, successResponseData);

    const response: UserAuthData = await UsersWebservice.updateUserService(
      updateUserMock._id,
      updateUserMock
    );

    expect(response).toEqual(successResponseData);

    checkToBeCalledWith();
  });

  it('04 - 2 Should fail update service request', async () => {
    axiosMockPut.reply(401);

    await expect(
      UsersWebservice.updateUserService(
        updateUserMock._id,
        updateUserMock,
        true
      )
    ).rejects.toThrow(errorMessage401);

    checkToBeCalledWith(true);
  });
});
