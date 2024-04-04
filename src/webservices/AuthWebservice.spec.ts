import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  createRandomLoginRequest,
  RandomLoginRequestParams,
} from '@/utils/mocks/user/mockLoginRequest';
import { User } from '@/models/user/User';
import { jsonHeaders } from './consts';
import { UserAuthData } from '@/models/user/UserAuthData';
import * as AuthWebservice from './AuthWebservice';
import { LoginRequest } from './models/auth/LoginRequest';
import { createRandomUser } from '@/utils/mocks/user/mockUser';
import { RegisterRequest } from './models/auth/RegisterRequest';
import { createRandomUserAuthData } from '@/utils/mocks/user/mockUserAuthData';
import { authWebserviceBaseUrls } from './models/auth/AuthWebServiceBaseUrls';

// Global constants
const axiosPostSpy = jest.spyOn(axios, 'post');
const axiosMock: MockAdapter = new MockAdapter(axios);

// Primitive global constants
const errorMessage401: string = 'Request failed with status code 401';

beforeEach(() => {
  axiosMock.reset();
  jest.clearAllMocks();
});

describe('01 AuthWebservice: Check loginService', () => {
  it('01 - 1 Should succeed on login request', async () => {
    const randomUser: User = createRandomUser();
    const loginRequestParams: RandomLoginRequestParams = {
      email: randomUser.email,
      password: randomUser.password,
    };
    const loginRequestMock: LoginRequest =
      createRandomLoginRequest(loginRequestParams);
    const successResponseData: UserAuthData | null =
      createRandomUserAuthData(randomUser);

    axiosMock
      .onPost(authWebserviceBaseUrls.login, loginRequestParams)
      .reply(200, successResponseData);

    const response: UserAuthData | null =
      await AuthWebservice.loginService(loginRequestMock);

    expect(response).toEqual(randomUser);

    expect(axiosPostSpy).toHaveBeenCalledWith(
      authWebserviceBaseUrls.login,
      loginRequestParams,
      jsonHeaders
    );
  });

  it('01 - 2 Should fail on login request', async () => {
    const loginRequestMock: LoginRequest = createRandomLoginRequest();

    axiosMock.onPost(authWebserviceBaseUrls.login, loginRequestMock).reply(401);
    await expect(AuthWebservice.loginService(loginRequestMock)).rejects.toThrow(
      errorMessage401
    );

    expect(axiosPostSpy).toHaveBeenCalledWith(
      authWebserviceBaseUrls.login,
      loginRequestMock,
      jsonHeaders
    );
  });
});

describe('02 AuthWebservice: Check logout service', () => {
  const axiosMockGet: MockAdapter.RequestHandler = axiosMock.onGet(
    `${authWebserviceBaseUrls.logout}`,
    { withCredentials: true }
  );

  const axiosGetSpy = jest.spyOn(axios, 'get');

  const checkToBeCalledWith = () => {
    expect(axiosGetSpy).toHaveBeenCalledWith(
      `${authWebserviceBaseUrls.logout}`,
      {
        withCredentials: true,
      }
    );
  };

  it('02 - 1 Should succeed on logout request', async () => {
    axiosMockGet.reply(200);
    await AuthWebservice.logoutService();
    checkToBeCalledWith();
  });

  it('02 - 2 Should fail on logout request', async () => {
    axiosMockGet.reply(401);
    await expect(AuthWebservice.logoutService()).rejects.toThrow(
      errorMessage401
    );
    checkToBeCalledWith();
  });
});

describe('03 AuthWebservice: Check register service', () => {
  const registerUserMock: User = createRandomUser();
  const registerRequestMock: RegisterRequest = {
    user: registerUserMock,
  };
  const axiosMockPost: MockAdapter.RequestHandler = axiosMock.onPost(
    authWebserviceBaseUrls.register,
    registerRequestMock
  );

  const checkToBeCalledWith = () => {
    expect(axiosPostSpy).toHaveBeenCalledWith(
      authWebserviceBaseUrls.register,
      registerRequestMock,
      jsonHeaders
    );
  };

  it('03 - 1 Should succeed register service request', async () => {
    const successResponseData: UserAuthData | null =
      createRandomUserAuthData(registerUserMock);

    axiosMockPost.reply(200, successResponseData);

    const response: UserAuthData =
      await AuthWebservice.registerService(registerRequestMock);

    expect(response).toEqual(successResponseData);

    checkToBeCalledWith();
  });

  it('03 - 2 Should fail register service request', async () => {
    axiosMockPost.reply(401);

    await expect(
      AuthWebservice.registerService(registerRequestMock)
    ).rejects.toThrowError(errorMessage401);

    checkToBeCalledWith();
  });
});

describe('04 AuthWebservice: Check get All users service', () => {
  const axiosMockGet: MockAdapter.RequestHandler = axiosMock.onGet(
    authWebserviceBaseUrls.getAllUsers,
    { withCredentials: true }
  );

  const axiosGetSpy = jest.spyOn(axios, 'get');

  const checkToBeCalledWith = () => {
    expect(axiosGetSpy).toHaveBeenCalledWith(
      authWebserviceBaseUrls.getAllUsers,
      {
        withCredentials: true,
      }
    );
  };

  it('04 - 1 Should succeed on get all users request', async () => {
    axiosMockGet.reply(200);
    await AuthWebservice.getAllUsersService();
    checkToBeCalledWith();
  });

  it('04 - 2 Should fail on get all users request', async () => {
    axiosMockGet.reply(401);
    await expect(AuthWebservice.getAllUsersService()).rejects.toThrow(
      errorMessage401
    );
    checkToBeCalledWith();
  });
});
