import { RequestStatus } from '../models/RequestStatus';
import { Routes } from '../models/Routes';

/**
 * This function waits for a change in login status and returns the updated status.
 * @returns a Cypress chainable object, which can be used to perform further Cypress commands. The
 * final value returned by the function is either the login request status (a string) or a promise that
 * resolves to the login request status.
 */
function waitForLoginStatusChange(): Cypress.Chainable<string> {
  return cy.getAllLocalStorage().then(result => {
    const resultJSON = result[Routes.BASE_URL].auth;
    const loginRequestStatus = resultJSON
      ? JSON.parse(resultJSON.toString()).loginRequestStatus
      : null;

    return loginRequestStatus === RequestStatus.IN_PROGRESS
      ? cy.then(waitForLoginStatusChange)
      : loginRequestStatus;
  });
}

const loginFunctions = {
  waitForLoginStatusChange,
};

export default loginFunctions;
