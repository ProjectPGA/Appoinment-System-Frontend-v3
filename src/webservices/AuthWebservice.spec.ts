import axios from 'axios';
import { faker } from '@faker-js/faker';
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
import { CheckMailRequest } from './models/auth/CheckMailRequest';
import { createRandomUserAuthData } from '@/utils/mocks/user/mockUserAuthData';
import { authWebserviceBaseUrls } from './models/auth/AuthWebServiceBaseUrls';
import { InvitationalCodeRequest } from './models/auth/InvitationalCodeRequest';

// Global constants
const axiosPostSpy = jest.spyOn(axios, 'post');
const axiosDeleteSpy = jest.spyOn(axios, 'delete');
const axiosMock: MockAdapter = new MockAdapter(axios);

// Primitive global constants
const errorMessage401: string = 'Request failed with status code 401';
const errorMessage404: string = 'Request failed with status code 404';

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

    expect(axiosPostSpy).toBeCalledWith(
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

    expect(axiosPostSpy).toBeCalledWith(
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

describe('05 AuthWebservice: Check invitational code service', () => {
  const invitationalCodeRequestMock: InvitationalCodeRequest = {
    invitationCode: faker.string.alphanumeric(),
  };
  const axiosMockPost: MockAdapter.RequestHandler = axiosMock.onPost(
    authWebserviceBaseUrls.invitation,
    invitationalCodeRequestMock
  );

  const checkToBeCalledWith = () => {
    expect(axiosPostSpy).toBeCalledWith(
      authWebserviceBaseUrls.invitation,
      invitationalCodeRequestMock,
      jsonHeaders
    );
  };
  it('05 - 1 Should succeed check invitational code', async () => {
    const successResponseData: InvitationalCodeRequest =
      invitationalCodeRequestMock;

    axiosMockPost.reply(200, successResponseData);

    const response: InvitationalCodeRequest =
      await AuthWebservice.checkInvitationalCodeService(
        invitationalCodeRequestMock
      );

    expect(response).toEqual(successResponseData);

    checkToBeCalledWith();
  });

  it('05 - 2 Sould fail check invitational code', async () => {
    axiosMockPost.reply(401);

    await expect(
      AuthWebservice.checkInvitationalCodeService(invitationalCodeRequestMock)
    ).rejects.toThrow(errorMessage401);

    checkToBeCalledWith();
  });
});

describe('06 AuthWebservice: Check delete invitational code service', () => {
  const invitationalCodeRequestMockData: InvitationalCodeRequest = {
    invitationCode: faker.internet.password(),
  };
  const deleteInvitationalCodeRequesMock = {
    headers: jsonHeaders.headers,
    data: invitationalCodeRequestMockData,
  };
  const axiosMockDelete: MockAdapter.RequestHandler = axiosMock.onDelete(
    authWebserviceBaseUrls.invitation,
    deleteInvitationalCodeRequesMock
  );

  const checkToBeCalledWith = () => {
    expect(axiosDeleteSpy).toBeCalledWith(
      authWebserviceBaseUrls.invitation,
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

    checkToBeCalledWith();
  });
  it('06 - 2 Should fail delete invitational code request', async () => {
    axiosMockDelete.reply(401);

    await expect(
      AuthWebservice.deleteInvitationalCodeService(
        invitationalCodeRequestMockData
      )
    ).rejects.toThrowError(errorMessage401);

    checkToBeCalledWith();
  });
});

describe('07 AuthWebservice: Check if email already exist service', () => {
  const checkMailRequestMock: CheckMailRequest = {
    email: faker.internet.email(),
  };
  const axioMockPost: MockAdapter.RequestHandler = axiosMock.onPost(
    authWebserviceBaseUrls.checkmail,
    checkMailRequestMock
  );

  const checkToBeCalledWith = () => {
    expect(axiosPostSpy).toBeCalledWith(
      authWebserviceBaseUrls.checkmail,
      checkMailRequestMock,
      jsonHeaders
    );
  };
  it('07 - 1 Should succeed check if email already exist request', async () => {
    const successResponseData: CheckMailRequest = checkMailRequestMock;

    axioMockPost.reply(200, successResponseData);
    const response =
      await AuthWebservice.checkIfEmailAlreadyExistService(
        checkMailRequestMock
      );

    expect(response).toEqual(successResponseData);

    checkToBeCalledWith();
  });

  it('07 - 2 Should fail check if email already exist request', async () => {
    axioMockPost.reply(404);

    await expect(
      AuthWebservice.checkIfEmailAlreadyExistService(checkMailRequestMock)
    ).rejects.toThrowError(errorMessage404);

    checkToBeCalledWith();
  });
});

describe('08 AuthWebservice: Check register service', () => {
  const registerUserMock: User = createRandomUser();
  const registerRequestMock: RegisterRequest = {
    user: registerUserMock,
  };
  const axiosMockPost: MockAdapter.RequestHandler = axiosMock.onPost(
    authWebserviceBaseUrls.register,
    registerRequestMock
  );

  const checkToBeCalledWith = () => {
    expect(axiosPostSpy).toBeCalledWith(
      authWebserviceBaseUrls.register,
      registerRequestMock,
      jsonHeaders
    );
  };

  it('08 - 1 Should succeed register service request', async () => {
    const successResponseData: UserAuthData | null =
      createRandomUserAuthData(registerUserMock);

    axiosMockPost.reply(200, successResponseData);

    const response: UserAuthData =
      await AuthWebservice.registerService(registerRequestMock);

    expect(response).toEqual(successResponseData);

    checkToBeCalledWith();
  });

  it('08 - 2 Should fail register service request', async () => {
    axiosMockPost.reply(401);

    await expect(
      AuthWebservice.registerService(registerRequestMock)
    ).rejects.toThrowError(errorMessage401);

    checkToBeCalledWith();
  });
});
