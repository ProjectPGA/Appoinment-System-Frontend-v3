import axios from 'axios';
import { faker } from '@faker-js/faker';
import MockAdapter from 'axios-mock-adapter';

import {
  createRandomLoginRequest,
  RandomLoginRequestParams,
} from '@/utils/mocks/user/mockLoginRequest';
import { User } from '@/models/user/User';
import { apiPrefix, jsonHeaders } from './consts';
import { UserData } from '@/models/user/UserData';
import * as AuthWebservice from './AuthWebservice';
import { TokenRequest } from './models/auth/TokenRequest';
import { LoginRequest } from './models/auth/LoginRequest';
import { TokenResponse } from './models/auth/TokenResponse';
import { LogoutRequest } from './models/auth/LogoutRequest';
import { generateMockJWT } from '@/utils/mocks/user/mockJWT';
import { createRandomUser } from '@/utils/mocks/user/mockUser';
import { RegisterRequest } from './models/auth/RegisterRequest';
import { CheckMailRequest } from './models/auth/CheckMailRequest';
import { createRandomUserData } from '@/utils/mocks/user/mockUserData';
import { InvitationalCodeRequest } from './models/auth/InvitationalCodeRequest';

// Global constants
const mockJWT: string = generateMockJWT();
const baseUrl: string = apiPrefix('/auth');
const axiosPostSpy = jest.spyOn(axios, 'post');
const axiosDeleteSpy = jest.spyOn(axios, 'delete');
const axiosMock: MockAdapter = new MockAdapter(axios);

// Primitive global constants
const errorMessage401: string = 'Request failed with status code 401';
const errorMessage404: string = 'Request failed with status code 404';

beforeEach(() => {
  axiosMock.reset();
  jest.resetAllMocks();
});

describe('01 AuthWebservice: Check loginService', () => {
  const loginBaseUrl: string = `${baseUrl}/login`;

  it('01 - 1 Should succeed on login request', async () => {
    const randomUser: User = createRandomUser();
    const loginRequestParams: RandomLoginRequestParams = {
      email: randomUser.email,
      password: randomUser.password,
    };
    const loginRequestMock: LoginRequest =
      createRandomLoginRequest(loginRequestParams);
    const succesResponseData: UserData = createRandomUserData(randomUser);

    axiosMock
      .onPost(loginBaseUrl, loginRequestParams)
      .reply(200, succesResponseData);

    const response: UserData = await AuthWebservice.loginService(
      loginRequestMock
    );

    expect(response.user).toEqual(randomUser);

    expect(axiosPostSpy).toBeCalledWith(
      loginBaseUrl,
      loginRequestParams,
      jsonHeaders
    );
  });

  it('01 - 2 Should fail on login request', async () => {
    const loginRequestMock: LoginRequest = createRandomLoginRequest();

    axiosMock.onPost(loginBaseUrl, loginRequestMock).reply(401);
    await expect(AuthWebservice.loginService(loginRequestMock)).rejects.toThrow(
      errorMessage401
    );

    expect(axiosPostSpy).toBeCalledWith(
      loginBaseUrl,
      loginRequestMock,
      jsonHeaders
    );
  });
});

describe('02 AuthWebservice: Check logout service', () => {
  const logoutRequest: LogoutRequest = { refreshToken: mockJWT };
  const logoutBaseUrl: string = `${baseUrl}/logout`;
  const axiosMockPost: MockAdapter.RequestHandler = axiosMock.onPost(
    logoutBaseUrl,
    logoutRequest
  );

  const checkTobeCalledWith = () => {
    expect(axiosPostSpy).toBeCalledWith(
      logoutBaseUrl,
      logoutRequest,
      jsonHeaders
    );
  };

  it('02 - 1 Should succeed on logout request', async () => {
    axiosMockPost.reply(200);

    await AuthWebservice.logoutService(logoutRequest);

    checkTobeCalledWith();
  });

  it('02 - 2 Should fail on logout request', async () => {
    axiosMockPost.reply(401);

    await expect(AuthWebservice.logoutService(logoutRequest)).rejects.toThrow(
      errorMessage401
    );

    checkTobeCalledWith();
  });
});

