// stores/auth.spec.ts
import { setActivePinia, createPinia } from 'pinia';

import { useAuthStore } from '../../src/stores/auth';

import { UserData, UserRoles } from '../../src/models/user/UserData';
import { RequestStatus } from '../../src/models/auth/RequestStatus';

const USER_DATA_EXAMPLE: UserData = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzM0MDA2YmEwMmJkZjhiMjU1YzUwMDYiLCJpYXQiOjE2NjQ5OTA4MDYsImV4cCI6MTY2NDk5NDQwNn0.nzaunwx9SWY6XhXdvL_MmWlaeYHPHBK7d4d7t4kaW6A',
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzM0MDA2YmEwMmJkZjhiMjU1YzUwMDYiLCJpYXQiOjE2NjQ5OTA4MDZ9.As1-l1_i3fwL4-D5ArPatmTU-2OyYzEHfhqFcHddZhg',
  user: {
    email: 'test@test.com',
    name: 'test',
    surname: 'test',
    password: 'Tests.15',
    roles: [UserRoles.COMMON_USER],
  },
};

const changeAllStates = (): void => {
  const auth = useAuthStore();
  auth.userData = USER_DATA_EXAMPLE;
  auth.isLoading = true;
  auth.isLogged = true;
  auth.isRegisterProcess = true;
  auth.loginRequestStatus = RequestStatus.SUCCESS;
};

describe('01 Auth Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it('01.1 Auth - Initial data', () => {
    const auth = useAuthStore();

    expect(auth.userData).toBe(null);
    expect(auth.isLogged).toBe(false);
    expect(auth.isLoading).toBe(false);
    expect(auth.isRegisterProcess).toBe(false);
    expect(auth.loginRequestStatus).toBe(RequestStatus.IN_PROGRESS);

    changeAllStates();

    expect(auth.userData).toStrictEqual(USER_DATA_EXAMPLE);
    expect(auth.isLogged).toBe(true);
    expect(auth.isLoading).toBe(true);
    expect(auth.isRegisterProcess).toBe(true);
    expect(auth.loginRequestStatus).toBe(RequestStatus.SUCCESS);
  });

  it('01.2 Auth - setUserNotisLogged method', () => {
    const auth = useAuthStore();

    // Run without changes on the states
    auth.setUserNotisLogged();

    expect(auth.userData).toBe(null); // Changed by setUserNotisLogged
    expect(auth.isLogged).toBe(false); // Changed by setUserNotisLogged
    expect(auth.isLoading).toBe(false); // Changed by setUserNotisLogged
    expect(auth.isRegisterProcess).toBe(false);
    expect(auth.loginRequestStatus).toBe(RequestStatus.PENDING); // Changed by setUserNotisLogged

    // Run without changes on the states

    changeAllStates();

    auth.setUserNotisLogged();

    expect(auth.userData).toBe(null); // Changed by setUserNotisLogged
    expect(auth.isLogged).toBe(false); // Changed by setUserNotisLogged
    expect(auth.isLoading).toBe(false); // Changed by setUserNotisLogged
    expect(auth.isRegisterProcess).toBe(true);
    expect(auth.loginRequestStatus).toBe(RequestStatus.PENDING); // Changed by setUserNotisLogged
  });

  it('01.3 Auth - setLoginFailed method', () => {
    const auth = useAuthStore();

    // Run without changes on the states
    auth.setLoginFailed();

    expect(auth.userData).toBe(null); // Changed by setLoginFailed
    expect(auth.isLogged).toBe(false); // Changed by setLoginFailed
    expect(auth.isLoading).toBe(false); // Changed by setLoginFailed
    expect(auth.isRegisterProcess).toBe(false);
    expect(auth.loginRequestStatus).toBe(RequestStatus.FAILURE); // Changed by setLoginFailed

    // Run without changes on the states

    changeAllStates();

    auth.setLoginFailed();

    expect(auth.userData).toBe(null); // Changed by setLoginFailed
    expect(auth.isLogged).toBe(false); // Changed by setLoginFailed
    expect(auth.isLoading).toBe(false); // Changed by setLoginFailed
    expect(auth.isRegisterProcess).toBe(true);
    expect(auth.loginRequestStatus).toBe(RequestStatus.FAILURE); // Changed by setLoginFailed
  });

  it('01.4 Auth - setLoginInProgress method', () => {
    const auth = useAuthStore();

    // Run without changes on the states
    auth.setLoginInProgress();

    expect(auth.userData).toBe(null);
    expect(auth.isLogged).toBe(false);
    expect(auth.isLoading).toBe(true); // Changed by setLoginInProgress
    expect(auth.isRegisterProcess).toBe(false);
    expect(auth.loginRequestStatus).toBe(RequestStatus.IN_PROGRESS); // Changed by setLoginInProgress

    // Run without changes on the states

    changeAllStates();

    auth.setLoginInProgress();

    expect(auth.userData).toStrictEqual(USER_DATA_EXAMPLE);
    expect(auth.isLogged).toBe(true);
    expect(auth.isLoading).toBe(true); // Changed by setLoginInProgress
    expect(auth.isRegisterProcess).toBe(true);
    expect(auth.loginRequestStatus).toBe(RequestStatus.IN_PROGRESS); // Changed by setLoginInProgress
  });

  it('01.5 Auth - setIsLogged method', () => {
    const auth = useAuthStore();

    // Run without changes on the states
    auth.setIsLogged(USER_DATA_EXAMPLE);

    expect(auth.userData).toStrictEqual(USER_DATA_EXAMPLE); // Changed by setIsLogged
    expect(auth.isLogged).toBe(true); // Changed by setIsLogged
    expect(auth.isLoading).toBe(false); // Changed by setIsLogged
    expect(auth.isRegisterProcess).toBe(false);
    expect(auth.loginRequestStatus).toBe(RequestStatus.SUCCESS); // Changed by setIsLogged

    // Run without changes on the states

    changeAllStates();

    auth.setIsLogged(USER_DATA_EXAMPLE);

    expect(auth.userData).toStrictEqual(USER_DATA_EXAMPLE); // Changed by setIsLogged
    expect(auth.isLogged).toBe(true); // Changed by setIsLogged
    expect(auth.isLoading).toBe(false); // Changed by setIsLogged
    expect(auth.isRegisterProcess).toBe(true);
    expect(auth.loginRequestStatus).toBe(RequestStatus.SUCCESS); // Changed by setIsLogged
  });
});
