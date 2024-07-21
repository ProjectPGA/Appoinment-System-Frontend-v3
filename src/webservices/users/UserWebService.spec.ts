import axiosInstance from '@/webservices/models/http';
import MockAdapter from 'axios-mock-adapter';

import { User } from '@/models/user/User';
import { getRequestConfig } from '@/webservices/utils';
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

// Mocks
jest.mock('@grafana/faro-web-sdk', () => {
  const faroMock = {
    faro: {
      api: {
        pushError: jest.fn(),
      },
    },
  };
  return faroMock;
});

import { faro } from '@grafana/faro-web-sdk';
import { HttpStatusCode } from 'axios';
import { GlobalErrorHandlerMessages } from '../models/http/ErrorHandler';

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

  const checkToBeCalledWith: () => void = () => {
    expect(axiosPostSpy).toHaveBeenCalledWith(
      usersWebserviceBaseUrls.register,
      registerUserMock,
      getRequestConfig()
    );
  };

  it('01 - 1 Should succeed register service request', async () => {
    const successResponseData: UserAuthData | null =
      createRandomUserAuthData(registerUserMock);

    axiosMockPost.reply(HttpStatusCode.Ok, successResponseData);

    const response: UserAuthData =
      await UsersWebservice.registerService(registerUserMock);

    expect(response).toEqual(successResponseData);

    checkToBeCalledWith();
  });

  it('01 - 2 Should fail register service request and send error to grafana using faro', async () => {
    axiosMockPost.reply(HttpStatusCode.Unauthorized);

    await expect(
      UsersWebservice.registerService(registerUserMock)
    ).rejects.toThrowError(errorMessage401);

    checkToBeCalledWith();

    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(GlobalErrorHandlerMessages.Unauthorized)
    );
  });
});

describe('02 UsersWebservice: Check get All users service', () => {
  const axiosMockGet: MockAdapter.RequestHandler = axiosMock.onGet(
    usersWebserviceBaseUrls.getAllUsers,
    { withCredentials: true }
  );

  const checkToBeCalledWith: () => void = () => {
    expect(axiosGetSpy).toHaveBeenCalledWith(
      usersWebserviceBaseUrls.getAllUsers,
      {
        withCredentials: true,
      }
    );
  };

  it('02 - 1 Should succeed on get all users request', async () => {
    axiosMockGet.reply(HttpStatusCode.Ok);
    await UsersWebservice.getAllUsersService();
    checkToBeCalledWith();
  });

  it('02 - 2 Should fail on get all users request and send error to grafana using faro', async () => {
    axiosMockGet.reply(HttpStatusCode.Unauthorized);
    await expect(UsersWebservice.getAllUsersService()).rejects.toThrow(
      errorMessage401
    );
    checkToBeCalledWith();

    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(GlobalErrorHandlerMessages.Unauthorized)
    );
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

  const checkToBeCalledWith: () => void = () => {
    expect(axiosDeleteSpy).toHaveBeenCalledWith(
      usersWebserviceBaseUrls.deleteUser + id,
      getRequestConfig()
    );
  };

  it('03 - 1 Should succeed on delete user request', async () => {
    axiosMockDelete.reply(HttpStatusCode.Ok);
    await UsersWebservice.deleteUserService(id);
    checkToBeCalledWith();
  });

  it('03 - 2 Should fail on delete user request and send error message to grafana using faro', async () => {
    axiosMockDelete.reply(HttpStatusCode.Unauthorized);
    await expect(UsersWebservice.deleteUserService(id)).rejects.toThrow(
      errorMessage401
    );
    checkToBeCalledWith();

    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(GlobalErrorHandlerMessages.Unauthorized)
    );
  });
});

describe('04 UsersWebservice: Check update service', () => {
  const updateUserMock: User = createRandomUser();

  const axiosMockPut: MockAdapter.RequestHandler = axiosMock.onPut(
    usersWebserviceBaseUrls.updateUser + updateUserMock._id,
    updateUserMock
  );

  const checkToBeCalledWith: () => void = () => {
    expect(axiosPutSpy).toHaveBeenCalledWith(
      usersWebserviceBaseUrls.updateUser + updateUserMock._id,
      updateUserMock,
      getRequestConfig()
    );
  };

  it('04 - 1 Should succeed update service request', async () => {
    const successResponseData: UserAuthData | null =
      createRandomUserAuthData(updateUserMock);

    axiosMockPut.reply(HttpStatusCode.Ok, successResponseData);

    const response: UserAuthData = await UsersWebservice.updateUserService(
      updateUserMock._id,
      updateUserMock
    );

    expect(response).toEqual(successResponseData);

    checkToBeCalledWith();
  });

  it('04 - 2 Should fail update service request and send the error message to grafana using faro', async () => {
    axiosMockPut.reply(HttpStatusCode.Unauthorized);

    await expect(
      UsersWebservice.updateUserService(updateUserMock._id, updateUserMock)
    ).rejects.toThrow(errorMessage401);

    checkToBeCalledWith();

    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(GlobalErrorHandlerMessages.Unauthorized)
    );
  });
});
