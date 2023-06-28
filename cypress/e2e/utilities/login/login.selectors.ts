import { cySelector } from '../utils';

const emailInputLoginPage = cySelector('input-email-login-page');
const passwordInputLoginPage = cySelector('input-password-login-page');
const submitLoginPage = cySelector('submit-login-page');

const loginSelectors = {
  submitLoginPage,
  emailInputLoginPage,
  passwordInputLoginPage,
};

export default loginSelectors;
