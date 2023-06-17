import loginConstants from './login.constants';
import commonConstants from '../common.constants';

/**
 * This function waits for a change in login status and returns the updated status.
 * @returns a Cypress chainable object, which can be used to perform further Cypress commands. The
 * final value returned by the function is either the login request status (a string) or a promise that
 * resolves to the login request status.
 */
function waitForLoginStatusChange(): Cypress.Chainable<string> {
  return cy.getAllLocalStorage().then(result => {
    const resultJSON = result[commonConstants.BASE_URL].auth;
    const loginRequestStatus = resultJSON
      ? JSON.parse(resultJSON.toString()).loginRequestStatus
      : null;

    return loginRequestStatus === loginConstants.LOGIN_IN_PROGRESS
      ? cy.then(waitForLoginStatusChange)
      : loginRequestStatus;
  });
}

const loginFunctions = {
  waitForLoginStatusChange,
};

export default loginFunctions;
