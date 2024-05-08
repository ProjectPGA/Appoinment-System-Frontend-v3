import axiosInstance from '@/webservices/models/http';
import MockAdapter from 'axios-mock-adapter';

import {
  createRandomLoginRequest,
  RandomLoginRequestParams,
} from '@/utils/mocks/user/mockLoginRequest';

import { User } from '@/models/user/User';
import { getJsonHeaders } from '@/webservices/utils';
import { UserAuthData } from '@/models/user/UserAuthData';
import * as AuthWebservice from './AuthWebService';
import { LoginRequest } from '@/webservices/models/auth/LoginRequest';
import { createRandomUser } from '@/utils/mocks/user/mockUser';
import { createRandomUserAuthData } from '@/utils/mocks/user/mockUserAuthData';
import { authWebserviceBaseUrls } from '@/webservices/models/auth/AuthWebServiceBaseUrls';

// Global constants
const axiosPostSpy = jest.spyOn(axiosInstance, 'post');
const axiosMock: MockAdapter = new MockAdapter(axiosInstance);

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
      getJsonHeaders()
    );
  });

  it('01 - 2 Should fail on login request', async () => {
    const loginRequestMock: LoginRequest = createRandomLoginRequest();

    axiosMock.onPost(authWebserviceBaseUrls.login, loginRequestMock).reply(401);
    await expect(
      AuthWebservice.loginService(loginRequestMock, true)
    ).rejects.toThrow(errorMessage401);

    expect(axiosPostSpy).toHaveBeenCalledWith(
      authWebserviceBaseUrls.login,
      loginRequestMock,
      getJsonHeaders(true)
    );
  });
});

describe('02 AuthWebservice: Check logout service', () => {
  const axiosMockGet: MockAdapter.RequestHandler = axiosMock.onGet(
    `${authWebserviceBaseUrls.logout}`,
    { withCredentials: true }
  );

  const axiosGetSpy = jest.spyOn(axiosInstance, 'get');

  it('02 - 1 Should succeed on logout request', async () => {
    axiosMockGet.reply(200);
    await AuthWebservice.logoutService();
    expect(axiosGetSpy).toHaveBeenCalledWith(
      `${authWebserviceBaseUrls.logout}`,
      {
        withCredentials: true,
      }
    );
  });

  it('02 - 2 Should fail on logout request', async () => {
    axiosMockGet.reply(401);
    await expect(AuthWebservice.logoutService(true)).rejects.toThrow(
      errorMessage401
    );
    expect(axiosGetSpy).toHaveBeenCalledWith(
      `${authWebserviceBaseUrls.logout}`,
      {
        withCredentials: true,
        throwGlobalErrors: true,
      }
    );
  });
});
