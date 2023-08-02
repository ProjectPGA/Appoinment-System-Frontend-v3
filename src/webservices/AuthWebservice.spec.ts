import { UserData } from '@/models/user/UserData';
import { User } from '@/models/user/User';
import * as AuthWebservice from './AuthWebservice';
import {
  createRandomLoginRequest,
  RandomLoginRequestParams,
} from '@/utils/mocks/user/mockLoginRequest';
import { createRandomUser } from '@/utils/mocks/user/mockUser';
import { createRandomUserData } from '@/utils/mocks/user/mockUserData';
import { LoginRequest } from './models/auth/LoginRequest';

const loginServiceMock = jest.spyOn(AuthWebservice, 'loginService');

describe('AuthWebservice: Check loginService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Should succeed on login request', async () => {
    const randomUser: User = createRandomUser();
    const loginRequestParams: RandomLoginRequestParams = {
      email: randomUser.email,
      password: randomUser.password,
    };
    const loginRequestMock: LoginRequest =
      createRandomLoginRequest(loginRequestParams);
    const succesResponseData: UserData = createRandomUserData(randomUser);
    loginServiceMock.mockResolvedValue(succesResponseData);

    const response: UserData = await AuthWebservice.loginService(
      loginRequestMock
    );

    expect(response.user).toEqual(randomUser);
  });

  it('Should fail on login request', async () => {
    const loginRequestMock: LoginRequest = createRandomLoginRequest();
    const errorMessage: string = 'Login Failed';
    loginServiceMock.mockRejectedValue(new Error(errorMessage));

    await expect(AuthWebservice.loginService(loginRequestMock)).rejects.toThrow(
      errorMessage
    );
  });
});