describe('03 AuthWebservice: Check user token service', () => {
  const userTokenCheckBaseUrl: string = `${baseUrl}/userTokenCheck`;
  const userTokenRequestMock: TokenRequest = { token: mockJWT };
  const axiosMockPost: MockAdapter.RequestHandler = axiosMock.onPost(
    userTokenCheckBaseUrl,
    userTokenRequestMock
  );

  const checkTobeCalledWith = () => {
    expect(axiosPostSpy).toBeCalledWith(
      userTokenCheckBaseUrl,
      userTokenRequestMock,
      jsonHeaders
    );
  };

  it('03 - 1 Should succeed check user token request', async () => {
    const succesResponseData: UserData = createRandomUserData();

    axiosMockPost.reply(200, succesResponseData);

    const response: UserData = await AuthWebservice.checkUserTokenService(
      userTokenRequestMock
    );

    expect(response).toEqual(succesResponseData);

    checkTobeCalledWith();
  });

  it('03 - 2 Should fail check user token request', async () => {
    axiosMockPost.reply(401);

    await expect(
      AuthWebservice.checkUserTokenService(userTokenRequestMock)
    ).rejects.toThrow(errorMessage401);

    checkTobeCalledWith();
  });
});

describe('04 AuthWebservice: Check renew token service', () => {
  const userTokenRequestMock: TokenRequest = { token: mockJWT };
  const tokenBaseUrl: string = `${baseUrl}/token`;
  const axiosMockPost: MockAdapter.RequestHandler = axiosMock.onPost(
    tokenBaseUrl,
    userTokenRequestMock
  );

  const checkTobeCalledWith = () => {
    expect(axiosPostSpy).toBeCalledWith(
      tokenBaseUrl,
      userTokenRequestMock,
      jsonHeaders
    );
  };

  it('04 - 1 Should succeed check renew token request', async () => {
    const succesResponseData: TokenResponse = {
      accessToken: mockJWT,
    };

    axiosMockPost.reply(200, succesResponseData);

    const response: TokenResponse = await AuthWebservice.renewTokenService(
      userTokenRequestMock
    );

    expect(response).toEqual(succesResponseData);

    checkTobeCalledWith();
  });

  it('04 - 2 Should fail check renew token request', async () => {
    axiosMockPost.reply(401);

    await expect(
      AuthWebservice.renewTokenService(userTokenRequestMock)
    ).rejects.toThrow(errorMessage401);

    checkTobeCalledWith();
  });
});

describe('05 AuthWebservice: Check invitational code service', () => {
  const invitationalCodeRequestMock: InvitationalCodeRequest = {
    invitationCode: faker.string.alphanumeric(),
  };
  const invitationBaseUrl: string = `${baseUrl}/invitation`;
  const axiosMockPost: MockAdapter.RequestHandler = axiosMock.onPost(
    invitationBaseUrl,
    invitationalCodeRequestMock
  );

  const checkTobeCalledWith = () => {
    expect(axiosPostSpy).toBeCalledWith(
      invitationBaseUrl,
      invitationalCodeRequestMock,
      jsonHeaders
    );
  };
  it('05 - 1 Should succeed check invitational code', async () => {
    const succesResponseData: InvitationalCodeRequest =
      invitationalCodeRequestMock;

    axiosMockPost.reply(200, succesResponseData);

    const response: InvitationalCodeRequest =
      await AuthWebservice.checkInvitationalCodeService(
        invitationalCodeRequestMock
      );

    expect(response).toEqual(succesResponseData);

    checkTobeCalledWith();
  });

  it('05 - 2 Sould fail check invitational code', async () => {
    axiosMockPost.reply(401);

    await expect(
      AuthWebservice.checkInvitationalCodeService(invitationalCodeRequestMock)
    ).rejects.toThrow(errorMessage401);

    checkTobeCalledWith();
  });
});

