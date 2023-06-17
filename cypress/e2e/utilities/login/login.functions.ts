import { RequestStatus } from '../models/RequestStatus';

const BASE_URL = Cypress.env('base_url');

/**
 * This function waits for a change in login status and returns the updated status.
 * @returns a Cypress chainable object, which can be used to perform further Cypress commands. The
 * final value returned by the function is either the login request status (a string) or a promise that
 * resolves to the login request status.
 */
function waitForLoginStatusChange(): Cypress.Chainable<string> {
  return cy.getAllLocalStorage().then(result => {
    const resultJSON: Cypress.Storable = result[BASE_URL].auth;
    const loginRequestStatus: string | null = resultJSON
      ? JSON.parse(resultJSON.toString()).loginRequestStatus
      : null;

    return loginRequestStatus === RequestStatus.IN_PROGRESS
      ? cy.then(waitForLoginStatusChange)
      : cy.wrap(loginRequestStatus);
  });
}

const loginFunctions = {
  waitForLoginStatusChange,
};

export default loginFunctions;
