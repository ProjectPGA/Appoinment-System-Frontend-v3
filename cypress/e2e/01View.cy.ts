import loginSelectors from './utilities/login/login.selectors';
import loginFunctions from './utilities/login/login.functions';
import { RequestStatus } from './utilities/models/RequestStatus';
import { loginCredentials } from './utilities/utils/loginCredentials';

describe('01 View', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('01 Login with wrong credentials and failure login', () => {
    cy.get(loginSelectors.emailInputLoginPage).type(
      loginCredentials.CYPRESS_USER_TEST_EMAIL
    );
    cy.get(loginSelectors.passwordInputLoginPage).type(
      loginCredentials.USER_TEST_WRONG_PASSWORD
    );
    cy.get(loginSelectors.submitLoginPage).click();
    loginFunctions
      .waitForLoginStatusChange()
      .then((finalLoginStatus: string) => {
        expect(finalLoginStatus).to.deep.equal(RequestStatus.FAILURE);
      });
  });
  it('01 Login with correct credentials and success login', () => {
    cy.get(loginSelectors.emailInputLoginPage).type(
      loginCredentials.CYPRESS_USER_TEST_EMAIL
    );
    cy.get(loginSelectors.passwordInputLoginPage).type(
      loginCredentials.CYPRESS_USER_TEST_PASSWORD
    );
    cy.get(loginSelectors.submitLoginPage).click();
    // TODO: Uncomment when CORS problems are solved on the back
    // loginFunctions
    //   .waitForLoginStatusChange()
    //   .then((finalLoginStatus: string) => {
    //     expect(finalLoginStatus).to.deep.equal(RequestStatus.SUCCESS);
    //   });
  });
});
