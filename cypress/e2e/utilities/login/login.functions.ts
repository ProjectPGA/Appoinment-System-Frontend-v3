import loginConstants from './login.constants';

function waitForLoginStatusChange(): any {
  return cy.getAllLocalStorage().then(result => {
    const resultJSON = result['http://localhost:5173'].auth;
    const loginRequestStatus = resultJSON
      ? JSON.parse(resultJSON.toString())
      : null;

    if (
      loginRequestStatus.loginRequestStatus === loginConstants.LOGIN_IN_PROGRESS
    ) {
      return cy.then(waitForLoginStatusChange);
    }

    return cy.wrap(loginRequestStatus.loginRequestStatus);
  });
}

const loginFunctions = {
  waitForLoginStatusChange,
};

export default loginFunctions;