describe('06 AuthWebservice: Check delete invitational code service', () => {
  const invitationalCodeRequestMockData: InvitationalCodeRequest = {
    invitationCode: faker.internet.password(),
  };
  const invitationBaseUrl: string = `${baseUrl}/invitation`;
  const deleteInvitationalCodeRequesMock = {
    headers: jsonHeaders.headers,
    data: invitationalCodeRequestMockData,
  };
  const axiosMockDelete: MockAdapter.RequestHandler = axiosMock.onDelete(
    invitationBaseUrl,
    deleteInvitationalCodeRequesMock
  );

  const checkTobeCalledWith = () => {
    expect(axiosDeleteSpy).toBeCalledWith(
      invitationBaseUrl,
      deleteInvitationalCodeRequesMock
    );
  };
  it('06 - 1 Should succeed delete invitational code request', async () => {
    const successResponseData: InvitationalCodeRequest =
      invitationalCodeRequestMockData;

    axiosMockDelete.reply(200, successResponseData);

    const response = await AuthWebservice.deleteInvitationalCodeService(
      invitationalCodeRequestMockData
    );

    expect(response).toEqual(successResponseData);

    checkTobeCalledWith();
  });
  it('06 - 2 Should fail delete invitational code request', async () => {
    axiosMockDelete.reply(401);

    await expect(
      AuthWebservice.deleteInvitationalCodeService(
        invitationalCodeRequestMockData
      )
    ).rejects.toThrowError(errorMessage401);

    checkTobeCalledWith();
  });
});

describe('07 AuthWebservice: Check if email already exist service', () => {
  const checkMailRequestMock: CheckMailRequest = {
    email: faker.internet.email(),
  };
  const checkmailBaseUrl: string = `${baseUrl}/checkmail`;
  const axioMockPost: MockAdapter.RequestHandler = axiosMock.onPost(
    checkmailBaseUrl,
    checkMailRequestMock
  );

  const checkTobeCalledWith = () => {
    expect(axiosPostSpy).toBeCalledWith(
      checkmailBaseUrl,
      checkMailRequestMock,
      jsonHeaders
    );
  };
  it('07 - 1 Should succeed check if email already exist request', async () => {
    const successResponseData: CheckMailRequest = checkMailRequestMock;

    axioMockPost.reply(200, successResponseData);
    const response = await AuthWebservice.checkIfEmailAlreadyExistService(
      checkMailRequestMock
    );

    expect(response).toEqual(successResponseData);

    checkTobeCalledWith();
  });

  it('07 - 2 Should fail check if email already exist request', async () => {
    axioMockPost.reply(404);

    await expect(
      AuthWebservice.checkIfEmailAlreadyExistService(checkMailRequestMock)
    ).rejects.toThrowError(errorMessage404);

    checkTobeCalledWith();
  });
});

describe('08 AuthWebservice: Check register service', () => {
  const registerUserMock: User = createRandomUser();
  const registerRequestMock: RegisterRequest = {
    user: registerUserMock,
  };
  const registerBaseUrl: string = `${baseUrl}/register`;
  const axiosMockPost: MockAdapter.RequestHandler = axiosMock.onPost(
    registerBaseUrl,
    registerRequestMock
  );

  const checkTobeCalledWith = () => {
    expect(axiosPostSpy).toBeCalledWith(
      registerBaseUrl,
      registerRequestMock,
      jsonHeaders
    );
  };

  it('08 - 1 Should succeed register service request', async () => {
    const successResponseData: UserData =
      createRandomUserData(registerUserMock);

    axiosMockPost.reply(200, successResponseData);

    const response: UserData = await AuthWebservice.registerService(
      registerRequestMock
    );

    expect(response).toEqual(successResponseData);

    checkTobeCalledWith();
  });

  it('08 - 2 Should fail register service request', async () => {
    axiosMockPost.reply(401);

    await expect(
      AuthWebservice.registerService(registerRequestMock)
    ).rejects.toThrowError(errorMessage401);

    checkTobeCalledWith();
  });
});
