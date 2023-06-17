import loginSelectors from './utilities/login/login.selectors';
import loginFunctions from './utilities/login/login.functions';
import { Routes } from './utilities/models/Routes';
import { RequestStatus } from './utilities/models/RequestStatus';

describe('01 View', () => {
  beforeEach(() => {
    cy.visit(Routes.BASE_URL);
  });
  it('01 Login with wrong credentials and failure login', () => {
    cy.get(loginSelectors.emailInputLoginPage).type('test@test.com');
    cy.get(loginSelectors.passwordInputLoginPage).type('test@test.com');
    cy.get(loginSelectors.submitLoginPage).click();
    loginFunctions
      .waitForLoginStatusChange()
      .then((finalLoginStatus: string) => {
        expect(finalLoginStatus).to.deep.equal(RequestStatus.FAILURE);
      });
  });
  it('01 Login with correct credentials and success login', () => {
    cy.get(loginSelectors.emailInputLoginPage).type('test@test.com');
    cy.get(loginSelectors.passwordInputLoginPage).type('Tests.15');
    cy.get(loginSelectors.submitLoginPage).click();
    loginFunctions
      .waitForLoginStatusChange()
      .then((finalLoginStatus: string) => {
        expect(finalLoginStatus).to.deep.equal(RequestStatus.SUCCESS);
      });
  });
});
