import { UserData } from '@/models/user/UserData';
import * as AuthWebservice from './AuthWebservice';
import {
  createRandomLoginRequest,
  randomLoginRequestParams,
} from '@/utils/mocks/user/mockLoginRequest';
import { createRandomUser } from '@/utils/mocks/user/mockUser';
import { createRandomUserData } from '@/utils/mocks/user/mockUserData';
import { LoginRequest } from './models/auth/LoginRequest';

const loginServiceMock = jest.spyOn(AuthWebservice, 'loginService');

describe('AuthWebservice: Check loginService', () => {
  it('Login request success', async () => {
    const randomUser = createRandomUser();
    const loginRequestParams: randomLoginRequestParams = {
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

    expect(response.user).toStrictEqual(randomUser);
  });
});
