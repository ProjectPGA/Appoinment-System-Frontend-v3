import axiosInstance from '@/webservices/models/http';
import MockAdapter from 'axios-mock-adapter';

import {
  createRandomLoginRequest,
  RandomLoginRequestParams,
} from '@/utils/mocks/user/mockLoginRequest';

import { User } from '@/models/user/User';
import { getRequestConfig } from '@/webservices/utils';
import { UserAuthData } from '@/models/user/UserAuthData';
import * as AuthWebservice from './AuthWebService';
import { LoginRequest } from '@/webservices/models/auth/LoginRequest';
import { createRandomUser } from '@/utils/mocks/user/mockUser';
import { createRandomUserAuthData } from '@/utils/mocks/user/mockUserAuthData';
import { authWebserviceBaseUrls } from '@/webservices/models/auth/AuthWebServiceBaseUrls';
import { GlobalErrorHandlerMessages } from '@/webservices/models/http/ErrorHandler';

import { expect, jest } from '@jest/globals';

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
      getRequestConfig()
    );
  });

  it('01 - 2 Should fail on login request and send error message to grafana using faro', async () => {
    const loginRequestMock: LoginRequest = createRandomLoginRequest();

    axiosMock
      .onPost(authWebserviceBaseUrls.login, loginRequestMock)
      .reply(HttpStatusCode.Unauthorized);
    await expect(AuthWebservice.loginService(loginRequestMock)).rejects.toThrow(
      errorMessage401
    );

    expect(axiosPostSpy).toHaveBeenCalledWith(
      authWebserviceBaseUrls.login,
      loginRequestMock,
      getRequestConfig()
    );

    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(GlobalErrorHandlerMessages.Unauthorized)
    );
  });
});

describe('02 AuthWebservice: Check logout service', () => {
  const axiosMockGet: MockAdapter.RequestHandler = axiosMock.onGet(
    `${authWebserviceBaseUrls.logout}`
  );

  const axiosGetSpy = jest.spyOn(axiosInstance, 'get');

  it('02 - 1 Should succeed on logout request', async () => {
    axiosMockGet.reply(HttpStatusCode.Ok);
    await AuthWebservice.logoutService();
    expect(axiosGetSpy).toHaveBeenCalledWith(
      `${authWebserviceBaseUrls.logout}`,
      {
        withCredentials: true,
      }
    );
  });

  it('02 - 2 Should fail on logout request and send error message to grafana using faro', async () => {
    axiosMockGet.reply(HttpStatusCode.Unauthorized);
    await expect(AuthWebservice.logoutService()).rejects.toThrow(
      errorMessage401
    );
    expect(axiosGetSpy).toHaveBeenCalledWith(
      `${authWebserviceBaseUrls.logout}`,
      {
        withCredentials: true,
      }
    );

    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(GlobalErrorHandlerMessages.Unauthorized)
    );
  });
});
